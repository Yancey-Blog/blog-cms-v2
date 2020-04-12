import React, { FC } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Button, TextField } from '@material-ui/core'
import SettingItemWrapper from '../../components/SettingItemWrapper/SettingItemWrapper'
import useStyles from '../styles'

interface Props {
  username: string
  updateUserName: Function
}

const validationSchema = Yup.object().shape({
  username: Yup.string().required(),
})

const UpdateUserName: FC<Props> = ({ username, updateUserName }) => {
  const classes = useStyles()

  const initialValues = {
    username,
  }

  const { handleSubmit, getFieldProps, isSubmitting, errors } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      await updateUserName({
        variables: { username: values.username },
      })
    },
  })

  return (
    <SettingItemWrapper
      title="Change UserName"
      imageUrl="https://www.gstatic.com/identity/boq/accountsettingsmobile/privacycheckup_scene_1264x448_e11496d496d0f3433f240aef3907d086.png"
    >
      <form onSubmit={handleSubmit}>
        <TextField
          className={classes.input}
          error={!!errors.username}
          helperText={errors.username}
          autoFocus
          fullWidth
          label="User Name"
          {...getFieldProps('username')}
        />
        <Button
          color="primary"
          variant="contained"
          type="submit"
          disabled={isSubmitting}
        >
          Update UserName
        </Button>
      </form>
    </SettingItemWrapper>
  )
}

export default UpdateUserName
