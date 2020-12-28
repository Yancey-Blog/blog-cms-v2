import { FC } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { useSnackbar } from 'notistack'
import {
  LIVE_TOURS,
  CREATE_ONE_LIVE_TOUR,
  UPDATE_ONE_LIVE_TOUR,
  DELETE_ONE_LIVE_TOUR,
  BATCH_DELETE_LIVE_TOUR,
} from './typeDefs'
import { ILiveTour, Query } from './types'
import LiveTourTable from './components/LiveTourTable'

const LiveTour: FC = () => {
  const { enqueueSnackbar } = useSnackbar()

  const { loading: isFetching, data } = useQuery<Query>(LIVE_TOURS, {
    notifyOnNetworkStatusChange: true,
  })

  const [createLiveTour] = useMutation(CREATE_ONE_LIVE_TOUR, {
    update(proxy, { data: { createLiveTour } }) {
      const data = proxy.readQuery<Query>({ query: LIVE_TOURS })

      if (data) {
        proxy.writeQuery({
          query: LIVE_TOURS,
          data: {
            ...data,
            getLiveTours: [createLiveTour, ...data.getLiveTours],
          },
        })
      }
    },

    onCompleted() {
      enqueueSnackbar('Create success!', { variant: 'success' })
    },
    onError() {},
  })

  const [updateLiveTourById] = useMutation(UPDATE_ONE_LIVE_TOUR, {
    onCompleted() {
      enqueueSnackbar('Update success!', { variant: 'success' })
    },
  })

  const [deleteLiveTourById, { loading: isDeleting }] = useMutation(
    DELETE_ONE_LIVE_TOUR,
    {
      update(proxy, { data: { deleteLiveTourById } }) {
        const data = proxy.readQuery<Query>({ query: LIVE_TOURS })

        if (data) {
          proxy.writeQuery({
            query: LIVE_TOURS,
            data: {
              getLiveTours: data.getLiveTours.filter(
                (liveTour: ILiveTour) =>
                  liveTour._id !== deleteLiveTourById._id,
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

  const [deleteLiveTours, { loading: isBatchDeleting }] = useMutation(
    BATCH_DELETE_LIVE_TOUR,
    {
      update(proxy, { data: { deleteLiveTours } }) {
        const data = proxy.readQuery<Query>({ query: LIVE_TOURS })

        if (data) {
          proxy.writeQuery({
            query: LIVE_TOURS,
            data: {
              getLiveTours: data.getLiveTours.filter(
                (liveTour: ILiveTour) =>
                  !deleteLiveTours.ids.includes(liveTour._id),
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
    <LiveTourTable
      dataSource={data ? data.getLiveTours : []}
      isFetching={isFetching}
      isDeleting={isDeleting}
      isBatchDeleting={isBatchDeleting}
      createLiveTour={createLiveTour}
      updateLiveTourById={updateLiveTourById}
      deleteLiveTourById={deleteLiveTourById}
      deleteLiveTours={deleteLiveTours}
    />
  )
}

export default LiveTour
