import React, { FC, useEffect } from 'react'
import SettingsHeader from '../components/SettingsHeader/SettingsHeader'
import SettingItemWrapper from '../components/SettingItemWrapper/SettingItemWrapper'
import { Button, FormLabel, TextField } from '@material-ui/core'
import { useFormik } from 'formik'
import Uploader from 'src/components/Uploader/Uploader'
import { UploaderRes } from 'src/components/Uploader/types'
import useStyles from 'src/shared/styles'

const Profile: FC = () => {
  const classes = useStyles()
  const id = window.localStorage.getItem('id')

  const initialValues = {
    username: '',
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
      // await updateOpenSourceById({
      //   variables: { input: { ...values, id } },
      // })
      resetForm()
    },
  })

  const onChange = (data: UploaderRes) => {
    setFieldValue('avatarUrl', data.url)
  }

  useEffect(() => {
    // @ts-ignore
    // const { username, avatarUrl } = client.cache.data.get(`UserModel:${id}`)
    // setValues({ username, avatarUrl })

    // console.log(client.cache.data.get(`UserModel:${id}`))

    return () => {
      resetForm()
    }
  }, [id, resetForm, setValues])

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
            className={classes.textFieldSpace}
            error={!!errors.username}
            helperText={errors.username}
            autoFocus
            required
            fullWidth
            label="User Name"
            {...getFieldProps('username')}
          />
          <TextField
            className={classes.textFieldSpace}
            error={!!errors.username}
            helperText={errors.username}
            autoFocus
            required
            fullWidth
            label="Title"
            {...getFieldProps('username')}
          />
          <TextField
            className={classes.textFieldSpace}
            error={!!errors.username}
            helperText={errors.username}
            autoFocus
            required
            fullWidth
            label="City"
            {...getFieldProps('username')}
          />
          <TextField
            className={classes.textFieldSpace}
            error={!!errors.username}
            helperText={errors.username}
            autoFocus
            required
            fullWidth
            label="Organization"
            {...getFieldProps('username')}
          />
          <TextField
            className={classes.textFieldSpace}
            error={!!errors.username}
            helperText={errors.username}
            autoFocus
            required
            fullWidth
            label="Website"
            {...getFieldProps('username')}
          />
          <TextField
            className={classes.textFieldSpace}
            error={!!errors.username}
            helperText={errors.username}
            autoFocus
            required
            fullWidth
            label="Bio"
            {...getFieldProps('username')}
          />
          <div className={classes.uploaderGroup}>
            <FormLabel required>Avatar Url</FormLabel>
            <TextField
              error={!!errors.avatarUrl}
              helperText={errors.avatarUrl}
              style={{ display: 'none' }}
              required
              label="Avatar Url"
              disabled={true}
              {...getFieldProps('avatarUrl')}
            />
            <Uploader
              onChange={onChange}
              defaultFile={getFieldProps('avatarUrl').value}
            />
          </div>
          {/* <Button color="primary" onClick={goBack}>
          Cancel
        </Button> */}
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
