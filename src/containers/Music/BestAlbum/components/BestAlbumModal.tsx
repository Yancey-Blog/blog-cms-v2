import { FC, useEffect } from 'react'
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
import useStyles from 'src/shared/globalStyles'
import client from 'src/graphql/apolloClient'
import { Open } from 'src/hooks/useOpenModal'
import Uploader from 'src/components/Uploader/Uploader'
import { UploaderRes } from 'src/components/Uploader/types'

interface Props {
  open: Open
  handleOpen: Function
  createBestAlbum: Function
  updateBestAlbumById: Function
}

const BestAlbumModal: FC<Props> = ({
  open,
  handleOpen,
  createBestAlbum,
  updateBestAlbumById,
}) => {
  const { isOpen, id } = open

  const classes = useStyles()

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
    mvUrl: Yup.string().url().required('Mv Url is required.'),
    releaseDate: Yup.string().required('Release Date is required.'),
    coverUrl: Yup.string().url().required('Post Url is required.'),
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

      resetForm()
      handleOpen()
    },
  })

  const onChange = (data: UploaderRes) => {
    setFieldValue('coverUrl', data.url)
  }

  useEffect(() => {
    resetForm()

    if (id) {
      const {
        title,
        artist,
        mvUrl,
        releaseDate,
        coverUrl,
        // @ts-ignore
      } = client.cache.data.data[`BestAlbumModel:${id}`]

      setValues({
        title,
        artist,
        mvUrl,
        releaseDate,
        coverUrl,
      })
    }
  }, [id, resetForm, setValues])

  return (
    <Dialog open={isOpen} onClose={() => handleOpen()}>
      <DialogTitle>{id ? 'Update' : 'Add'} a Best Album</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>
            To {id ? 'update' : 'add'} a Best Album, please enter the following
            fields here. We will send data after clicking the submit button.
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
            error={!!errors.artist}
            helperText={errors.artist}
            required
            label="Artist"
            fullWidth
            {...getFieldProps('artist')}
          />

          <TextField
            className={classes.textFieldSpace}
            error={!!errors.mvUrl}
            helperText={errors.mvUrl}
            required
            label="Mv Url"
            fullWidth
            {...getFieldProps('mvUrl')}
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
            format="yyyy/LL/dd HH:mm:ss"
          />

          <div className={classes.uploaderGroup}>
            <FormLabel required>Cover Url</FormLabel>
            <TextField
              error={!!errors.coverUrl}
              helperText={errors.coverUrl}
              style={{ display: 'none' }}
              required
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

export default BestAlbumModal
