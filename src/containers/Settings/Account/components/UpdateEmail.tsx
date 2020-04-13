import React, { FC } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Button, TextField } from '@material-ui/core'
import { OSS_CMS_PATH } from 'src/shared/constants'
import SettingItemWrapper from '../../components/SettingItemWrapper/SettingItemWrapper'
import useStyles from '../styles'

interface Props {
  email: string
  updateEmail: Function
}

const validationSchema = Yup.object().shape({
  email: Yup.string().email().required(),
})

const UpdateEmail: FC<Props> = ({ email, updateEmail }) => {
  const classes = useStyles()

  const initialValues = {
    email,
  }

  const { handleSubmit, getFieldProps, isSubmitting, errors } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      await updateEmail({
        variables: { email: values.email },
      })
    },
  })

  return (
    <SettingItemWrapper
      title="Change Email"
      imageUrl={`${OSS_CMS_PATH}/reservations_scene.png`}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          className={classes.input}
          error={!!errors.email}
          helperText={errors.email}
          autoFocus
          fullWidth
          label="Email"
          {...getFieldProps('email')}
        />
        <Button
          color="primary"
          variant="contained"
          type="submit"
          disabled={isSubmitting}
        >
          Update Email
        </Button>
      </form>
    </SettingItemWrapper>
  )
}

export default UpdateEmail
