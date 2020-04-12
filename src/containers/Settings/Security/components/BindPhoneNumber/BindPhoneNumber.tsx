import React, { FC } from 'react'
import { useMutation } from '@apollo/react-hooks'
import {
  Dialog,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@material-ui/core'
import Transition from 'src/components/Transition/Transition'
import { CREATE_RECOVERY_CODES } from '../../typeDefs'

interface Props {
  setOpen: Function
  open: boolean
}

const BindPhoneNumber: FC<Props> = ({ setOpen, open }) => {
  const onClose = () => {
    setOpen(false)
  }

  const [createRecoveryCodes, { loading }] = useMutation(CREATE_RECOVERY_CODES)

  return (
    <Dialog
      open={open}
      onClose={onClose}
      // @ts-ignore
      TransitionComponent={Transition}
      keepMounted
    >
      <DialogTitle>Save your backup codes</DialogTitle>
      <DialogContent>content</DialogContent>
      <DialogActions>
        <Button size="small" color="primary" onClick={onClose}>
          Close
        </Button>
        <Button size="small" color="primary" disabled={loading}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default BindPhoneNumber
