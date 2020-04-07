import React, { FC } from 'react'
import ChangePassword from './components/ChangePassword/ChangePassword'
import TwoFactors from './components/TwoFactors/TwoFactors'
import SecurtyIntro from './components/SecurtyIntro/SecurtyIntro'
import SettingsHeader from '../components/SettingsHeader/SettingsHeader'

const Security: FC = () => {
  return (
    <section>
      <SettingsHeader
        title="Security"
        subTitle="Settings and recommendations to help you keep your account secure"
      />
      <SecurtyIntro />
      <ChangePassword />
      <TwoFactors isTOTP={true} />
    </section>
  )
}

export default Security
