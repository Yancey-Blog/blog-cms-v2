import gql from 'graphql-tag'

export const LOGIN = gql`
  query Login($input: LoginInput!) {
    login(input: $input) {
      _id
      email
      authorization
      role
      avaterUrl
      username
      phoneNumber
      isTOTP
    }
  }
`
