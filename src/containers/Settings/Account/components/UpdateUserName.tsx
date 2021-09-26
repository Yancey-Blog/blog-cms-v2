import { FC } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { Button, TextField } from '@mui/material'
import { ClassNameMap } from '@mui/styles'
import { AZURE_BLOB_PATH } from 'src/shared/constants'
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
  const classes: ClassNameMap = useStyles()

  const initialValues = {
    username,
  }

  const { handleSubmit, getFieldProps, isSubmitting, errors, values } =
    useFormik({
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
      imageUrl={`${AZURE_BLOB_PATH}/privacycheckup_scene.png`}
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
          disabled={isSubmitting || values.username === username}
        >
          Update UserName
        </Button>
      </form>
    </SettingItemWrapper>
  )
}

export default UpdateUserName
