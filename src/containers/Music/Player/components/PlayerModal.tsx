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
import styles from '../player.module.scss'
import client from 'src/shared/apolloClient'
import { goBack, parseSearch } from 'src/shared/utils'
import Uploader from 'src/components/Uploader/Uploader'
import { UploaderRes } from 'src/components/Uploader/types'

interface Props {
  createPlayer: Function
  updatePlayerById: Function
}

const PlayerModal: FC<Props> = ({ createPlayer, updatePlayerById }) => {
  const { search } = useLocation()

  const { showModal, id } = parseSearch(search)

  const initialValues = {
    title: '',
    artist: '',
    lrc: '',
    coverUrl: '',
    musicFileUrl: '',
    isPublic: true,
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required.'),
    artist: Yup.string().required('Artist is required.'),
    lrc: Yup.string().required('LRC is required.'),
    coverUrl: Yup.string().required('CoverUrl is required.'),
    musicFileUrl: Yup.string().required('MusicFileUrl is required.'),
    isPublic: Yup.string().required('IsPublic is required.'),
  })

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
    validationSchema,
    onSubmit: async values => {
      if (id) {
        await updatePlayerById({
          variables: { input: { ...values, id } },
        })
      } else {
        await createPlayer({ variables: { input: values } })
      }
      goBack()
      resetForm()
    },
  })

  const onChange = (data: UploaderRes) => {
    setFieldValue('posterUrl', data.url)
  }

  useEffect(() => {
    if (id) {
      const {
        title,
        artist,
        lrc,
        coverUrl,
        musicFileUrl,
        isPublic,
        // @ts-ignore
      } = client.cache.data.get(`PlayerModel:${id}`)
      setValues({
        title,
        artist,
        lrc,
        coverUrl,
        musicFileUrl,
        isPublic,
      })
    }

    return () => {
      resetForm()
    }
  }, [id, resetForm, setValues])

  return (
    <Dialog open={!!showModal} onClose={goBack}>
      <DialogTitle>{id ? 'Update' : 'Add'} an Player</DialogTitle>
      <form className={styles.customForm} onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>
            To {id ? 'update' : 'add'} an Player, please enter the following
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
            error={!!errors.lrc}
            helperText={errors.lrc}
            required
            id="lrc"
            label="LRC"
            fullWidth
            {...getFieldProps('lrc')}
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
          <div className={styles.uploaderGroup}>
            <FormLabel required>MusicFileUrl</FormLabel>
            <TextField
              error={!!errors.musicFileUrl}
              helperText={errors.musicFileUrl}
              style={{ display: 'none' }}
              required
              id="musicFileUrl"
              label="MusicFileUrl"
              fullWidth
              disabled={true}
              {...getFieldProps('musicFileUrl')}
            />
            <Uploader
              onChange={onChange}
              defaultFile={getFieldProps('musicFileUrl').value}
            />
          </div>

          <TextField
            error={!!errors.isPublic}
            helperText={errors.isPublic}
            required
            id="isPublic"
            label="IsPublic"
            fullWidth
            {...getFieldProps('isPublic')}
          />
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

export default PlayerModal
