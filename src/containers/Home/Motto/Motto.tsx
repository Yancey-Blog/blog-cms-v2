import React, { FC } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useSnackbar } from 'notistack'
import {
  MOTTOS,
  CREATE_ONE_MOTTO,
  UPDATE_ONE_MOTTO,
  DELETE_ONE_MOTTO,
  BATCH_DELETE_MOTTO,
} from './typeDefs'
import { IMotto, Query } from './types'
import MottoTable from './components/MottoTable'
import MottoModal from './components/MottoModal'

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
    <>
      <MottoTable
        dataSource={data ? data.getMottos : []}
        isFetching={isFetching}
        isDeleting={isDeleting}
        isBatchDeleting={isBatchDeleting}
        deleteMottoById={deleteMottoById}
        deleteMottos={deleteMottos}
      />

      <MottoModal createMotto={createMotto} updateMottoById={updateMottoById} />
    </>
  )
}

export default Motto
