import React, { FC, useEffect } from 'react'
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
  Switch,
} from '@material-ui/core'
import { useFormik } from 'formik'
import client from 'src/shared/apolloClient'
import Uploader from 'src/components/Uploader/Uploader'
import { UploaderRes } from 'src/components/Uploader/types'
import useStyles from 'src/shared/globalStyles'
import { Open } from 'src/hooks/useOpenModal'

interface Props {
  open: Open
  handleOpen: Function
  createCover: Function
  updateCoverById: Function
}

const CoverModal: FC<Props> = ({
  open,
  handleOpen,
  createCover,
  updateCoverById,
}) => {
  const classes = useStyles()

  const { isOpen, id } = open

  const initialValues = {
    title: '',
    coverUrl: '',
    isPublic: true,
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required.'),
    coverUrl: Yup.string().required('Cover Url is required.'),
    isPublic: Yup.boolean().required('Is Public is required.'),
  })

  const {
    handleSubmit,
    getFieldProps,
    setValues,
    resetForm,
    isSubmitting,
    errors,
    setFieldValue,
    values,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      if (id) {
        await updateCoverById({
          variables: { input: { ...values, id } },
        })
      } else {
        await createCover({ variables: { input: values } })
      }

      resetForm()
      handleOpen()
    },
  })

  const onCoverUrlChange = (data: UploaderRes) => {
    setFieldValue('coverUrl', data.url)
  }

  useEffect(() => {
    resetForm()

    if (id) {
      // @ts-ignore
      const { title, coverUrl, isPublic } = client.cache.data.get(
        `CoverModel:${id}`,
      )
      setValues({ title, coverUrl, isPublic })
    }
  }, [id, resetForm, setValues])

  return (
    <Dialog open={isOpen} onClose={() => handleOpen()}>
      <DialogTitle>{id ? 'Update' : 'Add'} a Cover</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>
            To {id ? 'update' : 'add'} a Cover, please enter the following
            fields here. We will send data after clicking the submit button.
          </DialogContentText>

          <TextField
            className={classes.textFieldSpace}
            error={!!errors.title}
            helperText={errors.title}
            autoFocus
            required
            label="Title"
            fullWidth
            {...getFieldProps('title')}
          />

          <div className={classes.uploaderGroup}>
            <FormLabel required>Cover Url</FormLabel>
            <TextField
              error={!!errors.coverUrl}
              helperText={errors.coverUrl}
              style={{ display: 'none' }}
              required
              label="Cover Url"
              fullWidth
              disabled={true}
              {...getFieldProps('coverUrl')}
            />
            <Uploader
              onChange={onCoverUrlChange}
              defaultFile={getFieldProps('coverUrl').value}
            />
          </div>

          <div className={classes.uploaderGroup}>
            <FormLabel required>Is Public</FormLabel>
            <Switch
              color="primary"
              defaultChecked={values.isPublic || true}
              onChange={(e) =>
                setFieldValue('isPublic', e.target.checked, true)
              }
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

export default CoverModal
