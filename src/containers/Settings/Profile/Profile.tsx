import React, { FC, useEffect } from 'react'
import * as Yup from 'yup'
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
    resetForm,
    isSubmitting,
    errors,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      await updateUser({
        variables: { input: values },
      })
    },
  })

  const onChange = async (data: UploaderRes) => {
    setFieldValue('avatarUrl', data.url)
    await updateUser({
      variables: { input: { avatarUrl: data.url } },
    })
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
  }, [resetForm, setValues])

  return (
    <>
      <SettingsHeader
        title="Personal info"
        subTitle="Basic info, like your name and photo, that you use on Yancey Blog CMS services"
      />

      <SettingItemWrapper
        title="Profile"
        imageUrl="https://www.gstatic.com/identity/boq/accountsettingsmobile/aboutme_scene_1264x448_c62fe60e3bb1b8642822a028568898c4.png"
      >
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
    </>
  )
}

export default Profile
