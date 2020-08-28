import { gql } from '@apollo/client'

export const BATCH_DELETE_FRAGMENT = gql`
  fragment BatchDeleteFragment on BatchDeleteModel {
    n
    ok
    deletedCount
    ids
  }
`

export const BATCH_UPDATE_FRAGMENT = gql`
  fragment BatchUpdateFragment on BatchUpdateModel {
    n
    ok
    nModified
    ids
  }
`
