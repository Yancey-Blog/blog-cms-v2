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
} from '@material-ui/core'
import { useFormik } from 'formik'
import styles from '../announcement.module.scss'
import client from 'src/shared/apolloClient'
import { goBack, parseSearch } from 'src/shared/utils'

interface Props {
  createAnnouncement: Function
  updateAnnouncementById: Function
}

const AnnouncementModal: FC<Props> = ({
  createAnnouncement,
  updateAnnouncementById,
}) => {
  const { search } = useLocation()

  const { showModal, id } = parseSearch(search)

  const initialValues = {
    content: '',
  }

  const validationSchema = Yup.object().shape({
    content: Yup.string().required('Content is required.'),
  })

  const {
    handleSubmit,
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
        await updateAnnouncementById({
          variables: { input: { ...values, id } },
        })
      } else {
        await createAnnouncement({ variables: { input: values } })
      }
      goBack()
      resetForm()
    },
  })

  useEffect(() => {
    if (id) {
      // @ts-ignore
      const { content } = client.cache.data.get(`AnnouncementModel:${id}`)
      setValues({ content })
    }

    return () => {
      resetForm()
    }
  }, [id, resetForm, setValues])

  return (
    <Dialog open={!!showModal} onClose={goBack}>
      <DialogTitle>{id ? 'Update' : 'Add'} an Announcement</DialogTitle>
      <form className={styles.customForm} onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>
            To {id ? 'update' : 'add'} an Announcement, please enter the
            following fields here. We will send data after clicking the submit
            button.
          </DialogContentText>
          <TextField
            error={!!errors.content}
            helperText={errors.content}
            autoFocus
            required
            id="content"
            label="Content"
            fullWidth
            {...getFieldProps('content')}
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

export default AnnouncementModal
