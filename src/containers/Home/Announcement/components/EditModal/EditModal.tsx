import React, { FC } from 'react'
import {
  Button,
  DialogActions,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  TextField,
} from '@material-ui/core'

interface Props {
  title: string
  open: boolean
  isAdd: boolean
  announcementValue: string
  handleAnnouncementChange: (e: any) => void
  onClose: () => void
  onSubmit: () => void
}

const EditModal: FC<Props> = ({
  title,
  open,
  isAdd,
  announcementValue,
  handleAnnouncementChange,
  onClose,
  onSubmit,
}) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {!isAdd ? 'Add' : 'Update'} {title}
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          margin='dense'
          label='Announcement'
          type='text'
          fullWidth
          value={announcementValue}
          onChange={(e: any) => handleAnnouncementChange(e)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={onSubmit} color='primary'>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditModal
