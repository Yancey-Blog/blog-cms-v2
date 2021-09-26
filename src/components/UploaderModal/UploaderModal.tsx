import { FC } from 'react'
import {
  DialogActions,
  DialogTitle,
  Dialog,
  DialogContent,
  Button,
} from '@mui/material'
import { makeStyles, ClassNameMap } from '@mui/styles'
import Uploader from '../Uploader/Uploader'

interface Props {
  open: boolean
  onOk: Function
  onClose: Function
  onChange: Function
}

const useStyles = makeStyles({
  uploaderModalContent: {
    margin: '24px auto',
  },
})

const UploaderModal: FC<Props> = ({ open, onOk, onClose, onChange }) => {
  const classes: ClassNameMap = useStyles()

  const handleOk = () => {
    onClose(false)
    onOk()
  }
  return (
    <Dialog open={open} onClose={() => onClose(false)}>
      <DialogTitle>Insert image to markdown editor.</DialogTitle>
      <DialogContent className={classes.uploaderModalContent}>
        <Uploader onChange={onChange} needMarginLeft={false} />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => onClose(false)}>
          Cancel
        </Button>
        <Button color="primary" onClick={handleOk}>
          Insert
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default UploaderModal
