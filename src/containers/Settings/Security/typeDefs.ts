import gql from 'graphql-tag'

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

export const SEND_SMS = gql`
  mutation SendSMS($phoneNumber: String!) {
    sendSMS(phoneNumber: $phoneNumber) {
      success
    }
  }
`

export const VALIDATE_SMS = gql`
  mutation ValidateSMS($input: ValidateSMSInput!) {
    validateSMS(input: $input) {
      _id
      phoneNumber
    }
  }
`
