import { FC, useState, useEffect } from 'react'
import * as Yup from 'yup'
import { useSnackbar } from 'notistack'
import { useFormik } from 'formik'
import CopyToClipboard from 'react-copy-to-clipboard'
import { useMutation } from '@apollo/client'
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
import {
  AZURE_BLOB_PATH,
  GOOGLE_AUTHENTICATOR_FOR_IOS,
  GOOGLE_AUTHENTICATOR_FOR_ANDROID,
} from 'src/shared/constants'
import Transition from 'src/components/Transition/Transition'
import { CREATE_TOTP, VALIDATE_TOTP } from '../../typeDefs'
import styles from './totp.module.scss'

interface TOTPRes {
  key: string
  qrcode: string
}

interface Props {
  setOpen: Function
  open: boolean
}

const TOTP: FC<Props> = ({ setOpen, open }) => {
  const { enqueueSnackbar } = useSnackbar()
  const [qrcodeMode, setQrcodeMode] = useState(true)
  const [data, setData] = useState<TOTPRes>({ key: '', qrcode: '' })
  const [step, setStep] = useState(0)
  const onClose = () => {
    setOpen(false)
    setStep(0)
    resetForm()
    setQrcodeMode(true)
  }

  const [createTOTP, { loading }] = useMutation(CREATE_TOTP)

  const [validateTOTP] = useMutation(VALIDATE_TOTP, {
    onCompleted() {
      enqueueSnackbar('Two-factor authentication is available now!', {
        variant: 'success',
      })
      onClose()
    },
  })

  const validationSchema = Yup.object().shape({
    code: Yup.string()
      .matches(/^\d{6}$/, 'Invalid code. Please try again.')
      .required('Please enter your verification code.'),
  })

  const initialValues = {
    code: '',
    device: 'iPhone',
  }

  const {
    values,
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
        variables: { input: { code: values.code, key: data.key } },
      })
    },
  })

  useEffect(() => {
    const fetchTOTP = async () => {
      const TOTPRes = await createTOTP()
      setData(TOTPRes.data.createTOTP)
    }

    if (step === 1) {
      fetchTOTP()
    }
  }, [createTOTP, step])

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
            src={`${AZURE_BLOB_PATH}/Google_Authenticator_41237.png`}
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
            : qrcodeMode
            ? 'Set up Authenticator'
            : "Can't scan the barcode?"}
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
                {...getFieldProps('device')}
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
            {qrcodeMode ? (
              <>
                <ul className={styles.tipGroup}>
                  <li className={styles.tipItem}>
                    Get the Authenticator App from the{' '}
                    <a
                      target="_blank"
                      rel="noopener noreferrer"
                      href={
                        values.device === 'iPhone'
                          ? GOOGLE_AUTHENTICATOR_FOR_IOS
                          : GOOGLE_AUTHENTICATOR_FOR_ANDROID
                      }
                    >
                      {values.device === 'iPhone' ? 'App' : 'Play'} Store
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
                  {loading ? (
                    <CircularProgress />
                  ) : (
                    <div>
                      <img src={data.qrcode} alt="qrcode" />
                      <Button
                        color="primary"
                        size="small"
                        onClick={() => {
                          setQrcodeMode(false)
                        }}
                      >
                        Can't scan it?
                      </Button>
                    </div>
                  )}
                </figure>
              </>
            ) : (
              <ul className={styles.tipGroup}>
                <li className={styles.tipItem}>
                  Tap <span className={styles.bold}>Menu</span>, then{' '}
                  <span className={styles.bold}>Set up account</span>.
                </li>
                <li className={styles.tipItem}>
                  Tap <span className={styles.bold}>Enter provided key</span>.
                </li>
                <li className={styles.tipItem}>
                  Enter your email address and this key:
                </li>
                <div className={styles.totpKey}>
                  <CopyToClipboard text={data.key}>
                    <span className={styles.keyTxt}>{data.key}</span>
                  </CopyToClipboard>
                </div>

                <li className={styles.tipItem}>
                  Make sure Time based is turned on, and tap Add to finish.
                </li>
              </ul>
            )}
          </>
        )}

        {step === 2 && (
          <>
            <p className={styles.inputTipHeader}>
              Enter the 6-digit code you see in the app.
            </p>
            <TextField
              className={styles.customInput}
              label="Enter code"
              error={!!errors.code}
              helperText={errors.code}
              autoFocus
              {...getFieldProps('code')}
            />
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
          disabled={isSubmitting || loading}
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
