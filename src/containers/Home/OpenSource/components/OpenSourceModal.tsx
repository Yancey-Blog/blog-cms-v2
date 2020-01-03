import React, { FC, useState, useEffect } from 'react'
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
import client from '../../../../shared/ApolloClient'
import { CREATE_ONE_OPEN_SOURCE, UPDATE_ONE_OPEN_SOURCE, OPEN_SOURCES } from '../typeDefs'
import { goBack, parseSearch } from '../../../../shared/utils'
import styles from '../openSource.module.scss'

const OpenSourceModal: FC = () => {
  const { search } = useLocation()

  const { showModal, id } = parseSearch(search)

  const [initialValues, setInitialValues] = useState({
    title: '',
    description: '',
    url: '',
    posterUrl: '',
  })

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

  const [updateOpenSourceById] = useMutation(UPDATE_ONE_OPEN_SOURCE)

  useEffect(() => {
    if (id) {
      // @ts-ignore
      const { title, description, url, posterUrl } = client.cache.data.get(`OpenSourceModel:${id}`)
      setInitialValues({ title, description, url, posterUrl })
    } else {
      setInitialValues({ title: '', description: '', url: '', posterUrl: '' })
    }
    // eslint-disable-next-line
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
      onSubmit={async (values, { resetForm }) => {
        if (id) {
          await updateOpenSourceById({ variables: { input: { ...values, id } } })
        } else {
          await createOpenSource({ variables: { input: values } })
        }
        goBack()
      }}
    >
      {({ isSubmitting, handleReset }) => {
        return (
          <Dialog open={!!showModal} onClose={goBack}>
            <DialogTitle>{id ? 'Update' : 'Add'} an Open Source</DialogTitle>
            <Form className={styles.customForm} onReset={handleReset}>
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
