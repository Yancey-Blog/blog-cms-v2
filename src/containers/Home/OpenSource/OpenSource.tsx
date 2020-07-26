import React, { FC } from 'react'
import { useQuery, useMutation } from '@apollo/client'
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

const OpenSource: FC = () => {
  const { enqueueSnackbar } = useSnackbar()

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
      enqueueSnackbar('Create success!', { variant: 'success' })
    },
    onError() {},
  })

  const [updateOpenSourceById] = useMutation(UPDATE_ONE_OPEN_SOURCE, {
    onCompleted() {
      enqueueSnackbar('Update success!', { variant: 'success' })
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
        enqueueSnackbar('Delete success!', { variant: 'success' })
      },
      onError() {},
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
        enqueueSnackbar('Delete success!', { variant: 'success' })
      },
      onError() {},
    },
  )

  return (
    <OpenSourceTable
      dataSource={data ? data.getOpenSources : []}
      isFetching={isFetching}
      isDeleting={isDeleting}
      isBatchDeleting={isBatchDeleting}
      createOpenSource={createOpenSource}
      updateOpenSourceById={updateOpenSourceById}
      deleteOpenSourceById={deleteOpenSourceById}
      deleteOpenSources={deleteOpenSources}
    />
  )
}

export default OpenSource
