import React, { FC } from 'react'
import {
  Button,
  DialogActions,
  DialogTitle,
  Popper,
  Fade,
  Paper,
} from '@material-ui/core'

interface Props {
  title: string
  anchorEl: any
  onClose: () => void
  onSubmit: () => void
}

const Poppers: FC<Props> = ({ title, anchorEl, onClose, onSubmit }) => {
  return (
    <Popper open={!!anchorEl} anchorEl={anchorEl} transition>
      {({ TransitionProps }) => (
        <Fade {...TransitionProps} timeout={350}>
          <Paper>
            <DialogTitle id='form-dialog-title'>
              Delete the {title}(s)?
            </DialogTitle>
            <DialogActions>
              <Button onClick={onClose} color='primary'>
                Cancel
              </Button>
              <Button onClick={onSubmit} color='primary'>
                OK
              </Button>
            </DialogActions>
          </Paper>
        </Fade>
      )}
    </Popper>
  )
}

export default Poppers
