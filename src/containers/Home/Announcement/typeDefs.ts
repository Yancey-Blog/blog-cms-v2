import gql from 'graphql-tag'
import { BATCH_DELETE_FRAGMENT } from 'src/shared/graphqlFragment'

const ANNOUNCEMENT_FRAGMENT = gql`
  fragment AnnouncementFragment on AnnouncementModel {
    _id
    content
    weight
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

export const EXCHANGE_POSITION = gql`
  mutation ExchangePosition($input: ExchangePositionInput!) {
    exchangePosition(input: $input) {
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
      ...BatchDeleteFragment
    }
  }
  ${BATCH_DELETE_FRAGMENT}
`
