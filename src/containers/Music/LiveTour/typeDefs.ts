import gql from 'graphql-tag'
import { BATCH_DELETE_FRAGMENT } from 'src/shared/graphqlFragment'

const LIVE_TOUR_FRAGMENT = gql`
  fragment LiveTourFragment on LiveTourModel {
    _id
    title
    posterUrl
    showTime
    createdAt
    updatedAt
  }
`

export const CREATE_ONE_LIVE_TOUR = gql`
  mutation CreateLiveTour($input: CreateLiveTourInput!) {
    createLiveTour(input: $input) {
      ...LiveTourFragment
    }
  }
  ${LIVE_TOUR_FRAGMENT}
`

export const UPDATE_ONE_LIVE_TOUR = gql`
  mutation UpdateLiveTourById($input: UpdateLiveTourInput!) {
    updateLiveTourById(input: $input) {
      ...LiveTourFragment
    }
  }
  ${LIVE_TOUR_FRAGMENT}
`

export const LIVE_TOURS = gql`
  query GetLiveTours {
    getLiveTours {
      ...LiveTourFragment
    }
  }
  ${LIVE_TOUR_FRAGMENT}
`

export const DELETE_ONE_LIVE_TOUR = gql`
  mutation DeleteLiveTourById($id: ID!) {
    deleteLiveTourById(id: $id) {
      ...LiveTourFragment
    }
  }
  ${LIVE_TOUR_FRAGMENT}
`

export const BATCH_DELETE_LIVE_TOUR = gql`
  mutation DeleteLiveTours($ids: [ID!]!) {
    deleteLiveTours(ids: $ids) {
      ...BatchDeleteFragment
    }
  }
  ${BATCH_DELETE_FRAGMENT}
`
