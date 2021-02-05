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
} from '@material-ui/core'
import { useFormik } from 'formik'
import client from 'src/graphql/apolloClient'
import { Open } from 'src/hooks/useOpenModal'

interface Props {
  open: Open
  handleOpen: Function
  createMotto: Function
  updateMottoById: Function
}

const MottoModal: FC<Props> = ({
  open,
  handleOpen,
  createMotto,
  updateMottoById,
}) => {
  const { isOpen, id } = open

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
      resetForm()
      handleOpen()
    },
  })

  useEffect(() => {
    resetForm()

    if (id) {
      // @ts-ignore
      const { content } = client.cache.data.data[`MottoModel:${id}`]

      setValues({ content })
    }
  }, [id, resetForm, setValues])

  return (
    <Dialog open={isOpen} onClose={() => handleOpen()}>
      <DialogTitle>{id ? 'Update' : 'Add'} a Motto</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>
            To {id ? 'update' : 'add'} a Motto, please enter the following
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

export default MottoModal
