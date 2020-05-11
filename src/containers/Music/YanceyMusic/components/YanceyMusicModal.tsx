import React, { FC, useEffect } from 'react'
import * as Yup from 'yup'
import {
  Button,
  DialogActions,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  TextField,
  FormLabel,
} from '@material-ui/core'
import { useFormik } from 'formik'
import { KeyboardDateTimePicker } from '@material-ui/pickers'
import client from 'src/shared/apolloClient'
import Uploader from 'src/components/Uploader/Uploader'
import { UploaderRes } from 'src/components/Uploader/types'
import { Open } from 'src/hooks/useOpenModal'
import useStyles from 'src/shared/globalStyles'

interface Props {
  open: Open
  handleOpen: Function
  createYanceyMusic: Function
  updateYanceyMusicById: Function
}

const YanceyMusicModal: FC<Props> = ({
  open,
  handleOpen,
  createYanceyMusic,
  updateYanceyMusicById,
}) => {
  const { isOpen, id } = open

  const classes = useStyles()

  const initialValues = {
    title: '',
    soundCloudUrl: '',
    releaseDate: new Date(),
    posterUrl: '',
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required.'),
    releaseDate: Yup.string().required('Release Date is required.'),
    soundCloudUrl: Yup.string().url().required('SoundCloud Url is required.'),
    posterUrl: Yup.string().url().required('Post Url is required.'),
  })

  const {
    handleSubmit,
    setFieldValue,
    getFieldProps,
    setValues,
    resetForm,
    isSubmitting,
    errors,
    values,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      if (id) {
        await updateYanceyMusicById({
          variables: { input: { ...values, id } },
        })
      } else {
        await createYanceyMusic({ variables: { input: values } })
      }

      resetForm()
      handleOpen()
    },
  })

  const onChange = (data: UploaderRes) => {
    setFieldValue('posterUrl', data.url)
  }

  useEffect(() => {
    resetForm()

    if (id) {
      const {
        title,
        soundCloudUrl,
        releaseDate,
        posterUrl,
        // @ts-ignore
      } = client.cache.data.get(`YanceyMusicModel:${id}`)
      setValues({
        title,
        soundCloudUrl,
        releaseDate,
        posterUrl,
      })
    }
  }, [id, resetForm, setValues])

  return (
    <Dialog open={isOpen} onClose={() => handleOpen()}>
      <DialogTitle>{id ? 'Update' : 'Add'} a Yancey Music</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>
            To {id ? 'update' : 'add'} a Yancey Music, please enter the
            following fields here. We will send data after clicking the submit
            button.
          </DialogContentText>
          <TextField
            className={classes.textFieldSpace}
            error={!!errors.title}
            helperText={errors.title}
            autoFocus
            required
            label="Title"
            fullWidth
            {...getFieldProps('title')}
          />

          <TextField
            className={classes.textFieldSpace}
            error={!!errors.soundCloudUrl}
            helperText={errors.soundCloudUrl}
            required
            label="SoundCloud Url"
            fullWidth
            {...getFieldProps('soundCloudUrl')}
          />

          <KeyboardDateTimePicker
            className={classes.textFieldSpace}
            label="Release Date"
            value={values.releaseDate}
            error={!!errors.releaseDate}
            helperText={errors.releaseDate}
            showTodayButton={true}
            ampm={false}
            onChange={(date) => setFieldValue('releaseDate', date, true)}
            format="YYYY/MM/DD HH:mm:ss"
          />

          <div className={classes.uploaderGroup}>
            <FormLabel required>Poster Url</FormLabel>
            <TextField
              error={!!errors.posterUrl}
              helperText={errors.posterUrl}
              style={{ display: 'none' }}
              required
              label="Poster Url"
              fullWidth
              disabled={true}
              {...getFieldProps('posterUrl')}
            />
            <Uploader
              onChange={onChange}
              defaultFile={getFieldProps('posterUrl').value}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={() => handleOpen()}>
            Cancel
          </Button>
          <Button color="primary" type="submit" disabled={isSubmitting}>
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default YanceyMusicModal
