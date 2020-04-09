import gql from 'graphql-tag'

export const UPDATE_USER = gql`
  mutation UpdateUser {
    updateUser {
      _id
      username
      role
      avaterUrl
    }
  }
`
