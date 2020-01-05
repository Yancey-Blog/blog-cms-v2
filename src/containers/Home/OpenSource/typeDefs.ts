import { gql } from 'apollo-boost'
// eslint-disable-next-line
import CreateOpenSourceInput from './graphql/createOpenSource.gql'
// eslint-disable-next-line
import UpdateOpenSourceInput from './graphql/updateOpenSource.gql'

export const CREATE_ONE_OPEN_SOURCE = gql`
  mutation CreateOpenSource($input: CreateOpenSourceInput!) {
    createOpenSource(input: $input) {
      _id
      title
      description
      url
      posterUrl
      createdAt
      updatedAt
    }
  }
`

export const UPDATE_ONE_OPEN_SOURCE = gql`
  mutation UpdateOpenSourceById($input: UpdateOpenSourceInput!) {
    updateOpenSourceById(input: $input) {
      _id
      title
      description
      url
      posterUrl
      createdAt
      updatedAt
    }
  }
`

export const OPEN_SOURCES = gql`
  query GetOpenSources {
    getOpenSources {
      _id
      title
      description
      url
      posterUrl
      createdAt
      updatedAt
    }
  }
`

export const DELETE_ONE_OPEN_SOURCE = gql`
  mutation DeleteOpenSourceById($id: ID!) {
    deleteOpenSourceById(id: $id) {
      _id
      title
      description
      url
      posterUrl
      createdAt
      updatedAt
    }
  }
`

export const BATCH_DELETE_OPEN_SOURCE = gql`
  mutation DeleteOpenSources($ids: [ID!]!) {
    deleteOpenSources(ids: $ids) {
      n
      ok
      deletedCount
      ids
    }
  }
`
