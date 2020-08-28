import { gql } from '@apollo/client'

export const UPDATE_USER = gql`
  mutation UpdateUser($input: UpdateUserInput!) {
    updateUser(input: $input) {
      _id
      name
      location
      organization
      website
      bio
      avatarUrl
    }
  }
`
