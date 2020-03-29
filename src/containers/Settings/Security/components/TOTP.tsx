import React, { FC, useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { CREATE_RECOVERY_CODES, CREATE_TOTP } from '../typeDefs'
import QRCode from './QRCode'
import RecoveryCodes from './RecoveryCodes'
import styles from './TOTP.module.scss'

const TOTP: FC = () => {
  const userId = window.localStorage.getItem('userId')

  const [qrcode, setQRCode] = useState('')
  const [recoveryCodes, setRecoveryCodes] = useState<string[]>([])

  const [createTOTP] = useMutation(CREATE_TOTP)
  const [createRecoveryCodes] = useMutation(CREATE_RECOVERY_CODES)

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
      <RecoveryCodes recoveryCodes={recoveryCodes} />
      {/* <QRCode userId={userId} qrcode={qrcode} /> */}
    </section>
  )
}

export default TOTP
