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
  onModalClose: () => void
  handleAnnouncementChange: (e: any) => void
  onModalSubmit: () => void
}

const Poppers: FC<Props> = ({
  title,
  open,
  isAdd,
  announcementValue,
  onModalClose,
  handleAnnouncementChange,
  onModalSubmit,
}) => {
  return (
    <Dialog open={open} onClose={onModalClose}>
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
        <Button onClick={onModalClose} color='primary'>
          Cancel
        </Button>
        <Button onClick={onModalSubmit} color='primary'>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default Poppers
