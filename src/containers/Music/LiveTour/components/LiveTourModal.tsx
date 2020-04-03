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
import styles from '../liveTour.module.scss'
import client from 'src/shared/apolloClient'
import { goBack, parseSearch } from 'src/shared/utils'
import Uploader from 'src/components/Uploader/Uploader'
import { UploaderRes } from 'src/components/Uploader/types'

interface Props {
  createLiveTour: Function
  updateLiveTourById: Function
}

const LiveTourModal: FC<Props> = ({ createLiveTour, updateLiveTourById }) => {
  const { search } = useLocation()

  const { showModal, id } = parseSearch(search)

  const initialValues = {
    title: '',
    showTime: new Date(),
    posterUrl: '',
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required.'),
    showTime: Yup.string().required('ShowTime is required.'),
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
    values,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      if (id) {
        await updateLiveTourById({
          variables: { input: { ...values, id } },
        })
      } else {
        await createLiveTour({ variables: { input: values } })
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
      const { title, showTime, posterUrl } = client.cache.data.get(
        `LiveTourModel:${id}`,
      )
      setValues({
        title,
        showTime,
        posterUrl,
      })
    }

    return () => {
      resetForm()
    }
  }, [id, resetForm, setValues])

  return (
    <Dialog open={!!showModal} onClose={goBack}>
      <DialogTitle>{id ? 'Update' : 'Add'} an Live Tour</DialogTitle>
      <form className={styles.customForm} onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>
            To {id ? 'update' : 'add'} an Live Tour, please enter the following
            fields here. We will send data after clicking the submit button.
          </DialogContentText>
          <TextField
            error={!!errors.title}
            helperText={errors.title}
            autoFocus
            required
            label="Title"
            fullWidth
            {...getFieldProps('title')}
          />

          <KeyboardDateTimePicker
            label="ShowTime"
            required
            value={values.showTime}
            error={!!errors.showTime}
            helperText={errors.showTime}
            showTodayButton={true}
            ampm={false}
            onChange={(date) => setFieldValue('showTime', date, true)}
            format="YYYY/MM/DD HH:mm:ss"
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

export default LiveTourModal
