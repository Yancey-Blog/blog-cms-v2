import React, { FC } from 'react'
import { Paper } from '@material-ui/core'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab'
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles'

interface Props {
  handleToggleChange: Function
}

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
  }),
)

const ToggleChart: FC<Props> = ({ children, handleToggleChange }) => {
  const classes = useStyles()

  return (
    <Paper className={classes.paper}>
      <ToggleButtonGroup
        className={classes.toggleButtonGroup}
        size="small"
        exclusive
        onChange={(e, value) => handleToggleChange(value)}
        aria-label="chart-date-picker"
      >
        <ToggleButton value={288} aria-label="24 hours">
          24H
        </ToggleButton>
        <ToggleButton value={144} aria-label="12 hours">
          12H
        </ToggleButton>
        <ToggleButton value={12} aria-label="1 hour">
          1H
        </ToggleButton>
      </ToggleButtonGroup>
      {children}
    </Paper>
  )
}

export default ToggleChart
