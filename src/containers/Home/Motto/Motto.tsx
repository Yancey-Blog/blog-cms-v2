import React, { FC, useEffect } from 'react'
import { useLazyQuery, useMutation } from '@apollo/react-hooks'
import { useSnackbar } from 'notistack'
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
import MottoModal from './components/MottoModal'

const Motto: FC = () => {
  const { enqueueSnackbar } = useSnackbar()

  const [fetchMottos, { loading: isFetching, data }] = useLazyQuery<Query>(
    MOTTOS,
    {
      notifyOnNetworkStatusChange: true,
    },
  )

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
        fetchMottos()
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

  useEffect(() => {
    fetchMottos()
  }, [fetchMottos])

  return (
    <>
      <MottoTable
        dataSource={data ? data.getMottos : []}
        isFetching={isFetching}
        isDeleting={isDeleting}
        isExchanging={isExchanging}
        isBatchDeleting={isBatchDeleting}
        deleteMottoById={deleteMottoById}
        deleteMottos={deleteMottos}
        exchangePosition={exchangePosition}
      />

      <MottoModal createMotto={createMotto} updateMottoById={updateMottoById} />
    </>
  )
}

export default Motto
