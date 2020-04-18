import React, { FC } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useSnackbar } from 'notistack'
import { sortBy } from 'yancey-js-util'
import {
  ANNOUNCEMENTS,
  CREATE_ONE_ANNOUNCEMENT,
  UPDATE_ONE_ANNOUNCEMENT,
  DELETE_ONE_ANNOUNCEMENT,
  BATCH_DELETE_ANNOUNCEMENT,
  EXCHANGE_POSITION,
} from './typeDefs'
import {
  IAnnouncement,
  Query,
  CreateAnnouncementMutation,
  CreateAnnouncementVars,
  DeleteAnnouncementByIdMutation,
  DeleteAnnouncementByIdVars,
} from './types'
import AnnouncementTable from './components/AnnouncementTable'

const Announcement: FC = () => {
  const { enqueueSnackbar } = useSnackbar()

  const { loading: isFetching, data } = useQuery<Query>(ANNOUNCEMENTS, {
    notifyOnNetworkStatusChange: true,
    onError() {},
  })

  const [createAnnouncement] = useMutation<
    CreateAnnouncementMutation,
    CreateAnnouncementVars
  >(CREATE_ONE_ANNOUNCEMENT, {
    update(proxy, { data: updateData }) {
      const data = proxy.readQuery<Query>({ query: ANNOUNCEMENTS })

      if (data) {
        proxy.writeQuery({
          query: ANNOUNCEMENTS,
          data: {
            ...data,
            getAnnouncements: [
              updateData?.createAnnouncement,
              ...data.getAnnouncements,
            ],
          },
        })
      }
    },

    onCompleted() {
      enqueueSnackbar('Create announcement success!', { variant: 'success' })
    },

    onError() {},
  })

  const [updateAnnouncementById] = useMutation(UPDATE_ONE_ANNOUNCEMENT, {
    onCompleted() {
      enqueueSnackbar('Update announcement success!', { variant: 'success' })
    },

    onError() {},
  })

  const [exchangePosition, { loading: isExchanging }] = useMutation(
    EXCHANGE_POSITION,
    {
      onCompleted() {
        enqueueSnackbar('Exchange position success!', { variant: 'success' })
      },

      onError() {},
    },
  )

  const [deleteAnnouncementById, { loading: isDeleting }] = useMutation<
    DeleteAnnouncementByIdMutation,
    DeleteAnnouncementByIdVars
  >(DELETE_ONE_ANNOUNCEMENT, {
    update(proxy, { data: updateData }) {
      const data = proxy.readQuery<Query>({ query: ANNOUNCEMENTS })

      if (data) {
        proxy.writeQuery({
          query: ANNOUNCEMENTS,
          data: {
            getAnnouncements: data.getAnnouncements.filter(
              (announcement: IAnnouncement) =>
                announcement._id !== updateData?.deleteAnnouncementById._id,
            ),
          },
        })
      }
    },
    onCompleted() {
      enqueueSnackbar('Delete announcement success!', { variant: 'success' })
    },

    onError() {},
  })

  const [deleteAnnouncements, { loading: isBatchDeleting }] = useMutation(
    BATCH_DELETE_ANNOUNCEMENT,
    {
      update(proxy, { data: { deleteAnnouncements } }) {
        const data = proxy.readQuery<Query>({ query: ANNOUNCEMENTS })

        if (data) {
          proxy.writeQuery({
            query: ANNOUNCEMENTS,
            data: {
              getAnnouncements: data.getAnnouncements.filter(
                (announcement: IAnnouncement) =>
                  !deleteAnnouncements.ids.includes(announcement._id),
              ),
            },
          })
        }
      },
      onCompleted() {
        enqueueSnackbar('Delete announcements success!', { variant: 'success' })
      },

      onError() {},
    },
  )

  return (
    <AnnouncementTable
      dataSource={
        data ? data.getAnnouncements.sort(sortBy('weight', 'descend')) : []
      }
      isFetching={isFetching}
      isDeleting={isDeleting}
      isExchanging={isExchanging}
      isBatchDeleting={isBatchDeleting}
      deleteAnnouncementById={deleteAnnouncementById}
      deleteAnnouncements={deleteAnnouncements}
      exchangePosition={exchangePosition}
      createAnnouncement={createAnnouncement}
      updateAnnouncementById={updateAnnouncementById}
    />
  )
}

export default Announcement
