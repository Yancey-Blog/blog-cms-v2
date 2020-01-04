import React, { FC, useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
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
import client from '../../../../shared/ApolloClient'
import { goBack, parseSearch } from '../../../../shared/utils'
import styles from '../openSource.module.scss'

interface Props {
  createOpenSource: Function
  updateOpenSourceById: Function
}

const OpenSourceModal: FC<Props> = ({ createOpenSource, updateOpenSourceById }) => {
  const { search } = useLocation()

  const { showModal, id } = parseSearch(search)

  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
    url: '',
    posterUrl: '',
  })

  useEffect(() => {
    if (id) {
      // @ts-ignore
      const { title, description, url, posterUrl } = client.cache.data.get(`OpenSourceModel:${id}`)
      setInitialValues({ title, description, url, posterUrl })
    }
  }, [id])

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize={true}
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
      onSubmit={async values => {
        if (id) {
          await updateOpenSourceById({ variables: { input: { ...values, id } } })
        } else {
          await createOpenSource({ variables: { input: values } })
        }
        goBack()
      }}
    >
      {({ isSubmitting }) => {
        return (
          <Dialog open={!!showModal} onClose={goBack}>
            <DialogTitle>{id ? 'Update' : 'Add'} an Open Source</DialogTitle>
            <Form className={styles.customForm}>
              <DialogContent>
                <DialogContentText>
                  To {id ? 'Update' : 'Add'} an Open Source, please enter the following fields here.
                  We will send data after clicking Submit button.
                </DialogContentText>

                <Field
                  autoFocus
                  type="text"
                  label="Title"
                  name="title"
                  required
                  component={TextField}
                  fullWidth
                />

                <Field
                  type="text"
                  label="Description"
                  name="description"
                  multiline
                  required
                  component={TextField}
                  fullWidth
                />

                <Field
                  type="text"
                  label="Url"
                  name="url"
                  required
                  component={TextField}
                  fullWidth
                />

                <Field
                  type="text"
                  label="PosterUrl"
                  name="posterUrl"
                  required
                  component={TextField}
                  fullWidth
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
            </Form>
          </Dialog>
        )
      }}
    </Formik>
  )
}

export default OpenSourceModal
