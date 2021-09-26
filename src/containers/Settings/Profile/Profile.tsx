import { FC, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import { ClassNameMap } from '@mui/styles'
import * as Yup from 'yup'
import { useSnackbar } from 'notistack'
import { useMutation } from '@apollo/client'
import SettingsHeader from '../components/SettingsHeader/SettingsHeader'
import SettingWrapper from '../components/SettingWrapper/SettingWrapper'
import SettingItemWrapper from '../components/SettingItemWrapper/SettingItemWrapper'
import { Button, TextField } from '@mui/material'
import { useFormik } from 'formik'
import Uploader from 'src/components/Uploader/Uploader'
import { UploaderResponse } from 'src/components/Uploader/types'
import client from 'src/graphql/apolloClient'
import { UPDATE_USER } from './typeDefs'
import useStyles from './styles'

const Profile: FC = () => {
  const history = useHistory()
  const { pathname } = useLocation()

  const classes: ClassNameMap = useStyles()

  const { enqueueSnackbar } = useSnackbar()

  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted() {
      enqueueSnackbar(`Your profile has been updated!`, {
        variant: 'success',
      })
    },
  })

  const validationSchema = Yup.object().shape({
    website: Yup.string().url(),
  })

  const initialValues = {
    name: '',
    location: '',
    organization: '',
    website: '',
    bio: '',
    avatarUrl: '',
  }

  const {
    setFieldValue,
    handleSubmit,
    getFieldProps,
    setValues,
    isSubmitting,
    errors,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      await updateUser({
        variables: { input: values },
      })

      history.push(pathname)
    },
  })

  const onChange = async (data: UploaderResponse) => {
    setFieldValue('avatarUrl', data.url)
    await updateUser({
      variables: { input: { avatarUrl: data.url } },
    })

    history.push(pathname)
  }

  useEffect(() => {
    const { name, location, organization, website, bio, avatarUrl } =
      // @ts-ignore
      client.cache.data.data[
        `UserModel:${window.localStorage.getItem('userId')}`
      ]

    setValues({ name, location, organization, website, bio, avatarUrl })
  }, [setValues])

  return (
    <SettingWrapper>
      <SettingsHeader
        title="Personal info"
        subTitle="Basic info, like your name and photo, that you use on Yancey Blog CMS services"
      />

      <SettingItemWrapper title="Profile">
        <section className={classes.profileContainer}>
          <form onSubmit={handleSubmit}>
            <TextField
              className={classes.input}
              error={!!errors.name}
              helperText={errors.name}
              autoFocus
              fullWidth
              label="Name"
              {...getFieldProps('name')}
            />
            <TextField
              className={classes.input}
              error={!!errors.location}
              helperText={errors.location}
              autoFocus
              fullWidth
              label="Location"
              {...getFieldProps('location')}
            />
            <TextField
              className={classes.input}
              error={!!errors.organization}
              helperText={errors.organization}
              autoFocus
              fullWidth
              label="Organization"
              {...getFieldProps('organization')}
            />
            <TextField
              className={classes.input}
              error={!!errors.website}
              helperText={errors.website}
              autoFocus
              fullWidth
              label="Website"
              {...getFieldProps('website')}
            />
            <TextField
              className={classes.input}
              error={!!errors.bio}
              helperText={errors.bio}
              autoFocus
              fullWidth
              multiline
              rows="5"
              label="Bio"
              {...getFieldProps('bio')}
            />

            <Button
              color="primary"
              variant="contained"
              type="submit"
              disabled={isSubmitting}
            >
              Submit
            </Button>
          </form>

          <Uploader
            variant="outlined"
            className={classes.customUploader}
            needMarginLeft={false}
            onChange={onChange}
            defaultFile={getFieldProps('avatarUrl').value}
          />
        </section>
      </SettingItemWrapper>
    </SettingWrapper>
  )
}

export default Profile
