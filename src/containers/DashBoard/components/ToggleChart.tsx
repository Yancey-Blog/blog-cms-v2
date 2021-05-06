import { FC, useState, MouseEvent } from 'react'
import { Paper } from '@material-ui/core'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

interface Props {
  handleToggleChange: Function
}

// 24 hours, 12 hours, 1 hour
const duration = [24, 12, 1]

// One data is provided every five minutes,
// so 12 data are provided every hour.
const countByHour = 12

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'relative',
      padding: 16,
    },

    toggleButtonGroup: {
      position: 'absolute',
      top: 4,
      right: 16,
    },

    toggleBtn: {
      padding: '0 4px',
      border: 'none',
    },
  }),
)

const ToggleChart: FC<Props> = ({ children, handleToggleChange }) => {
  const classes = useStyles()

  const [value, setValue] = useState(countByHour)

  const handleChange = (e: MouseEvent<HTMLElement>, value: number) => {
    handleToggleChange(value)
    setValue(value)
  }

  return (
    <Paper className={classes.paper}>
      <ToggleButtonGroup
        value={value}
        className={classes.toggleButtonGroup}
        size="small"
        exclusive
        onChange={handleChange}
        aria-label="chart-date-picker"
      >
        {duration.map((val) => (
          <ToggleButton
            key={val}
            value={val * countByHour}
            aria-label={`${val} hours`}
            className={classes.toggleBtn}
          >
            {val}H
          </ToggleButton>
        ))}
      </ToggleButtonGroup>
      {children}
    </Paper>
  )
}

export default ToggleChart
