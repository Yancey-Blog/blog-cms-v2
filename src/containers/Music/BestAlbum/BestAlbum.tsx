import { FC } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { useSnackbar } from 'notistack'
import {
  BEST_ALBUMS,
  CREATE_ONE_BEST_ALBUM,
  UPDATE_ONE_BEST_ALBUM,
  DELETE_ONE_BEST_ALBUM,
  BATCH_DELETE_BEST_ALBUMS,
} from './typeDefs'
import { IBestAlbum, Query } from './types'
import BestAlbumTable from './components/BestAlbumTable'

const BestAlbum: FC = () => {
  const { enqueueSnackbar } = useSnackbar()

  const { loading: isFetching, data } = useQuery<Query>(BEST_ALBUMS, {
    notifyOnNetworkStatusChange: true,
  })

  const [createBestAlbum] = useMutation(CREATE_ONE_BEST_ALBUM, {
    update(proxy, { data: { createBestAlbum } }) {
      const data = proxy.readQuery<Query>({ query: BEST_ALBUMS })

      if (data) {
        proxy.writeQuery({
          query: BEST_ALBUMS,
          data: {
            ...data,
            getBestAlbums: [createBestAlbum, ...data.getBestAlbums],
          },
        })
      }
    },

    onCompleted() {
      enqueueSnackbar('Create success!', { variant: 'success' })
    },
    onError() {},
  })

  const [updateBestAlbumById] = useMutation(UPDATE_ONE_BEST_ALBUM, {
    onCompleted() {
      enqueueSnackbar('Update success!', { variant: 'success' })
    },
  })

  const [deleteBestAlbumById, { loading: isDeleting }] = useMutation(
    DELETE_ONE_BEST_ALBUM,
    {
      update(proxy, { data: { deleteBestAlbumById } }) {
        const data = proxy.readQuery<Query>({ query: BEST_ALBUMS })

        if (data) {
          proxy.writeQuery({
            query: BEST_ALBUMS,
            data: {
              getBestAlbums: data.getBestAlbums.filter(
                (bestAlbum: IBestAlbum) =>
                  bestAlbum._id !== deleteBestAlbumById._id,
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

  const [deleteBestAlbums, { loading: isBatchDeleting }] = useMutation(
    BATCH_DELETE_BEST_ALBUMS,
    {
      update(proxy, { data: { deleteBestAlbums } }) {
        const data = proxy.readQuery<Query>({ query: BEST_ALBUMS })

        if (data) {
          proxy.writeQuery({
            query: BEST_ALBUMS,
            data: {
              getBestAlbums: data.getBestAlbums.filter(
                (bestAlbum: IBestAlbum) =>
                  !deleteBestAlbums.ids.includes(bestAlbum._id),
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
    <BestAlbumTable
      dataSource={data ? data.getBestAlbums : []}
      isFetching={isFetching}
      isDeleting={isDeleting}
      isBatchDeleting={isBatchDeleting}
      createBestAlbum={createBestAlbum}
      updateBestAlbumById={updateBestAlbumById}
      deleteBestAlbumById={deleteBestAlbumById}
      deleteBestAlbums={deleteBestAlbums}
    />
  )
}

export default BestAlbum
