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
import client from 'src/shared/apolloClient'
import { goBack, parseSearch } from 'src/shared/utils'

interface Props {
  createMotto: Function
  updateMottoById: Function
}

const MottoModal: FC<Props> = ({ createMotto, updateMottoById }) => {
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
    onSubmit: async (values) => {
      if (id) {
        await updateMottoById({
          variables: { input: { ...values, id } },
        })
      } else {
        await createMotto({ variables: { input: values } })
      }
      goBack()
      resetForm()
    },
  })

  useEffect(() => {
    if (id) {
      // @ts-ignore
      const { content } = client.cache.data.get(`MottoModel:${id}`)
      setValues({ content })
    }

    return () => {
      resetForm()
    }
  }, [id, resetForm, setValues])

  return (
    <Dialog open={!!showModal} onClose={goBack}>
      <DialogTitle>{id ? 'Update' : 'Add'} an Motto</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>
            To {id ? 'update' : 'add'} an Motto, please enter the following
            fields here. We will send data after clicking the submit button.
          </DialogContentText>
          <TextField
            error={!!errors.content}
            helperText={errors.content}
            autoFocus
            required
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

export default MottoModal
