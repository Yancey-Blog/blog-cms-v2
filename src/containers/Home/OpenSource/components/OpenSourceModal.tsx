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
  FormLabel,
} from '@material-ui/core'
import { useFormik } from 'formik'
import client from 'src/graphql/apolloClient'
import Uploader from 'src/components/Uploader/Uploader'
import { UploaderRes } from 'src/components/Uploader/types'
import useStyles from 'src/shared/globalStyles'
import { Open } from 'src/hooks/useOpenModal'

interface Props {
  open: Open
  handleOpen: Function
  createOpenSource: Function
  updateOpenSourceById: Function
}

const OpenSourceModal: FC<Props> = ({
  open,
  handleOpen,
  createOpenSource,
  updateOpenSourceById,
}) => {
  const { isOpen, id } = open

  const classes = useStyles()

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
    posterUrl: Yup.string().url().required('Post Url is required.'),
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
      resetForm()
      handleOpen()
    },
  })

  const onChange = (data: UploaderRes) => {
    setFieldValue('posterUrl', data.url)
  }

  useEffect(() => {
    resetForm()

    if (id) {
      // @ts-ignore
      const { title, description, url, posterUrl } = client.cache.data.data[
        `OpenSourceModel:${id}`
      ]

      setValues({ title, description, url, posterUrl })
    }
  }, [id, resetForm, setValues])

  return (
    <Dialog open={isOpen} onClose={() => handleOpen()}>
      <DialogTitle>{id ? 'Update' : 'Add'} an Open Source</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>
            To {id ? 'update' : 'add'} an Open Source, please enter the
            following fields here. We will send data after clicking the submit
            button.
          </DialogContentText>
          <TextField
            className={classes.textFieldSpace}
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
            className={classes.textFieldSpace}
            error={!!errors.description}
            helperText={errors.description}
            required
            label="Description"
            fullWidth
            {...getFieldProps('description')}
          />
          <TextField
            className={classes.textFieldSpace}
            error={!!errors.url}
            helperText={errors.url}
            required
            label="Url"
            fullWidth
            {...getFieldProps('url')}
          />
          <div className={classes.uploaderGroup}>
            <FormLabel required>Poster Url</FormLabel>
            <TextField
              error={!!errors.posterUrl}
              helperText={errors.posterUrl}
              style={{ display: 'none' }}
              required
              label="Poster Url"
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

export default OpenSourceModal
