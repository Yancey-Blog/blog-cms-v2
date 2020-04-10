import React, { FC } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useSnackbar } from 'notistack'
import { sortBy } from 'yancey-js-util'
import {
  MOTTOS,
  CREATE_ONE_MOTTO,
  UPDATE_ONE_MOTTO,
  DELETE_ONE_MOTTO,
  BATCH_DELETE_MOTTO,
  EXCHANGE_POSITION,
} from './typeDefs'
import { IMotto, Query } from './types'
import MottoTable from './components/MottoTable'

const Motto: FC = () => {
  const { enqueueSnackbar } = useSnackbar()

  const { loading: isFetching, data } = useQuery<Query>(MOTTOS, {
    notifyOnNetworkStatusChange: true,
  })

  const [createMotto] = useMutation(CREATE_ONE_MOTTO, {
    errorPolicy: 'all',
    update(proxy, { data: { createMotto } }) {
      const data = proxy.readQuery<Query>({ query: MOTTOS })

      if (data) {
        proxy.writeQuery({
          query: MOTTOS,
          data: {
            ...data,
            getMottos: [createMotto, ...data.getMottos],
          },
        })
      }
    },

    onCompleted() {
      enqueueSnackbar('Create success!', { variant: 'success' })
    },
    onError() {},
  })

  const [updateMottoById] = useMutation(UPDATE_ONE_MOTTO, {
    errorPolicy: 'all',
    onCompleted() {
      enqueueSnackbar('Update success!', { variant: 'success' })
    },
    onError() {},
  })

  const [exchangePosition, { loading: isExchanging }] = useMutation(
    EXCHANGE_POSITION,
    {
      errorPolicy: 'all',
      onCompleted() {
        enqueueSnackbar('Update success!', { variant: 'success' })
      },
      onError() {},
    },
  )

  const [deleteMottoById, { loading: isDeleting }] = useMutation(
    DELETE_ONE_MOTTO,
    {
      errorPolicy: 'all',
      update(proxy, { data: { deleteMottoById } }) {
        const data = proxy.readQuery<Query>({ query: MOTTOS })

        if (data) {
          proxy.writeQuery({
            query: MOTTOS,
            data: {
              getMottos: data.getMottos.filter(
                (announcement: IMotto) =>
                  announcement._id !== deleteMottoById._id,
              ),
            },
          })
        }
      },
      onCompleted() {
        enqueueSnackbar('Delete success!', { variant: 'success' })
      },
      onError() {},
    },
  )

  const [deleteMottos, { loading: isBatchDeleting }] = useMutation(
    BATCH_DELETE_MOTTO,
    {
      errorPolicy: 'all',
      update(proxy, { data: { deleteMottos } }) {
        const data = proxy.readQuery<Query>({ query: MOTTOS })

        if (data) {
          proxy.writeQuery({
            query: MOTTOS,
            data: {
              getMottos: data.getMottos.filter(
                (announcement: IMotto) =>
                  !deleteMottos.ids.includes(announcement._id),
              ),
            },
          })
        }
      },
      onCompleted() {
        enqueueSnackbar('Delete success!', { variant: 'success' })
      },
      onError() {},
    },
  )

  return (
    <MottoTable
      dataSource={data ? data.getMottos.sort(sortBy('weight', 'descend')) : []}
      isFetching={isFetching}
      isDeleting={isDeleting}
      isExchanging={isExchanging}
      isBatchDeleting={isBatchDeleting}
      createMotto={createMotto}
      updateMottoById={updateMottoById}
      deleteMottoById={deleteMottoById}
      deleteMottos={deleteMottos}
      exchangePosition={exchangePosition}
    />
  )
}

export default Motto
