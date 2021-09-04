import { FC } from 'react'
import { useMutation } from '@apollo/client'
import { useSnackbar } from 'notistack'
import {
  Button,
  DialogActions,
  DialogTitle,
  Dialog,
  DialogContent,
  DialogContentText,
} from '@material-ui/core'
import { TURN_OFF_TOTP } from 'src/containers/Settings/Security/typeDefs'
import { logout } from 'src/shared/utils'

interface ITurnOffTwoFactors {
  setOpen: Function
  open: boolean
}

const TurnOffTwoFactors: FC<ITurnOffTwoFactors> = ({ setOpen, open }) => {
  const { enqueueSnackbar } = useSnackbar()
  const [turnOffTOTP, { loading }] = useMutation(TURN_OFF_TOTP, {
    onCompleted() {
      enqueueSnackbar('Your TOTP is turning off. Redirect to login!', {
        variant: 'success',
      })
      setOpen(false)
      logout()
    },
  })

  return (
    <Dialog open={!!open}>
      <DialogTitle>
        Are you sure turn off Two-factor authentication?
      </DialogTitle>
      <DialogContent>
        <DialogContentText>
          Two-factor authentication adds an additional layer of security to your
          account by requiring more than just a password to sign in.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="primary">
          Cancel
        </Button>
        <Button
          onClick={() => turnOffTOTP()}
          color="primary"
          disabled={loading}
        >
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default TurnOffTwoFactors
