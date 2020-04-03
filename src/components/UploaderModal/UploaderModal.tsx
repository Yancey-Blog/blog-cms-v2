import React, { FC } from 'react'
import {
  DialogActions,
  DialogTitle,
  Dialog,
  DialogContent,
  Button,
} from '@material-ui/core'
import Uploader from '../Uploader/Uploader'

interface Props {
  open: boolean
  handleClose: () => void
  handleChange: Function
  isUploading: boolean
}

const UploaderModal: FC<Props> = ({
  open,
  handleClose,
  handleChange,
  isUploading,
}) => {
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Upload image</DialogTitle>
      <DialogContent>
        <Uploader onChange={handleChange} />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={handleClose}>
          Cancel
        </Button>
        <Button color="primary" disabled={isUploading}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UploaderModal
