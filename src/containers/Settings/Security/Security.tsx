import React, { FC } from 'react'
import ChangePassword from './components/ChangePassword/ChangePassword'
import TwoFactors from './components/TwoFactors/TwoFactors'
import DevicesInfo from './components/DevicesInfo/DevicesInfo'

const Security: FC = () => {
  return (
    <>
      <ChangePassword />
      <TwoFactors isTOTP={true} />
      <DevicesInfo />
    </>
  )
}

export default Security
