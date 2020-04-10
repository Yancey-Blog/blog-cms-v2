import React, { FC, useEffect } from 'react'
import { useSnackbar } from 'notistack'
import { useMutation } from '@apollo/react-hooks'
import SettingsHeader from '../components/SettingsHeader/SettingsHeader'
import SettingItemWrapper from '../components/SettingItemWrapper/SettingItemWrapper'
import { Button, TextField } from '@material-ui/core'
import { useFormik } from 'formik'
import Uploader from 'src/components/Uploader/Uploader'
import { UploaderRes } from 'src/components/Uploader/types'
import client from 'src/shared/apolloClient'
import { UPDATE_USER } from './typeDefs'
import useStyles from './styles'

const Profile: FC = () => {
  const classes = useStyles()

  const { enqueueSnackbar } = useSnackbar()

  const [updateUser] = useMutation(UPDATE_USER, {
    onCompleted() {
      enqueueSnackbar(`Your Password has been changed! Please Re-Login.`, {
        variant: 'success',
      })
    },
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
    handleSubmit,
    setFieldValue,
    getFieldProps,
    setValues,
    resetForm,
    isSubmitting,
    errors,
  } = useFormik({
    initialValues,
    onSubmit: async (values) => {
      await updateUser({
        variables: { input: values },
      })
    },
  })

  const onChange = (data: UploaderRes) => {
    setFieldValue('avatarUrl', data.url)
  }

  useEffect(() => {
    const {
      name,
      location,
      organization,
      website,
      bio,
      avatarUrl,
      // @ts-ignore
    } = client.cache.data.get(
      `UserModel:${window.localStorage.getItem('userId')}`,
    )
    setValues({ name, location, organization, website, bio, avatarUrl })

    return () => {
      resetForm()
    }
  }, [resetForm, setValues])

  return (
    <section>
      <SettingsHeader
        title="Personal info"
        subTitle="Basic info, like your name and photo, that you use on Yancey Blog CMS services"
      />

      <SettingItemWrapper
        title="Profile"
        imageUrl="https://www.gstatic.com/identity/boq/accountsettingsmobile/aboutme_scene_1264x448_c62fe60e3bb1b8642822a028568898c4.png"
      >
        <form onSubmit={handleSubmit}>
          <TextField
            className={classes.input}
            error={!!errors.name}
            helperText={errors.name}
            autoFocus
            required
            fullWidth
            label="Name"
            {...getFieldProps('name')}
          />
          <TextField
            className={classes.input}
            error={!!errors.location}
            helperText={errors.location}
            autoFocus
            required
            fullWidth
            label="Location"
            {...getFieldProps('location')}
          />
          <TextField
            className={classes.input}
            error={!!errors.organization}
            helperText={errors.organization}
            autoFocus
            required
            fullWidth
            label="Organization"
            {...getFieldProps('organization')}
          />
          <TextField
            className={classes.input}
            error={!!errors.website}
            helperText={errors.website}
            autoFocus
            required
            fullWidth
            label="Website"
            {...getFieldProps('website')}
          />
          <TextField
            className={classes.input}
            error={!!errors.bio}
            helperText={errors.bio}
            autoFocus
            required
            fullWidth
            label="Bio"
            {...getFieldProps('bio')}
          />

          <Uploader
            onChange={onChange}
            defaultFile={getFieldProps('avatarUrl').value}
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
      </SettingItemWrapper>
    </section>
  )
}

export default Profile
