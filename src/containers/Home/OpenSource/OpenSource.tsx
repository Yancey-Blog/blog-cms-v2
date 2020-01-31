import React, { FC } from 'react'
import { useHistory } from 'react-router-dom'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useSnackbar } from 'notistack'
import {
  OPEN_SOURCES,
  CREATE_ONE_OPEN_SOURCE,
  UPDATE_ONE_OPEN_SOURCE,
  DELETE_ONE_OPEN_SOURCE,
  BATCH_DELETE_OPEN_SOURCE,
} from './typeDefs'
import { IOpenSource, Query } from './types'
import OpenSourceTable from './components/OpenSourceTable'
import OpenSourceModal from './components/OpenSourceModal'

const OpenSource: FC = () => {
  const { enqueueSnackbar } = useSnackbar()

  const history = useHistory()

  const { loading: isFetching, data } = useQuery<Query>(OPEN_SOURCES, {
    notifyOnNetworkStatusChange: true,
  })

  const [createOpenSource] = useMutation(CREATE_ONE_OPEN_SOURCE, {
    update(proxy, { data: { createOpenSource } }) {
      const data = proxy.readQuery<Query>({ query: OPEN_SOURCES })

      if (data) {
        proxy.writeQuery({
          query: OPEN_SOURCES,
          data: {
            ...data,
            getOpenSources: [createOpenSource, ...data.getOpenSources],
          },
        })
      }
    },

    onCompleted() {
      enqueueSnackbar('create success!', { variant: 'success' })
    },
  })

  const [updateOpenSourceById] = useMutation(UPDATE_ONE_OPEN_SOURCE, {
    onCompleted() {
      enqueueSnackbar('update success!', { variant: 'success' })
    },
  })

  const [deleteOpenSourceById, { loading: isDeleting }] = useMutation(
    DELETE_ONE_OPEN_SOURCE,
    {
      update(proxy, { data: { deleteOpenSourceById } }) {
        const data = proxy.readQuery<Query>({ query: OPEN_SOURCES })

        if (data) {
          proxy.writeQuery({
            query: OPEN_SOURCES,
            data: {
              getOpenSources: data.getOpenSources.filter(
                (openSource: IOpenSource) =>
                  openSource._id !== deleteOpenSourceById._id,
              ),
            },
          })
        }
      },
      onCompleted() {
        enqueueSnackbar('delete success!', { variant: 'success' })
      },
      onError(error) {
        enqueueSnackbar(error.message, { variant: 'error' })
        history.push('/login')
      },
    },
  )

  const [deleteOpenSources, { loading: isBatchDeleting }] = useMutation(
    BATCH_DELETE_OPEN_SOURCE,
    {
      update(proxy, { data: { deleteOpenSources } }) {
        const data = proxy.readQuery<Query>({ query: OPEN_SOURCES })

        if (data) {
          proxy.writeQuery({
            query: OPEN_SOURCES,
            data: {
              getOpenSources: data.getOpenSources.filter(
                (openSource: IOpenSource) =>
                  !deleteOpenSources.ids.includes(openSource._id),
              ),
            },
          })
        }
      },
      onCompleted() {
        enqueueSnackbar('delete success!', { variant: 'success' })
      },
    },
  )

  return (
    <>
      <OpenSourceTable
        dataSource={data ? data.getOpenSources : []}
        isFetching={isFetching}
        isDeleting={isDeleting}
        isBatchDeleting={isBatchDeleting}
        deleteOpenSourceById={deleteOpenSourceById}
        deleteOpenSources={deleteOpenSources}
      />

      <OpenSourceModal
        createOpenSource={createOpenSource}
        updateOpenSourceById={updateOpenSourceById}
      />
    </>
  )
}

export default OpenSource
