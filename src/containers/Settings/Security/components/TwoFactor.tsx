import React, { FC } from 'react'
import SettingItemWrapper from './SettingItemWrapper'
import TOTP from './TOTP'

const TwoFactor: FC = () => {
  return (
    <SettingItemWrapper
      title="Two-factor Authentication"
      imageUrl="https://www.gstatic.com/identity/boq/accountsettingsmobile/recovery_scene_1264x448_b9db53ca75b4e63d28b6944fcaa24ce7.png"
    ></SettingItemWrapper>
  )
}

export default TwoFactor
