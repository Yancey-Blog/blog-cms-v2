import React, { FC, useState, useEffect } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import {
  Button,
  Card,
  Typography,
  TextField,
  Stepper,
  Step,
  StepLabel,
} from '@material-ui/core'
import { GetApp, FileCopy } from '@material-ui/icons'
import classNames from 'classnames'
import CopyToClipboard from 'react-copy-to-clipboard'
import { generateFile } from 'src/shared/utils'
import { recoveryCodesFileName } from 'src/shared/constants'
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

  const [copyTxt, setCopyTxt] = useState('Copy')

  const validationSchema = Yup.object().shape({
    token: Yup.string()
      .matches(/^\d{6}$/, 'token must be a six-digit code.')
      .required('token should not be empty'),
  })

  const initialValues = {
    token: '',
  }

  const {
    handleSubmit,
    getFieldProps,
    resetForm,
    isSubmitting,
    errors,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async values => {
      await validateTOTP({
        variables: { input: { ...values, userId } },
      })
      resetForm()
    },
  })

  return (
    <section className={styles.totpWrapper}>
      {recoveryCodes.length !== 0 && (
        <Card className={styles.totpContainer}>
          <Typography variant="h5" gutterBottom>
            Recovery codes
          </Typography>
          <p className={styles.tips1}>
            Recovery codes are used to access your account in the event you
            cannot receive two-factor authentication codes.
          </p>
          <p className={styles.tips2}>
            Download, print, or copy your recovery codes before continuing
            two-factor authentication setup below.
          </p>
          <ul className={styles.recoveryCodesGroup}>
            {recoveryCodes.map(recoveryCodes => (
              <li className={styles.recoveryCodesItem} key={recoveryCodes}>
                {recoveryCodes}
              </li>
            ))}
          </ul>
          <div className={styles.buttonGroup}>
            <Button
              size="small"
              className={styles.btn}
              variant="contained"
              color="primary"
              href={generateFile(recoveryCodes.join('\n'))}
              download={recoveryCodesFileName}
              startIcon={<GetApp />}
            >
              Download
            </Button>
            <CopyToClipboard
              text={recoveryCodes.join(' ')}
              onCopy={() => setCopyTxt('Copied!')}
            >
              <Button
                size="small"
                variant="contained"
                color="primary"
                className={styles.btn}
                startIcon={<FileCopy />}
              >
                {copyTxt}
              </Button>
            </CopyToClipboard>
          </div>
          <p className={styles.tips3}>
            <span className={styles.tipsBlod}>
              Treat your recovery codes with the same level of attention as you
              would your password!{' '}
            </span>
            We recommend saving them with a password manager such as{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://lastpass.com/"
            >
              Lastpass
            </a>
            ,{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://1password.com/"
            >
              1Password
            </a>
            , or{' '}
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://keepersecurity.com/"
            >
              Keeper
            </a>
            .
          </p>
        </Card>
      )}

      {qrcode && (
        <Card className={styles.totpContainer}>
          <Typography variant="h5" gutterBottom>
            Scan this barcode with your app.
          </Typography>
          <p className={styles.tips1}>
            Scan the image above with the two-factor authentication app on your
            phone.
          </p>
          <Card className={styles.qrcodeWrapper}>
            <img src={qrcode} alt="qrcode" />
          </Card>
          <p className={classNames(styles.tipsBlod, styles.inputTipHeader)}>
            Enter the six-digit code from the application
          </p>
          <p className={styles.tips1}>
            After scanning the barcode image, the app will display a six-digit
            code that you can enter below.
          </p>
          <form className={styles.customForm} onSubmit={handleSubmit}>
            <TextField
              error={!!errors.token}
              helperText={errors.token}
              autoFocus
              {...getFieldProps('token')}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="small"
              className={styles.inputBtn}
              disabled={isSubmitting}
            >
              Enable
            </Button>
          </form>
        </Card>
      )}
    </section>
  )
}

export default TOTP
