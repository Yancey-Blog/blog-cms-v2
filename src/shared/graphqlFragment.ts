import gql from 'graphql-tag'

export const BATCH_DELETE_FRAGMENT = gql`
  fragment BatchDeleteFragment on BatchDeleteModel {
    n
    ok
    deletedCount
    ids
  }
`
