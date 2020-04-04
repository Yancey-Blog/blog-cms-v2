import gql from 'graphql-tag'

const ANNOUNCEMENT_FRAGMENT = gql`
  fragment AnnouncementFragment on AnnouncementModel {
    _id
    content
    createdAt
    updatedAt
  }
`

export const CREATE_ONE_ANNOUNCEMENT = gql`
  mutation CreateAnnouncement($input: CreateAnnouncementInput!) {
    createAnnouncement(input: $input) {
      ...AnnouncementFragment
    }
  }
  ${ANNOUNCEMENT_FRAGMENT}
`

export const UPDATE_ONE_ANNOUNCEMENT = gql`
  mutation UpdateAnnouncementById($input: UpdateAnnouncementInput!) {
    updateAnnouncementById(input: $input) {
      ...AnnouncementFragment
    }
  }
  ${ANNOUNCEMENT_FRAGMENT}
`

export const ANNOUNCEMENTS = gql`
  query GetAnnouncements {
    getAnnouncements {
      ...AnnouncementFragment
    }
  }
  ${ANNOUNCEMENT_FRAGMENT}
`

export const DELETE_ONE_ANNOUNCEMENT = gql`
  mutation DeleteAnnouncementById($id: ID!) {
    deleteAnnouncementById(id: $id) {
      ...AnnouncementFragment
    }
  }
  ${ANNOUNCEMENT_FRAGMENT}
`

export const BATCH_DELETE_ANNOUNCEMENT = gql`
  mutation DeleteAnnouncements($ids: [ID!]!) {
    deleteAnnouncements(ids: $ids) {
      n
      ok
      deletedCount
      ids
    }
  }
`
