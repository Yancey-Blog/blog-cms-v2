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
      enqueueSnackbar('create success!', { variant: 'success' })
    },
  })

  const [updateAnnouncementById] = useMutation(UPDATE_ONE_ANNOUNCEMENT, {
    errorPolicy: 'all',
    onCompleted() {
      enqueueSnackbar('update success!', { variant: 'success' })
    },
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
                (openSource: IAnnouncement) =>
                  openSource._id !== deleteAnnouncementById._id,
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
                (openSource: IAnnouncement) =>
                  !deleteAnnouncements.ids.includes(openSource._id),
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
