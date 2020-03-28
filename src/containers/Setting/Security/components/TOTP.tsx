import React, { FC, useState, useEffect } from 'react'
import { Stepper, Step, StepLabel } from '@material-ui/core'
import QRCode from './QRCode'
import RecoveryCodes from './RecoveryCodes'
import styles from './TOTP.module.scss'

interface Props {
  createTOTP: Function
  createRecoveryCodes: Function
  validateTOTP: Function
}

const TOTP: FC<Props> = ({ createTOTP, createRecoveryCodes, validateTOTP }) => {
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
    <section className={styles.totpWrapper}>
      <QRCode userId={userId} qrcode={qrcode} validateTOTP={validateTOTP} />
      <RecoveryCodes recoveryCodes={recoveryCodes} />
    </section>
  )
}

export default TOTP
