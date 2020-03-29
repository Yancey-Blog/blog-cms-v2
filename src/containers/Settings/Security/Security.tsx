import React, { FC } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_RECOVERY_CODES, CREATE_TOTP } from './typeDefs'
import TOTP from './components/TOTP'

const Security: FC = () => {
  const [createTOTP] = useMutation(CREATE_TOTP)
  const [createRecoveryCodes] = useMutation(CREATE_RECOVERY_CODES)

  return (
    <TOTP createTOTP={createTOTP} createRecoveryCodes={createRecoveryCodes} />
  )
}

export default Security
