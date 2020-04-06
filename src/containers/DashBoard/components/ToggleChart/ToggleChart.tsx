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

    toggleBtn: {
      padding: '0 4px',
      border: 'none',
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
        <ToggleButton
          value={288}
          aria-label="24 hours"
          className={classes.toggleBtn}
        >
          24H
        </ToggleButton>
        <ToggleButton
          value={144}
          aria-label="12 hours"
          className={classes.toggleBtn}
        >
          12H
        </ToggleButton>
        <ToggleButton
          value={12}
          aria-label="1 hour"
          className={classes.toggleBtn}
        >
          1H
        </ToggleButton>
      </ToggleButtonGroup>
      {children}
    </Paper>
  )
}

export default ToggleChart
