import { gql } from '@apollo/client'

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
    avatarUrl
    phoneNumber
    enableTOTP
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

export const REGISTER = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`

export const LOGIN_VERIFY_TOTP = gql`
  query LoginVerifyTOTP($totpCode: String!) {
    loginVerifyTOTP(totpCode: $totpCode) {
      ...UserFragment
    }
  }
  ${USER_FRAGMENT}
`
