import React, { FC, useState } from 'react'
import { Paper, Button, ButtonGroup, Typography } from '@material-ui/core'
import { ViewState } from '@devexpress/dx-react-scheduler'
import {
  Scheduler,
  DayView,
  WeekView,
  MonthView,
  Toolbar,
  Appointments,
  AppointmentTooltip,
  AllDayPanel,
} from '@devexpress/dx-react-scheduler-material-ui'
import { appointments } from './mock'
import { ViewDate } from './constants'
import useStyles from './styles'

interface IExternalViewSwitcher {
  currentViewName: string
  onChange: any
}

const Agenda: FC = () => {
  const [currentViewName, setCurrentViewName] = useState('Day')
  const classes = useStyles()

  const ExternalViewSwitcher: FC<IExternalViewSwitcher> = ({ onChange }) => (
    <ButtonGroup color="secondary" aria-label="outlined secondary button group">
      {ViewDate.map(val => (
        <Button key={val} onClick={() => onChange(val)}>
          {val}
        </Button>
      ))}
    </ButtonGroup>
  )

  return (
    <Paper>
      <header className={classes.header}>
        <ExternalViewSwitcher
          currentViewName={currentViewName}
          onChange={(val: string) => setCurrentViewName(val)}
        />
        <Typography variant="h3">February 2020</Typography>
        <ExternalViewSwitcher
          currentViewName={currentViewName}
          onChange={(val: string) => setCurrentViewName(val)}
        />
      </header>

      <Scheduler data={appointments}>
        <ViewState currentViewName={currentViewName} />
        <DayView />
        <WeekView />
        <MonthView />
        <Toolbar />
        <Appointments />
        <AppointmentTooltip />
        <AllDayPanel />
      </Scheduler>
    </Paper>
  )
}

export default Agenda
