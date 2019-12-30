import React, { FC } from 'react'
import {
  Button,
  DialogActions,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
} from '@material-ui/core'
import { Formik, Field, Form } from 'formik'
import { TextField } from 'formik-material-ui'

const OpenSourceModal: FC<any> = () => {
  return (
    <Dialog open onClose={() => {}}>
      <DialogTitle>Add an Open Source</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To Add an Open Source, please enter the following fields here. We will send updates
          occasionally.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => {}} color="default">
          Cancel
        </Button>
        <Button color="primary" onClick={() => {}}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default OpenSourceModal
