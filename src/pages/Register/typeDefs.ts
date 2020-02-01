import gql from 'graphql-tag'

export const REGISTER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      _id
      email
      authorization
      role
      avaterUrl
      username
      phoneNumber
      isTOTP
      createdAt
      updatedAt
    }
  }
`
