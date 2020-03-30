import React, { FC, useState, useEffect, ChangeEvent } from 'react'
import { useLocation } from 'react-router-dom'
import * as Yup from 'yup'
import { useSnackbar } from 'notistack'
import { useFormik } from 'formik'
import { useMutation } from '@apollo/react-hooks'
import {
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  FormControl,
  RadioGroup,
  Radio,
  FormControlLabel,
} from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { CREATE_TOTP, VALIDATE_TOTP } from '../../typeDefs'
import { goBack, parseSearch } from 'src/shared/utils'
import styles from './totp.module.scss'

const TOTP: FC = () => {
  const { search } = useLocation()
  const { showModal } = parseSearch(search)

  const userId = window.localStorage.getItem('userId')
  const email = window.localStorage.getItem('email')

  const [step, setStep] = useState(0)
  const [device, serDevice] = useState('iPhone')
  const [qrcode, setQRCode] = useState('')

  const { enqueueSnackbar } = useSnackbar()

  const validationSchema = Yup.object().shape({
    token: Yup.string()
      .matches(/^\d{6}$/, 'token must be a six-digit code.')
      .required('token should not be empty'),
  })

  const initialValues = {
    token: '',
  }

  const [createTOTP, { loading: isFetchingQRcode }] = useMutation(CREATE_TOTP)

  const [validateTOTP] = useMutation(VALIDATE_TOTP, {
    onCompleted() {
      enqueueSnackbar('Two-factor authentication is available now!', {
        variant: 'success',
      })
    },
  })

  const { handleSubmit, getFieldProps, isSubmitting, errors } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async values => {
      await validateTOTP({
        variables: { input: { ...values, userId } },
      })
      goBack()
    },
  })

  useEffect(() => {
    const fetchTOTP = async () => {
      const TOTPRes = await createTOTP({
        variables: { input: { userId, email } },
      })

      setQRCode(TOTPRes.data.createTOTP.qrcode)
    }

    fetchTOTP()
  }, [createTOTP, userId, email])

  return (
    <Dialog open={!!showModal} onClose={goBack} className={styles.totpDialog}>
      <DialogTitle className={styles.title}>
        <figure className={styles.logoImg}>
          <img
            src="https://static.yancey.app/cms-static/Google_Authenticator_41237.png"
            alt="Google Authenticator Logo"
          />
        </figure>

        <IconButton
          className={styles.closeBtn}
          edge="start"
          color="inherit"
          onClick={goBack}
          aria-label="close"
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <header className={styles.header}>
          {step === 0
            ? 'Get codes from the Authenticator app'
            : 'Set up Authenticator'}
        </header>

        {step === 0 && (
          <>
            <p className={styles.inputTipHeader}>
              Instead of waiting for text messages, get verification codes for
              free from the Authenticator app. It works even if your phone is
              offline.
            </p>
            <p className={styles.question}>What kind of phone do you have?</p>

            <FormControl component="fieldset">
              <RadioGroup
                aria-label="mobile devices"
                name="mobile-devices"
                value={device}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  serDevice(e.target.value)
                }
              >
                <FormControlLabel
                  value="Android"
                  control={<Radio />}
                  label="Android"
                />
                <FormControlLabel
                  value="iPhone"
                  control={<Radio />}
                  label="iPhone"
                />
              </RadioGroup>
            </FormControl>
          </>
        )}
        {step === 1 && (
          <>
            <ul className={styles.tipGroup}>
              <li className={styles.tipItem}>
                Get the Authenticator App from the{' '}
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={
                    device === 'iPhone'
                      ? 'https://itunes.apple.com/us/app/google-authenticator/id388497605'
                      : 'https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2'
                  }
                >
                  {device === 'iPhone' ? 'App' : 'Play'} Store
                </a>
                .
              </li>
              <li className={styles.tipItem}>
                In the App select{' '}
                <span className={styles.bold}>Set up account</span>.
              </li>
              <li className={styles.tipItem}>
                Choose <span className={styles.bold}>Scan barcode</span>.
              </li>
            </ul>
            <figure className={styles.qrcodeWrapper}>
              {isFetchingQRcode ? (
                <CircularProgress />
              ) : (
                <div>
                  <img src={qrcode} alt="qrcode" />
                  <Button color="primary" size="small" onClick={goBack}>
                    Can't scan it?
                  </Button>
                </div>
              )}
            </figure>
          </>
        )}

        {step === 2 && (
          <>
            <p className={styles.inputTipHeader}>
              Enter the 6-digit code you see in the app.
            </p>
            <form className={styles.customForm}>
              <TextField
                label="Enter code"
                error={!!errors.token}
                helperText={errors.token}
                autoFocus
                {...getFieldProps('token')}
              />
            </form>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={goBack}>
          Cancel
        </Button>
        <Button
          color="primary"
          type="submit"
          disabled={isSubmitting}
          onClick={
            step === 2 ? (e: any) => handleSubmit(e) : () => setStep(step + 1)
          }
        >
          {step === 2 ? 'Verify' : 'Next'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TOTP
