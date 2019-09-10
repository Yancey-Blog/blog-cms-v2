import React, { FC } from 'react'
import {
  Button,
  DialogActions,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
} from '@material-ui/core'

interface Props {
  open: boolean
  onClose: () => void
  onSubmit: () => void
}

const ConfirmModal: FC<Props> = ({ open, onClose, onSubmit }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Are you sure delete those items?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={onSubmit} color='primary'>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmModal
