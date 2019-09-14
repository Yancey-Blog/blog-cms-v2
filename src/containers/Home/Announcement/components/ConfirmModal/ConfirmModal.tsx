import React, { FC } from 'react'
import { RootState } from 'typesafe-actions'
import { connect } from 'react-redux'
import { goBack } from 'connected-react-router'
import {
  Button,
  DialogActions,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
} from '@material-ui/core'

interface IConfirmModal {
  onSubmit: (ids: string[]) => void
}

const mapStateToProps = (state: RootState) => {
  const {
    router: {
      location: { state: routeState },
    },
  } = state
  return {
    routeState,
  }
}

const mapDispatchToProps = {
  goBack,
}

export type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps &
  IConfirmModal

const ConfirmModal: FC<Props> = ({ routeState, onSubmit, goBack }) => {
  return (
    <Dialog open onClose={goBack}>
      <DialogTitle>Are you sure delete those items?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Let Google help apps determine location. This means sending anonymous
          location data to Google, even when no apps are running.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={goBack} color='primary'>
          Cancel
        </Button>
        <Button onClick={() => onSubmit(routeState)} color='primary'>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ConfirmModal)
