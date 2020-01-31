import gql from 'graphql-tag'

export const LOGIN = gql`
  query Login($input: LoginInput!) {
    login(input: $input) {
      _id
      authorization
      username
      email
      role
    }
  }
`
