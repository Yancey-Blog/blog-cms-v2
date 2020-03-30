import React, { FC } from 'react'
import ChangePassword from './components/ChangePassword/ChangePassword'
import TwoFactors from './components/TwoFactors/TwoFactors'

const Security: FC = () => {
  return (
    <>
      <ChangePassword />
      <TwoFactors isTOTP={true} />
    </>
  )
}

export default Security
