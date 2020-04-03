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
import styles from '../openSource.module.scss'
import client from 'src/shared/apolloClient'
import { goBack, parseSearch } from 'src/shared/utils'
import Uploader from 'src/components/Uploader/Uploader'
import { UploaderRes } from 'src/components/Uploader/types'

interface Props {
  createOpenSource: Function
  updateOpenSourceById: Function
}

const OpenSourceModal: FC<Props> = ({
  createOpenSource,
  updateOpenSourceById,
}) => {
  const { search } = useLocation()

  const { showModal, id } = parseSearch(search)

  const initialValues = {
    title: '',
    description: '',
    url: '',
    posterUrl: '',
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required.'),
    description: Yup.string().required('Description is required.'),
    url: Yup.string().url().required('URL is required.'),
    posterUrl: Yup.string().url().required('PostUrl is required.'),
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
    onSubmit: async (values) => {
      if (id) {
        await updateOpenSourceById({
          variables: { input: { ...values, id } },
        })
      } else {
        await createOpenSource({ variables: { input: values } })
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
      // @ts-ignore
      const { title, description, url, posterUrl } = client.cache.data.get(
        `OpenSourceModel:${id}`,
      )
      setValues({ title, description, url, posterUrl })
    }

    return () => {
      resetForm()
    }
  }, [id, resetForm, setValues])

  return (
    <Dialog open={!!showModal} onClose={goBack}>
      <DialogTitle>{id ? 'Update' : 'Add'} an Open Source</DialogTitle>
      <form className={styles.customForm} onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>
            To {id ? 'update' : 'add'} an Open Source, please enter the
            following fields here. We will send data after clicking the submit
            button.
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
            error={!!errors.description}
            helperText={errors.description}
            required
            label="Description"
            fullWidth
            {...getFieldProps('description')}
          />
          <TextField
            error={!!errors.url}
            helperText={errors.url}
            required
            label="Url"
            fullWidth
            {...getFieldProps('url')}
          />
          <div className={styles.uploaderGroup}>
            <FormLabel required>PosterUrl</FormLabel>
            <TextField
              error={!!errors.posterUrl}
              helperText={errors.posterUrl}
              style={{ display: 'none' }}
              required
              label="PosterUrl"
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

export default OpenSourceModal
