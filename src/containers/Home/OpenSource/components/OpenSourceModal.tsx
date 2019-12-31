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

interface Params {
  title: string
  description: string
  url: string
  posterUrl: string
}

const OpenSourceModal: FC = () => {
  const {
    pathname,
    state: { showModal },
  } = useLocation()

  const history = useHistory()

  const goBack = () => {
    history.push(pathname, { showModal: false })
  }

  return (
    <Dialog open={showModal} onClose={goBack}>
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
            title: Yup.string().required('Required'),
            description: Yup.string().required('Required'),
            url: Yup.string()
              .url()
              .required('Required'),
            posterUrl: Yup.string()
              .url()
              .required('Required'),
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
              <br />
              <Field
                type="text"
                label="Description"
                name="description"
                multiline
                required
                component={TextField}
                className={styles.field}
              />
              <br />
              <Field
                type="text"
                label="Url"
                name="url"
                required
                component={TextField}
                className={styles.field}
              />
              <br />
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
