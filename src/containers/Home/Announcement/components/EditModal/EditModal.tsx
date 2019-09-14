import React, { FC, useState } from 'react'
import { connect } from 'react-redux'
import { goBack } from 'connected-react-router'
import { RootState } from 'typesafe-actions'
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
import {
  addAnnouncement,
  updateAnnouncement,
} from 'stores/announcement/actions'

const mapStateToProps = (state: RootState) => {
  const {
    announcements: { announcements },
    router: {
      location: { pathname },
    },
  } = state

  return {
    byId: announcements.byId,
    pathname,
  }
}

const mapDispatchToProps = {
  addAnnouncement: addAnnouncement.request,
  updateAnnouncement: updateAnnouncement.request,
  goBack,
}

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps

const EditModal: FC<Props> = ({
  byId,
  goBack,
  addAnnouncement,
  updateAnnouncement,
}) => {
  const { match } = useReactRouter<{ id: string }>()

  const [curId] = useState(match.params.id)

  const [announcementValue, setAnnouncementValue] = useState(
    curId ? byId[curId].announcement : '',
  )
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
      <DialogTitle>{curId ? 'Update' : 'Add'} an Announcement</DialogTitle>
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
        <Button onClick={goBack} color='primary'>
          Cancel
        </Button>
        <Button color='primary' onClick={() => onSubmit(announcementValue)}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(EditModal)
