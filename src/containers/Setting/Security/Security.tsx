import React, { FC } from 'react'
import { useSnackbar } from 'notistack'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_RECOVERY_CODES, CREATE_TOTP, VALIDATE_TOTP } from './typeDefs'
import TOTP from './components/TOTP'

const Security: FC = () => {
  const { enqueueSnackbar } = useSnackbar()

  const [createTOTP] = useMutation(CREATE_TOTP)
  const [createRecoveryCodes] = useMutation(CREATE_RECOVERY_CODES)
  const [validateTOTP] = useMutation(VALIDATE_TOTP, {
    onCompleted() {
      enqueueSnackbar('Two-factor authentication is available now!', {
        variant: 'success',
      })
    },
  })
  return (
    <TOTP
      createTOTP={createTOTP}
      createRecoveryCodes={createRecoveryCodes}
      validateTOTP={validateTOTP}
    />
  )
}

export default Security
