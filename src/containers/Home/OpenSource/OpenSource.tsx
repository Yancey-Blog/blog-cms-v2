import React, { FC } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useSnackbar } from 'notistack'
import {
  OPEN_SOURCES,
  CREATE_ONE_OPEN_SOURCE,
  UPDATE_ONE_OPEN_SOURCE,
  DELETE_ONE_OPEN_SOURCE,
  BATCH_DELETE_OPEN_SOURCE,
} from './typeDefs'
import { IOpenSource } from './interfaces/openSource.interface'
import OpenSourceTable from './components/OpenSourceTable'
import OpenSourceModal from './components/OpenSourceModal'

interface ResData {
  getOpenSources: IOpenSource[]
}

const OpenSource: FC = () => {
  const { enqueueSnackbar } = useSnackbar()

  const { loading: isFetching, data } = useQuery<ResData>(OPEN_SOURCES, {
    notifyOnNetworkStatusChange: true,
  })

  const [createOpenSource] = useMutation(CREATE_ONE_OPEN_SOURCE, {
    update(proxy, { data: { createOpenSource } }) {
      const data = proxy.readQuery<ResData>({ query: OPEN_SOURCES })

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
      update(cache, { data: { deleteOpenSourceById } }) {
        const cacheData = cache.readQuery<ResData>({ query: OPEN_SOURCES })

        if (cacheData) {
          cache.writeQuery({
            query: OPEN_SOURCES,
            data: {
              getOpenSources: cacheData.getOpenSources.filter(
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
    },
  )

  const [deleteOpenSources, { loading: isBatchDeleting }] = useMutation(
    BATCH_DELETE_OPEN_SOURCE,
    {
      update(cache, { data: { deleteOpenSources } }) {
        const cacheData = cache.readQuery<ResData>({ query: OPEN_SOURCES })

        if (cacheData) {
          cache.writeQuery({
            query: OPEN_SOURCES,
            data: {
              getOpenSources: cacheData.getOpenSources.filter(
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
        data={data}
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
