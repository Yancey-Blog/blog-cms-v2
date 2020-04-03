import React, { FC } from 'react'
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state'
import {
  Button,
  Popover,
  Paper,
  DialogActions,
  DialogTitle,
} from '@material-ui/core'
import {
  POPOVER_ANCHOR_ORIGIN,
  POPOVER_TRANSFORM_ORIGIN,
} from 'src/shared/constants'

interface Props {
  title?: string
  onOk: () => void
}

const ConfirmPoper: FC<Props> = ({ children, onOk, title }) => {
  return (
    <PopupState variant="popover" popupId="deleteOnePoperOver">
      {(popupState) => (
        <>
          <div style={{ cursor: 'pointer' }} {...bindTrigger(popupState)}>
            {children}
          </div>
          <Popover
            {...bindPopover(popupState)}
            anchorOrigin={POPOVER_ANCHOR_ORIGIN}
            transformOrigin={POPOVER_TRANSFORM_ORIGIN}
            disableRestoreFocus
          >
            <Paper>
              <DialogTitle>
                {title ? title : 'Are you sure you want to delete?'}
              </DialogTitle>
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
        </>
      )}
    </PopupState>
  )
}

export default ConfirmPoper
