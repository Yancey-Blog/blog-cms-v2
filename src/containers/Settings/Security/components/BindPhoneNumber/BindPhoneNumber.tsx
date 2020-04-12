import React, { FC, useState, useEffect } from 'react'
import { useMutation } from '@apollo/react-hooks'
import { useSnackbar } from 'notistack'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@material-ui/core'
import Transition from 'src/components/Transition/Transition'
import { SEND_SMS, VALIDATE_SMS } from '../../typeDefs'
import useStyles from './styles'

interface Props {
  setOpen: Function
  open: boolean
}

const BindPhoneNumber: FC<Props> = ({ setOpen, open }) => {
  const classes = useStyles()
  const { enqueueSnackbar } = useSnackbar()
  const [count, setCount] = useState(10)
  const [isClick, setIsClick] = useState(false)

  const [sendSMS] = useMutation(SEND_SMS)
  const [validateSMS, { loading }] = useMutation(VALIDATE_SMS, {
    onCompleted() {
      enqueueSnackbar('Your phone number is available now!', {
        variant: 'success',
      })
      onClose()
    },
  })

  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string()
      .matches(/^1\d{10}$/, 'Please enter a valid phone number.')
      .required('Please enter a valid phone number.'),
    smsCode: Yup.string()
      .matches(/^\d{6}$/, 'Please enter a valid sms code.')
      .required('Please enter a valid sms code.'),
  })

  const initialValues = {
    phoneNumber: '',
    smsCode: '',
  }

  const {
    resetForm,
    handleSubmit,
    getFieldProps,
    isSubmitting,
    errors,
    values,
  } = useFormik({
    initialValues,
    validationSchema,
    validateOnChange: true,
    onSubmit: async (values) => {
      await validateSMS({
        variables: {
          input: {
            phoneNumber: values.phoneNumber,
            verificationCode: values.smsCode,
          },
        },
      })
    },
  })

  const getSMSCode = async () => {
    setIsClick(true)

    await sendSMS({
      variables: {
        input: {
          phoneNumber: values.phoneNumber,
        },
      },
    })
  }

  const onClose = () => {
    setOpen(false)
    resetForm()
  }

  useEffect(() => {
    if (isClick) {
      let timer = setTimeout(() => {
        if (count === 1) {
          setIsClick(false)
          setCount(10)
          clearTimeout(timer)
        } else {
          setCount((c: number) => c - 1)
        }
      }, 1000)
    }
  }, [count, isClick, resetForm])

  return (
    <Dialog
      open={open}
      onClose={onClose}
      // @ts-ignore
      TransitionComponent={Transition}
      keepMounted
    >
      <DialogTitle>Add Phone Number</DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          <div className={classes.textBtnGroup}>
            <TextField
              error={!!errors.phoneNumber}
              helperText={errors.phoneNumber}
              autoFocus
              required
              label="Phone Number"
              fullWidth
              {...getFieldProps('phoneNumber')}
            />
            <Button
              className={classes.getCodeBtn}
              color="primary"
              onClick={getSMSCode}
              disabled={
                isClick || !!errors.phoneNumber || values.phoneNumber === ''
              }
            >
              {!isClick ? 'get SMS code' : `get SMS code after ${count}s again`}
            </Button>
          </div>

          <TextField
            error={!!errors.smsCode}
            helperText={errors.smsCode}
            required
            label="SMS Code"
            fullWidth
            {...getFieldProps('smsCode')}
          />
        </DialogContent>
        <DialogActions>
          <Button color="primary" type="reset" onClick={onClose}>
            Close
          </Button>
          <Button
            color="primary"
            type="submit"
            disabled={isSubmitting || loading}
          >
            Submit
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}

export default BindPhoneNumber
