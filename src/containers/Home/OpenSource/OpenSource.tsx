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

const OpenSource: FC = () => {
  const { enqueueSnackbar } = useSnackbar()

  const { loading: isFetching, data } = useQuery(OPEN_SOURCES, {
    notifyOnNetworkStatusChange: true,
  })

  const [createOpenSource] = useMutation(CREATE_ONE_OPEN_SOURCE, {
    update(cache, { data: { createOpenSource } }) {
      const { getOpenSources } = cache.readQuery({ query: OPEN_SOURCES }) as any
      cache.writeQuery({
        query: OPEN_SOURCES,
        data: {
          getOpenSources: [createOpenSource, ...getOpenSources],
        },
      })
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
        // @ts-ignore
        const { getOpenSources } = cache.readQuery({ query: OPEN_SOURCES })
        cache.writeQuery({
          query: OPEN_SOURCES,
          data: {
            getOpenSources: getOpenSources.filter(
              (openSource: IOpenSource) =>
                openSource._id !== deleteOpenSourceById._id,
            ),
          },
        })
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
        // @ts-ignore
        const { getOpenSources } = cache.readQuery({ query: OPEN_SOURCES })
        cache.writeQuery({
          query: OPEN_SOURCES,
          data: {
            getOpenSources: getOpenSources.filter(
              (openSource: IOpenSource) =>
                !deleteOpenSources.ids.includes(openSource._id),
            ),
          },
        })
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
