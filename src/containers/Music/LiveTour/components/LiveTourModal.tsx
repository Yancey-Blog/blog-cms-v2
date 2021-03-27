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
import { KeyboardDateTimePicker } from '@material-ui/pickers'
import useStyles from 'src/shared/globalStyles'
import client from 'src/graphql/apolloClient'
import Uploader from 'src/components/Uploader/Uploader'
import { UploaderRes } from 'src/components/Uploader/types'
import { Open } from 'src/hooks/useOpenModal'

interface Props {
  open: Open
  handleOpen: Function
  createLiveTour: Function
  updateLiveTourById: Function
}

const LiveTourModal: FC<Props> = ({
  open,
  handleOpen,
  createLiveTour,
  updateLiveTourById,
}) => {
  const { isOpen, id } = open

  const classes = useStyles()

  const initialValues = {
    title: '',
    showTime: new Date(),
    posterUrl: '',
  }

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required.'),
    showTime: Yup.string().required('Show Time is required.'),
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
    values,
  } = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values) => {
      if (id) {
        await updateLiveTourById({
          variables: { input: { ...values, id } },
        })
      } else {
        await createLiveTour({ variables: { input: values } })
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
      const { title, showTime, posterUrl } = client.cache.data.data[
        `LiveTourModel:${id}`
      ]

      setValues({
        title,
        showTime,
        posterUrl,
      })
    }
  }, [id, resetForm, setValues])

  return (
    <Dialog open={isOpen} onClose={() => handleOpen()}>
      <DialogTitle>{id ? 'Update' : 'Add'} a Live Tour</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <DialogContentText>
            To {id ? 'update' : 'add'} a Live Tour, please enter the following
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

          <KeyboardDateTimePicker
            className={classes.textFieldSpace}
            label="Show Time"
            required
            value={values.showTime}
            error={!!errors.showTime}
            helperText={errors.showTime}
            showTodayButton={true}
            ampm={false}
            onChange={(date) => setFieldValue('showTime', date, true)}
            format="yyyy/LL/dd HH:mm:ss"
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

export default LiveTourModal
