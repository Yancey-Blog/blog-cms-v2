import React, { FC } from 'react'
import ChangePassword from './components/ChangePassword/ChangePassword'
import TwoFactors from './components/TwoFactors/TwoFactors'
import SecurtyIntro from './components/SecurtyIntro/SecurtyIntro'

const Security: FC = () => {
  return (
    <>
      <SecurtyIntro />
      <ChangePassword />
      <TwoFactors isTOTP={true} />
    </>
  )
}

export default Security
