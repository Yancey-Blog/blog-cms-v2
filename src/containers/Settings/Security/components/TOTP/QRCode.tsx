import React, { FC } from 'react'
import * as Yup from 'yup'
import { useSnackbar } from 'notistack'
import { useFormik } from 'formik'
import { useMutation } from '@apollo/react-hooks'
import { Button, Card, Typography, TextField } from '@material-ui/core'
import classNames from 'classnames'
import { VALIDATE_TOTP } from '../../typeDefs'
import styles from './totp.module.scss'

interface Props {
  userId: string | null
  qrcode: string
}

const QRCode: FC<Props> = ({ userId, qrcode }) => {
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

  const [validateTOTP] = useMutation(VALIDATE_TOTP, {
    onCompleted() {
      enqueueSnackbar('Two-factor authentication is available now!', {
        variant: 'success',
      })
    },
  })

  return (
    <section>
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
        After scanning the barcode image, the app will display a six-digit code
        that you can enter below.
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
    </section>
  )
}

export default QRCode
