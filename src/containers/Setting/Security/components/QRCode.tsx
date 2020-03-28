import React, { FC } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Button, Card, Typography, TextField } from '@material-ui/core'
import classNames from 'classnames'
import styles from './TOTP.module.scss'

interface Props {
  userId: string
  qrcode: string
  createTOTP: Function
  createRecoveryCodes: Function
  validateTOTP: Function
}

const QRCode: FC<Props> = ({
  userId,
  qrcode,
  createTOTP,
  createRecoveryCodes,
  validateTOTP,
}) => {
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
    <>
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
    </>
  )
}

export default QRCode
