import gql from 'graphql-tag'

export const USER_FRAGMENT = gql`
  fragment UserFragment on UserModel {
    _id
    authorization
    username
    email
    role
    name
    location
    organization
    website
    bio
    avaterUrl
    phoneNumber
    isTOTP
    createdAt
    createdAt
    updatedAt
  }
`

export const LOGIN = gql`
  query Login($input: LoginInput!) {
    login(input: $input) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`
