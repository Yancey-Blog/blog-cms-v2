import React, {
  FC,
  useState,
  useEffect,
  ChangeEvent,
  forwardRef,
  Ref,
  ReactElement,
} from 'react'
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
  Slide,
} from '@material-ui/core'
import { TransitionProps } from '@material-ui/core/transitions'
import { Close } from '@material-ui/icons'
import { CREATE_TOTP, VALIDATE_TOTP } from '../../typeDefs'
import styles from './totp.module.scss'

interface Props {
  setOpen: Function
  open: boolean
}

const Transition = forwardRef(function Transition(
  props: TransitionProps & { children?: React.ReactElement<any, any> },
  ref: Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />
})

const TOTP: FC<Props> = ({ setOpen, open }) => {
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
      setOpen(false)
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
    <Dialog
      open={open}
      onClick={() => {
        setOpen(false)
      }}
      className={styles.totpDialog}
      // @ts-ignore
      TransitionComponent={Transition}
      keepMounted
    >
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
          onClick={() => setOpen(false)}
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
                  <Button
                    color="primary"
                    size="small"
                    onClick={() => setOpen(false)}
                  >
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
        <Button color="primary" onClick={() => setOpen(false)}>
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