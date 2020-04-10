import React, { FC } from 'react'
import * as Yup from 'yup'
import { useSnackbar } from 'notistack'
import { useFormik } from 'formik'
import { useMutation } from '@apollo/react-hooks'
import { TextField, Button } from '@material-ui/core'
import { CHANGE_PASSWORD } from '../../typeDefs'
import SettingItemWrapper from 'src/containers/Settings/components/SettingItemWrapper/SettingItemWrapper'
import styles from './changePassword.module.scss'
import { logout } from 'src/shared/utils'
import { PASSWORD_REGEXP } from 'src/shared/constants'

const ChangePassword: FC = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [changePassword] = useMutation(CHANGE_PASSWORD, {
    onCompleted() {
      enqueueSnackbar(`Your Password has been changed! Please Re-Login.`, {
        variant: 'success',
      })
      const timer = setTimeout(() => {
        logout()
        clearTimeout(timer)
      }, 1000)
    },
  })

  const initialValues = {
    oldPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  }

  const validationSchema = Yup.object().shape({
    oldPassword: Yup.string().required('Old Password is required.'),
    newPassword: Yup.string()
      .required('New Password is required.')
      .matches(PASSWORD_REGEXP, 'Please try a more complex password'),
    confirmNewPassword: Yup.string()
      .oneOf([Yup.ref('newPassword'), null], "Passwords don't match")
      .required('Confirm Password is required'),
  })

  const {
    handleSubmit,
    getFieldProps,
    resetForm,
    isSubmitting,
    errors,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      const { confirmNewPassword, ...rest } = values
      await changePassword({
        variables: { input: rest },
      })

      resetForm()
    },
  })

  return (
    <SettingItemWrapper
      title="Change Password"
      imageUrl="https://www.gstatic.com/identity/boq/accountsettingsmobile/signin_scene_1264x448_759b470ee2277f22a1907452a1522774.png"
    >
      <form className={styles.customForm} onSubmit={handleSubmit}>
        <TextField
          type="password"
          className={styles.input}
          error={!!errors.oldPassword}
          helperText={errors.oldPassword}
          required
          label="Old Password"
          {...getFieldProps('oldPassword')}
        />
        <TextField
          type="password"
          className={styles.input}
          error={!!errors.newPassword}
          helperText={errors.newPassword}
          required
          label="New Password"
          {...getFieldProps('newPassword')}
        />
        <TextField
          type="password"
          className={styles.input}
          error={!!errors.confirmNewPassword}
          helperText={errors.confirmNewPassword}
          required
          label="Confirm New Password"
          {...getFieldProps('confirmNewPassword')}
        />
        <p className={styles.tip}>
          Make sure it's at least 8 characters and at least including a number,
          a lowercase letter, a uppercase letter and a punctuation.
        </p>

        <Button
          disableElevation={true}
          variant="contained"
          color="primary"
          type="submit"
          disabled={isSubmitting}
        >
          update password
        </Button>
      </form>
    </SettingItemWrapper>
  )
}

export default ChangePassword
