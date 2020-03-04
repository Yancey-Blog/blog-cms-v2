import React, { FC, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
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
import styles from '../bestAlbum.module.scss'
import client from 'src/shared/apolloClient'
import { goBack, parseSearch } from 'src/shared/utils'
import Uploader from 'src/components/Uploader/Uploader'
import { UploaderRes } from 'src/components/Uploader/types'

interface Props {
  createBestAlbum: Function
  updateBestAlbumById: Function
}

const BestAlbumModal: FC<Props> = ({
  createBestAlbum,
  updateBestAlbumById,
}) => {
  const { search } = useLocation()

  const { showModal, id } = parseSearch(search)

  const initialValues = {
    title: '',
    artist: '',
    mvUrl: '',
    releaseDate: new Date(),
    coverUrl: '',
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required.'),
    artist: Yup.string().required('Artist is required.'),
    mvUrl: Yup.string()
      .url()
      .required('MvUrl is required.'),
    releaseDate: Yup.string().required('ReleaseDate is required.'),
    coverUrl: Yup.string()
      .url()
      .required('PostUrl is required.'),
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
    onSubmit: async values => {
      if (id) {
        await updateBestAlbumById({
          variables: { input: { ...values, id } },
        })
      } else {
        await createBestAlbum({
          variables: {
            input: { ...values },
          },
        })
      }
      goBack()
      resetForm()
    },
  })

  const onChange = (data: UploaderRes) => {
    setFieldValue('coverUrl', data.url)
  }

  useEffect(() => {
    if (id) {
      const {
        title,
        artist,
        mvUrl,
        releaseDate,
        coverUrl,
        // @ts-ignore
      } = client.cache.data.get(`BestAlbumModel:${id}`)
      setValues({
        title,
        artist,
        mvUrl,
        releaseDate,
        coverUrl,
      })
    }

    return () => {
      resetForm()
    }
  }, [id, resetForm, setValues])

  return (
    <Dialog open={!!showModal} onClose={goBack}>
      <DialogTitle>{id ? 'Update' : 'Add'} an Best Album</DialogTitle>
      <form className={styles.customForm} onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>
            To {id ? 'update' : 'add'} an Best Album, please enter the following
            fields here. We will send data after clicking the submit button.
          </DialogContentText>
          <TextField
            error={!!errors.title}
            helperText={errors.title}
            autoFocus
            required
            id="title"
            label="Title"
            fullWidth
            {...getFieldProps('title')}
          />

          <TextField
            error={!!errors.artist}
            helperText={errors.artist}
            required
            id="artist"
            label="Artist"
            fullWidth
            {...getFieldProps('artist')}
          />

          <TextField
            error={!!errors.mvUrl}
            helperText={errors.mvUrl}
            required
            id="mvUrl"
            label="MvUrl"
            fullWidth
            {...getFieldProps('mvUrl')}
          />

          <KeyboardDateTimePicker
            label="ReleaseDate"
            value={values.releaseDate}
            error={!!errors.releaseDate}
            helperText={errors.releaseDate}
            showTodayButton={true}
            ampm={false}
            onChange={date => setFieldValue('releaseDate', date, true)}
            format="YYYY/MM/DD HH:mm:ss"
          />

          <div className={styles.uploaderGroup}>
            <FormLabel required>CoverUrl</FormLabel>
            <TextField
              error={!!errors.coverUrl}
              helperText={errors.coverUrl}
              style={{ display: 'none' }}
              required
              id="coverUrl"
              label="CoverUrl"
              fullWidth
              disabled={true}
              {...getFieldProps('coverUrl')}
            />
            <Uploader
              onChange={onChange}
              defaultFile={getFieldProps('coverUrl').value}
            />
          </div>
        </DialogContent>
        <DialogActions>
          <Button color="primary" onClick={goBack}>
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

export default BestAlbumModal
