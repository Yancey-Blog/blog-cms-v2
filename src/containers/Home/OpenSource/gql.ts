import { gql } from 'apollo-boost'

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
