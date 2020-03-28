import React, { FC, useState, useEffect } from 'react'
import { Stepper, Step, StepLabel, Button } from '@material-ui/core'
import QRCode from './QRCode'
import RecoveryCodes from './RecoveryCodes'
import styles from './TOTP.module.scss'

interface Props {
  createTOTP: Function
  createRecoveryCodes: Function
}

export const steps = [
  '1. Download or copy the recovery codes',
  '2. Scan this barcode with your app.',
]

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

  const [activeStep, setActiveStep] = useState(0)

  const handleNext = () => {
    setActiveStep(prevActiveStep => prevActiveStep + 1)
  }

  const handleBack = () => {
    setActiveStep(prevActiveStep => prevActiveStep - 1)
  }

  return (
    <>
      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map(label => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <section className={styles.totpWrapper}>
        {activeStep === 0 ? (
          <RecoveryCodes recoveryCodes={recoveryCodes} />
        ) : (
          <QRCode
            userId={userId}
            qrcode={qrcode}
            handleNext={handleNext}
            activeStep={activeStep}
          />
        )}
      </section>

      <div className={styles.buttonGroup}>
        {activeStep !== steps.length && (
          <>
            <Button
              className={styles.btn}
              variant="contained"
              color="secondary"
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            <Button
              className={styles.btn}
              variant="contained"
              color="primary"
              onClick={handleNext}
              disabled={activeStep === steps.length - 1}
            >
              Next
            </Button>
          </>
        )}
      </div>
    </>
  )
}

export default TOTP
