import { FC } from 'react'
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

const ConfirmModal: FC<any> = ({ routeState, onSubmit, goBack }) => (
  <Dialog open onClose={goBack}>
    <DialogTitle>Are you sure delete those items?</DialogTitle>
    <DialogContent>
      <DialogContentText>
        Let Google help apps determine location. This means sending anonymous
        location data to Google, even when no apps are running.
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button onClick={goBack} color="primary">
        Cancel
      </Button>
      <Button onClick={() => onSubmit(routeState)} color="primary">
        OK
      </Button>
    </DialogActions>
  </Dialog>
)

export default ConfirmModal
