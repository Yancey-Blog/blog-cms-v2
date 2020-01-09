import gql from 'graphql-tag'

export const CREATE_ONE_ANNOUNCEMENT = gql`
  mutation CreateAnnouncement($input: CreateAnnouncementInput!) {
    createAnnouncement(input: $input) {
      _id
      createdAt
      updatedAt
    }
  }
`

export const UPDATE_ONE_ANNOUNCEMENT = gql`
  mutation UpdateAnnouncementById($input: UpdateAnnouncementInput!) {
    updateAnnouncementById(input: $input) {
      _id
      createdAt
      updatedAt
    }
  }
`

export const ANNOUNCEMENTS = gql`
  query GetAnnouncements {
    getAnnouncements {
      _id
      createdAt
      updatedAt
    }
  }
`

export const DELETE_ONE_ANNOUNCEMENT = gql`
  mutation DeleteAnnouncementById($id: ID!) {
    deleteAnnouncementById(id: $id) {
      _id
      createdAt
      updatedAt
    }
  }
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
