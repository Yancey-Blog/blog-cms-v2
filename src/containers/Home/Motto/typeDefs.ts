import gql from 'graphql-tag'
import { BATCH_DELETE_FRAGMENT } from 'src/shared/graphqlFragment'

const MOTTO_FRAGMENT = gql`
  fragment MottoFragment on MottoModel {
    _id
    content
    weight
    createdAt
    updatedAt
  }
`

export const CREATE_ONE_MOTTO = gql`
  mutation CreateMotto($input: CreateMottoInput!) {
    createMotto(input: $input) {
      ...MottoFragment
    }
  }
  ${MOTTO_FRAGMENT}
`

export const UPDATE_ONE_MOTTO = gql`
  mutation UpdateMottoById($input: UpdateMottoInput!) {
    updateMottoById(input: $input) {
      ...MottoFragment
    }
  }
  ${MOTTO_FRAGMENT}
`

export const EXCHANGE_POSITION = gql`
  mutation ExchangePositionMotto($input: ExchangePositionInput!) {
    exchangePositionMotto(input: $input) {
      ...MottoFragment
    }
  }
  ${MOTTO_FRAGMENT}
`

export const MOTTOS = gql`
  query GetMottos {
    getMottos {
      ...MottoFragment
    }
  }
  ${MOTTO_FRAGMENT}
`

export const DELETE_ONE_MOTTO = gql`
  mutation DeleteMottoById($id: ID!) {
    deleteMottoById(id: $id) {
      ...MottoFragment
    }
  }
  ${MOTTO_FRAGMENT}
`

export const BATCH_DELETE_MOTTO = gql`
  mutation DeleteMottos($ids: [ID!]!) {
    deleteMottos(ids: $ids) {
      ...BatchDeleteFragment
    }
  }
  ${BATCH_DELETE_FRAGMENT}
`
