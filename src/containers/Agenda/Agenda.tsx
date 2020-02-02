import React, { FC, useState } from 'react'
import { Paper, Typography } from '@material-ui/core'
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
import ExternalViewSwitcher from './components/ExternalViewSwitcher/ExternalViewSwitcher'
import { appointments } from './mock'
import useStyles from './styles'

const Agenda: FC = () => {
  const [currentViewName, setCurrentViewName] = useState('Day')
  const classes = useStyles()

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
