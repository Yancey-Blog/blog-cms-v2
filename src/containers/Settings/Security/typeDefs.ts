import gql from 'graphql-tag'

export const CREATE_TOTP = gql`
  mutation CreateTOTP($input: CreateTOTPInput!) {
    createTOTP(input: $input) {
      qrcode
      secretKey
    }
  }
`

export const CREATE_RECOVERY_CODES = gql`
  mutation CreateRecoveryCodes($userId: ID!) {
    createRecoveryCodes(userId: $userId) {
      recoveryCodes
    }
  }
`

export const VALIDATE_TOTP = gql`
  mutation ValidateTOTP($input: ValidateTOTPInput!) {
    validateTOTP(input: $input) {
      isTOTP
    }
  }
`
