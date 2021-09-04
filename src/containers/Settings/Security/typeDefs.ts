import { gql } from '@apollo/client'

export const GENERATE_QRCODE_OF_TOTP = gql`
  mutation GenerateQRCodeOfTOTP {
    generateQRCodeOfTOTP {
      qrcode
      key
    }
  }
`

export const TURN_ON_TOTP = gql`
  mutation TurnOnTOTP($input: ValidateTOTPInput!) {
    turnOnTOTP(input: $input)
  }
`

export const TURN_OFF_TOTP = gql`
  mutation TurnOffTOTP {
    turnOffTOTP
  }
`

export const CREATE_RECOVERY_CODES = gql`
  mutation CreateRecoveryCodes {
    createRecoveryCodes {
      recoveryCodes
    }
  }
`

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($input: ChangePasswordInput!) {
    changePassword(input: $input)
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
