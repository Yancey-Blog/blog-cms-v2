import { gql } from 'apollo-boost'
import CreateOpenSourceInput from './gql.gql'

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
