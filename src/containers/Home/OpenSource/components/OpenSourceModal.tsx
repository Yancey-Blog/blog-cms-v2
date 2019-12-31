import React, { FC } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import * as Yup from 'yup'
import {
  Button,
  DialogActions,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
} from '@material-ui/core'
import { Formik, Field, Form } from 'formik'
import { TextField } from 'formik-material-ui'
import styles from '../OpenSource.module.scss'

interface Location {
  showModal?: boolean
  id?: string
}

const OpenSourceModal: FC = () => {
  const { pathname } = useLocation<Location>()

  const history = useHistory()

  const goBack = () => {
    history.push(pathname, { showModal: false })
  }

  return (
    <Dialog open={false} onClose={goBack}>
      <DialogTitle>Add an Open Source</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To Add an Open Source, please enter the following fields here. We will send updates
          occasionally.
        </DialogContentText>
        <Formik
          initialValues={{
            title: '',
            description: '',
            url: '',
            posterUrl: '',
          }}
          validationSchema={Yup.object().shape({
            title: Yup.string().required('Title is required.'),
            description: Yup.string().required('Description is required.'),
            url: Yup.string()
              .url()
              .required('URL is required..'),
            posterUrl: Yup.string()
              .url()
              .required('PostUrl is required.'),
          })}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              setSubmitting(false)
              alert(JSON.stringify(values, null, 2))
            }, 500)
          }}
        >
          {({ submitForm, isSubmitting, values, setFieldValue }) => (
            <Form>
              <Field
                type="text"
                label="Title"
                name="title"
                required
                component={TextField}
                className={styles.field}
              />

              <Field
                type="text"
                label="Description"
                name="description"
                multiline
                required
                component={TextField}
                className={styles.field}
              />

              <Field
                type="text"
                label="Url"
                name="url"
                required
                component={TextField}
                className={styles.field}
              />

              <Field
                type="text"
                label="PosterUrl"
                name="posterUrl"
                required
                component={TextField}
                className={styles.field}
              />
            </Form>
          )}
        </Formik>
      </DialogContent>
      <DialogActions>
        <Button onClick={goBack} color="default">
          Cancel
        </Button>
        <Button color="primary" onClick={() => {}}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default OpenSourceModal
