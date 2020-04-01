import React, {
  FC,
  useState,
  useEffect,
  ChangeEvent,
  forwardRef,
  Ref,
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
  const onClose = () => {
    setOpen(false)
    setStep(0)
  }

  const userId = window.localStorage.getItem('userId')

  const [key, setKey] = useState('')

  const [step, setStep] = useState(0)
  const [device, setDevice] = useState('iPhone')
  const [qrcode, setQRCode] = useState('')

  const { enqueueSnackbar } = useSnackbar()

  const validationSchema = Yup.object().shape({
    code: Yup.string()
      .matches(/^\d{6}$/, 'Invalid code. Please try again.')
      .required('Please enter your verification code.'),
  })

  const initialValues = {
    code: '',
  }

  const {
    handleSubmit,
    getFieldProps,
    isSubmitting,
    errors,
    resetForm,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      await validateTOTP({
        variables: { input: { ...values, userId, key } },
      })
    },
  })

  const [createTOTP, { loading: isFetchingQRcode }] = useMutation(CREATE_TOTP)

  const [validateTOTP] = useMutation(VALIDATE_TOTP, {
    onCompleted() {
      enqueueSnackbar('Two-factor authentication is available now!', {
        variant: 'success',
      })
      resetForm()
      onClose()
    },
    onError() {
      resetForm()
    },
  })

  useEffect(() => {
    const fetchTOTP = async () => {
      const TOTPRes = await createTOTP()
      setQRCode(TOTPRes.data.createTOTP.qrcode)
      setKey(TOTPRes.data.createTOTP.key)
    }

    if (step === 1) {
      fetchTOTP()
    }
  }, [createTOTP, userId, step])

  return (
    <Dialog
      open={open}
      onClose={onClose}
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
          onClick={onClose}
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
                  setDevice(e.target.value)
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
                  <Button color="primary" size="small" onClick={onClose}>
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
                error={!!errors.code}
                helperText={errors.code}
                autoFocus
                {...getFieldProps('code')}
              />
            </form>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={onClose}>
          Cancel
        </Button>
        <Button
          color="primary"
          type="submit"
          disabled={isSubmitting || isFetchingQRcode}
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
