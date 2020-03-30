import React, { FC, useState, useEffect } from 'react'
import * as Yup from 'yup'
import { useSnackbar } from 'notistack'
import { useFormik } from 'formik'
import { useMutation } from '@apollo/react-hooks'
import {
  Button,
  Card,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core'
import classNames from 'classnames'
import { CREATE_TOTP, VALIDATE_TOTP } from '../../typeDefs'
import { goBack } from 'src/shared/utils'
import styles from './totp.module.scss'

interface Props {
  showModal: boolean
}

const TOTP: FC<Props> = ({ showModal }) => {
  const userId = window.localStorage.getItem('userId')
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

  const [createTOTP] = useMutation(CREATE_TOTP)

  const [validateTOTP] = useMutation(VALIDATE_TOTP, {
    onCompleted() {
      enqueueSnackbar('Two-factor authentication is available now!', {
        variant: 'success',
      })
    },
  })

  useEffect(() => {
    const fetchTOTPAndRecoveryCodes = async () => {
      const TOTPRes = await createTOTP({
        variables: { userId },
      })

      setQRCode(TOTPRes.data.createTOTP.qrcode)
    }

    fetchTOTPAndRecoveryCodes()
  }, [createTOTP, userId])

  return (
    <Dialog open={!!showModal} onClose={goBack} className={styles.totpDialog}>
      <DialogTitle className={styles.title}>
        <figure className={styles.logoImg}>
          <img
            src="https://static.yancey.app/cms-static/Google_Authenticator_41237.png"
            alt="Google Authenticator Logo"
          />
        </figure>
      </DialogTitle>
      <DialogContent>
        <header className={styles.header}>Set up Authenticator</header>

        <ul className={styles.tipGroup}>
          <li className={styles.tipItem}>
            Get the Authenticator App from the App Store.
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
          <img src={qrcode} alt="qrcode" />
          <Button color="primary" size="small" onClick={goBack}>
            Can't scan it?
          </Button>
        </figure>

        {/* <p className={classNames(styles.tipsBlod, styles.inputTipHeader)}>
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
        </form> */}
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={goBack}>
          Cancel
        </Button>
        <Button color="primary" type="submit" disabled={isSubmitting}>
          Next
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TOTP
