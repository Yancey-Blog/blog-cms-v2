import React, { FC, useState, useEffect } from 'react'
import SettingItemWrapper from './SettingItemWrapper'
import QRCode from './QRCode'
import RecoveryCodes from './RecoveryCodes'
import styles from './TOTP.module.scss'

interface Props {
  createTOTP: Function
  createRecoveryCodes: Function
}

const TOTP: FC<Props> = ({ createTOTP, createRecoveryCodes }) => {
  const userId = window.localStorage.getItem('userId')

  const [qrcode, setQRCode] = useState('')
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([])

  useEffect(() => {
    const fetchTOTPAndRecoveryCodes = async () => {
      const TOTPRes = await createTOTP({
        variables: { userId },
      })

      const recoveryCodesRequest = await createRecoveryCodes({
        variables: { userId },
      })

      setQRCode(TOTPRes.data.createTOTP.qrcode)
      setRecoveryCodes(
        recoveryCodesRequest.data.createRecoveryCodes.recoveryCodes,
      )
    }

    fetchTOTPAndRecoveryCodes()
  }, [createRecoveryCodes, createTOTP, userId])

  return (
    <SettingItemWrapper
      title="Two-factor Authentication"
      imageUrl="https://www.gstatic.com/identity/boq/accountsettingsmobile/recovery_scene_1264x448_b9db53ca75b4e63d28b6944fcaa24ce7.png"
    >
      <section className={styles.totpWrapper}>
        {/* <RecoveryCodes recoveryCodes={recoveryCodes} /> */}
        {/* <QRCode userId={userId} qrcode={qrcode} /> */}
      </section>
    </SettingItemWrapper>
  )
}

export default TOTP
