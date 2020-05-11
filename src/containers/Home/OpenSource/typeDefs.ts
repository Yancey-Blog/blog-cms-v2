import gql from 'graphql-tag'
import { BATCH_DELETE_FRAGMENT } from 'src/graphql/graphqlFragment'

const OPEN_SOURCE_FRAGMENT = gql`
  fragment OpenSourceFragment on OpenSourceModel {
    _id
    title
    description
    url
    posterUrl
    createdAt
    updatedAt
  }
`

export const CREATE_ONE_OPEN_SOURCE = gql`
  mutation CreateOpenSource($input: CreateOpenSourceInput!) {
    createOpenSource(input: $input) {
      ...OpenSourceFragment
    }
  }
  ${OPEN_SOURCE_FRAGMENT}
`

export const UPDATE_ONE_OPEN_SOURCE = gql`
  mutation UpdateOpenSourceById($input: UpdateOpenSourceInput!) {
    updateOpenSourceById(input: $input) {
      ...OpenSourceFragment
    }
  }
  ${OPEN_SOURCE_FRAGMENT}
`

export const OPEN_SOURCES = gql`
  query GetOpenSources {
    getOpenSources {
      ...OpenSourceFragment
    }
  }
  ${OPEN_SOURCE_FRAGMENT}
`

export const DELETE_ONE_OPEN_SOURCE = gql`
  mutation DeleteOpenSourceById($id: ID!) {
    deleteOpenSourceById(id: $id) {
      ...OpenSourceFragment
    }
  }
  ${OPEN_SOURCE_FRAGMENT}
`

export const BATCH_DELETE_OPEN_SOURCE = gql`
  mutation DeleteOpenSources($ids: [ID!]!) {
    deleteOpenSources(ids: $ids) {
      ...BatchDeleteFragment
    }
  }
  ${BATCH_DELETE_FRAGMENT}
`
