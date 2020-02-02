import React, { FC, useState } from 'react'
import { Paper, Typography } from '@material-ui/core'
import {
  ViewState,
  EditingState,
  IntegratedEditing,
  ChangeSet,
  AppointmentModel,
} from '@devexpress/dx-react-scheduler'
import {
  Scheduler,
  EditRecurrenceMenu,
  DayView,
  WeekView,
  MonthView,
  Toolbar,
  DateNavigator,
  TodayButton,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  AllDayPanel,
  DragDropProvider,
  CurrentTimeIndicator,
} from '@devexpress/dx-react-scheduler-material-ui'
import ExternalViewSwitcher from './components/ExternalViewSwitcher/ExternalViewSwitcher'
import NavigationButton from './components/NavigationButton/NavigationButton'
import { appointments } from './mock'
import useStyles from './styles'

const Agenda: FC = () => {
  const [currentViewName, setCurrentViewName] = useState('Day')

  const [data, setData] = useState(appointments)

  const classes = useStyles()

  const commitChanges = ({ added, changed, deleted }: ChangeSet) => {
    if (added) {
      const startingAddedId = '9999'
      setData([
        ...data,
        { id: startingAddedId, ...added },
      ] as AppointmentModel[])
    }
    if (changed) {
      setData(
        data.map(appointment =>
          changed[appointment.id ? appointment.id : 0]
            ? {
                ...appointment,
                ...changed[appointment.id ? appointment.id : 0],
              }
            : appointment,
        ),
      )
    }
    if (deleted !== undefined) {
      setData(data.filter(appointment => appointment.id !== deleted))
    }
  }

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

      <Scheduler data={data}>
        <ViewState currentViewName={currentViewName} />
        <EditingState onCommitChanges={commitChanges} />
        <EditRecurrenceMenu />
        <IntegratedEditing />
        <DayView />
        <WeekView />
        <MonthView />
        <Toolbar />
        <DateNavigator navigationButtonComponent={NavigationButton} />
        <TodayButton />
        <Appointments />
        <AppointmentTooltip showCloseButton showOpenButton showDeleteButton />
        <AppointmentForm />
        <AllDayPanel />
        <DragDropProvider allowDrag={() => true} />
        <CurrentTimeIndicator updateInterval={60} />
      </Scheduler>
    </Paper>
  )
}

export default Agenda
