import { FC } from 'react'
import * as Yup from 'yup'
import { useSnackbar } from 'notistack'
import { useFormik } from 'formik'
import { useMutation } from '@apollo/client'
import { TextField, Button } from '@material-ui/core'
import { logout } from 'src/shared/utils'
import { PASSWORD_REGEXP, OSS_CMS_PATH } from 'src/shared/constants'
import SettingItemWrapper from 'src/containers/Settings/components/SettingItemWrapper/SettingItemWrapper'
import styles from './changePassword.module.scss'
import { CHANGE_PASSWORD } from '../../typeDefs'

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
      .matches(PASSWORD_REGEXP, 'Please enter a more complex password'),
    confirmNewPassword: Yup.string()
      // @ts-ignore
      // FIXME: oneOf's first parameter is an array, and the
      // second element of the array is assignable to type
      // 'string | Ref | undefined', but `@types/yup` has not
      // been updated.
      .oneOf([Yup.ref('newPassword'), undefined], "Passwords don't match")
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
      imageUrl={`${OSS_CMS_PATH}/signin_scene.png`}
    >
      <form onSubmit={handleSubmit}>
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
