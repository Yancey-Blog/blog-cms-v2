import React, { FC, useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { Dialog, DialogContent, DialogTitle } from '@material-ui/core'
import { CREATE_RECOVERY_CODES, CREATE_TOTP } from '../../typeDefs'
import QRCode from './QRCode'
import RecoveryCodes from '../RecoveryCode/RecoveryCodes'
import { goBack } from 'src/shared/utils'
import styles from './totp.module.scss'

interface Props {
  showModal: boolean
}

const TOTP: FC<Props> = ({ showModal }) => {
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
    <Dialog open={!!showModal} onClose={goBack}>
      <DialogTitle>Recovery codes</DialogTitle>
      <DialogContent>
        {/* <RecoveryCodes recoveryCodes={recoveryCodes} /> */}
        <QRCode userId={userId} qrcode={qrcode} />
      </DialogContent>
    </Dialog>
  )
}

export default TOTP
