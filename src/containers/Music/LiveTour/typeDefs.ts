import gql from 'graphql-tag'

export const CREATE_ONE_LIVE_TOUR = gql`
  mutation CreateLiveTour($input: CreateLiveTourInput!) {
    createLiveTour(input: $input) {
      _id
      title
      posterUrl
      showTime
      createdAt
      updatedAt
    }
  }
`

export const UPDATE_ONE_LIVE_TOUR = gql`
  mutation UpdateLiveTourById($input: UpdateLiveTourInput!) {
    updateLiveTourById(input: $input) {
      _id
      title
      posterUrl
      showTime
      createdAt
      updatedAt
    }
  }
`

export const LIVE_TOURS = gql`
  query GetLiveTours {
    getLiveTours {
      _id
      title
      posterUrl
      showTime
      createdAt
      updatedAt
    }
  }
`

export const DELETE_ONE_LIVE_TOUR = gql`
  mutation DeleteLiveTourById($id: ID!) {
    deleteLiveTourById(id: $id) {
      _id
      title
      posterUrl
      showTime
      createdAt
      updatedAt
    }
  }
`

export const BATCH_DELETE_LIVE_TOUR = gql`
  mutation DeleteLiveTours($ids: [ID!]!) {
    deleteLiveTours(ids: $ids) {
      n
      ok
      deletedCount
      ids
    }
  }
`
