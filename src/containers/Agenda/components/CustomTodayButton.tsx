import { FC } from 'react'
import { Button } from '@mui/material'
import { ClassNameMap } from '@mui/styles'
import { TodayButton } from '@devexpress/dx-react-scheduler-material-ui'
import useStyles from '../styles'

const CustomTodayButton: FC<TodayButton.ButtonProps> = ({ setCurrentDate }) => {
  const classes: ClassNameMap = useStyles()

  return (
    <Button
      size="small"
      variant="contained"
      color="primary"
      onClick={() => setCurrentDate(new Date())}
      className={classes.customBtn}
    >
      Today
    </Button>
  )
}

export default CustomTodayButton
