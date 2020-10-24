import { FC } from 'react'
import { Button } from '@material-ui/core'
import { TodayButton } from '@devexpress/dx-react-scheduler-material-ui'
import useStyles from '../styles'

const CustomTodayButton: FC<TodayButton.ButtonProps> = ({ setCurrentDate }) => {
  const classes = useStyles()

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
