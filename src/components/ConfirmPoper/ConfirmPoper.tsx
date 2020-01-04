import React, { FC } from 'react'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import {
  Button,
  Popover,
  Paper,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@material-ui/core'

interface Props {
  title?: string
  content?: string
  onOk: () => void
}

const ConfirmPoper: FC<Props> = ({ children, onOk }) => {
  return (
    <PopupState variant="popover" popupId="deleteOnePoperOver">
      {popupState => (
        <div>
          <div style={{ cursor: 'pointer' }} {...bindTrigger(popupState)}>
            {children}
          </div>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'left',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            disableRestoreFocus
          >
            <Paper>
              <DialogTitle>Use Google's location service?</DialogTitle>
              <DialogContent>
                <DialogContentText>Let Google help apps determine location.</DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={popupState.close} color="primary">
                  Cancel
                </Button>
                <Button
                  onClick={() => {
                    onOk()
                    popupState.close()
                  }}
                  color="primary"
                >
                  OK
                </Button>
              </DialogActions>
            </Paper>
          </Popover>
        </div>
      )}
    </PopupState>
  )
}

export default ConfirmPoper
