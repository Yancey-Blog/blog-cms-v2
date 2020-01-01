import React, { FC } from 'react'
import { useLocation } from 'react-router-dom'
import { useMutation } from '@apollo/react-hooks'
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
import { CREATE_ONE_OPEN_SOURCE, OPEN_SOURCES } from '../gql'
import { goBack, parseSearch } from '../../../../shared/utils'
import styles from '../OpenSource.module.scss'

const OpenSourceModal: FC = () => {
  const { search } = useLocation()

  const { showModal, id } = parseSearch(search)

  const [createOpenSource] = useMutation(CREATE_ONE_OPEN_SOURCE, {
    update(cache, { data: { createOpenSource } }) {
      // @ts-ignore
      const { getOpenSources } = cache.readQuery({ query: OPEN_SOURCES })
      cache.writeQuery({
        query: OPEN_SOURCES,
        data: {
          getOpenSources: [createOpenSource, ...getOpenSources],
        },
      })
    },
  })

  return (
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
      onSubmit={(values, { setSubmitting, resetForm }) => {
        // setSubmitting(false)
        createOpenSource({ variables: { input: values } })
        goBack(resetForm)
      }}
    >
      {({ submitForm, isSubmitting, values, setFieldValue, resetForm }) => (
        <Dialog open={!!showModal} onClose={() => goBack(resetForm)}>
          <DialogTitle>Add an Open Source</DialogTitle>
          <Form className={styles.customForm}>
            <DialogContent>
              <DialogContentText>
                To Add an Open Source, please enter the following fields here. We will send updates
                occasionally.
              </DialogContentText>

              <Field type="text" label="Title" name="title" required component={TextField} />

              <Field
                type="text"
                label="Description"
                name="description"
                multiline
                required
                component={TextField}
              />

              <Field type="text" label="Url" name="url" required component={TextField} />

              <Field
                type="text"
                label="PosterUrl"
                name="posterUrl"
                required
                component={TextField}
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={() => goBack(resetForm)} color="default">
                Cancel
              </Button>
              <Button color="primary" type="submit" disabled={isSubmitting}>
                Submit
              </Button>
            </DialogActions>
          </Form>
        </Dialog>
      )}
    </Formik>
  )
}

export default OpenSourceModal
