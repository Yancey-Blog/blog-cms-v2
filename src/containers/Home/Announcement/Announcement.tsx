import React, { FC } from 'react'
import { useQuery, useMutation } from '@apollo/react-hooks'
import { useSnackbar } from 'notistack'
import {
  ANNOUNCEMENTS,
  CREATE_ONE_ANNOUNCEMENT,
  UPDATE_ONE_ANNOUNCEMENT,
  DELETE_ONE_ANNOUNCEMENT,
  BATCH_DELETE_ANNOUNCEMENT,
} from './typeDefs'
import { IAnnouncement, Query } from './types'
import AnnouncementTable from './components/AnnouncementTable'
import AnnouncementModal from './components/AnnouncementModal'

const Announcement: FC = () => {
  const { enqueueSnackbar } = useSnackbar()

  const { loading: isFetching, data } = useQuery<Query>(ANNOUNCEMENTS, {
    notifyOnNetworkStatusChange: true,
  })

  const [createAnnouncement] = useMutation(CREATE_ONE_ANNOUNCEMENT, {
    errorPolicy: 'all',
    update(proxy, { data: { createAnnouncement } }) {
      const data = proxy.readQuery<Query>({ query: ANNOUNCEMENTS })

      if (data) {
        proxy.writeQuery({
          query: ANNOUNCEMENTS,
          data: {
            ...data,
            getAnnouncements: [createAnnouncement, ...data.getAnnouncements],
          },
        })
      }
    },

    onCompleted() {
      enqueueSnackbar('Create success!', { variant: 'success' })
    },
    onError() {},
  })

  const [updateAnnouncementById] = useMutation(UPDATE_ONE_ANNOUNCEMENT, {
    errorPolicy: 'all',
    onCompleted() {
      enqueueSnackbar('Update success!', { variant: 'success' })
    },
    onError() {},
  })

  const [deleteAnnouncementById, { loading: isDeleting }] = useMutation(
    DELETE_ONE_ANNOUNCEMENT,
    {
      errorPolicy: 'all',
      update(proxy, { data: { deleteAnnouncementById } }) {
        const data = proxy.readQuery<Query>({ query: ANNOUNCEMENTS })

        if (data) {
          proxy.writeQuery({
            query: ANNOUNCEMENTS,
            data: {
              getAnnouncements: data.getAnnouncements.filter(
                (announcement: IAnnouncement) =>
                  announcement._id !== deleteAnnouncementById._id,
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

  const [deleteAnnouncements, { loading: isBatchDeleting }] = useMutation(
    BATCH_DELETE_ANNOUNCEMENT,
    {
      errorPolicy: 'all',
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
        enqueueSnackbar('Delete success!', { variant: 'success' })
      },
      onError() {},
    },
  )

  return (
    <>
      <AnnouncementTable
        dataSource={data ? data.getAnnouncements : []}
        isFetching={isFetching}
        isDeleting={isDeleting}
        isBatchDeleting={isBatchDeleting}
        deleteAnnouncementById={deleteAnnouncementById}
        deleteAnnouncements={deleteAnnouncements}
      />

      <AnnouncementModal
        createAnnouncement={createAnnouncement}
        updateAnnouncementById={updateAnnouncementById}
      />
    </>
  )
}

export default Announcement
