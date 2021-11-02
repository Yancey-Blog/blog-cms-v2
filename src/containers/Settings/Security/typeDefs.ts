import { gql } from '@apollo/client'

export const CREATE_TOTP = gql`
  mutation CreateTOTP {
    createTOTP {
      qrcode
      key
    }
  }
`

export const CREATE_RECOVERY_CODES = gql`
  mutation CreateRecoveryCodes {
    createRecoveryCodes {
      recoveryCodes
    }
  }
`

export const VALIDATE_TOTP = gql`
  mutation ValidateTOTP($input: ValidateTOTPInput!) {
    validateTOTP(input: $input) {
      _id
      isTOTP
    }
  }
`

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($input: ChangePasswordInput!) {
    changePassword(input: $input) {
      _id
    }
  }
`
