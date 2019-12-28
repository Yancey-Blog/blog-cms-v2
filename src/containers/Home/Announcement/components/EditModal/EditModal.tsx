import React, { FC, useState } from 'react'
import useReactRouter from 'use-react-router'
import {
  Button,
  DialogActions,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
  TextField,
} from '@material-ui/core'

const EditModal: FC<any> = ({ byId, goBack, addAnnouncement, updateAnnouncement }) => {
  const { match } = useReactRouter<{ id: string }>()

  const [curId] = useState(match.params.id)

  const [announcementValue, setAnnouncementValue] = useState(curId ? byId[curId].announcement : '')
  const handleAnnouncementChange = (e: any) => {
    setAnnouncementValue(e.target.value)
  }

  const onSubmit = (announcement: string) => {
    if (curId) {
      updateAnnouncement({ id: curId, announcement })
    } else {
      addAnnouncement({ announcement })
    }
  }

  return (
    <Dialog open onClose={goBack}>
      <DialogTitle>{curId ? 'Update an Announcement' : 'Add an Announcement'}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To {curId ? 'Update' : 'Add'} an announcement, please enter the announcement here. We will
          send updates occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          label="Announcement"
          type="text"
          fullWidth
          value={announcementValue}
          onChange={(e: any) => handleAnnouncementChange(e)}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={goBack} color="primary">
          Cancel
        </Button>
        <Button color="primary" onClick={() => onSubmit(announcementValue)}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default EditModal
