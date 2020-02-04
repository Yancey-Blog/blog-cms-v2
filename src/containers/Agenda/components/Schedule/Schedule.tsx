import React, { FC, useState } from 'react'
import { Paper } from '@material-ui/core'
import {
  ViewState,
  EditingState,
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
  ConfirmationDialog,
  Appointments,
  AppointmentTooltip,
  AppointmentForm,
  AllDayPanel,
  DragDropProvider,
  CurrentTimeIndicator,
} from '@devexpress/dx-react-scheduler-material-ui'
import ExternalViewSwitcher from '../ExternalViewSwitcher/ExternalViewSwitcher'
import CustomNavigationButton from '../CustomNavigationButton/CustomNavigationButton'
import CustomTodayButton from '../CustomTodayButton/CustomTodayButton'
import CustomOpenButton from '../CustomOpenButton/CustomOpenButton'
import CustomAppointment from '../CustomAppointment/CustomAppointment'
import useStyles from '../../styles'
import { ScheduleProps } from '../../types'
import { formatChangedData } from '../../tools'

const Schedule: FC<ScheduleProps> = ({
  dataSource,
  createAgenda,
  updateAgendaById,
  deleteAgendaById,
}) => {
  const classes = useStyles()

  const [currentViewName, setCurrentViewName] = useState('Month')

  const commitChanges = ({ added, changed, deleted }: ChangeSet) => {
    if (added) {
      createAgenda({ variables: { input: added } })
    }
    if (changed) {
      updateAgendaById({ variables: { input: formatChangedData(changed) } })
    }
    if (deleted) {
      deleteAgendaById({ variables: { id: deleted } })
    }
  }

  return (
    <Paper className={classes.customPaper}>
      <Scheduler data={dataSource as AppointmentModel[]} height={691}>
        <ExternalViewSwitcher
          currentViewName={currentViewName}
          onChange={(val: string) => setCurrentViewName(val)}
        />
        <ViewState currentViewName={currentViewName} />
        <EditingState onCommitChanges={commitChanges} />
        <EditRecurrenceMenu />
        <DayView />
        <WeekView />
        <MonthView />
        <Toolbar />
        <DateNavigator
          navigationButtonComponent={CustomNavigationButton}
          openButtonComponent={CustomOpenButton}
        />
        <TodayButton buttonComponent={CustomTodayButton} />
        <ConfirmationDialog />
        <Appointments appointmentComponent={CustomAppointment} />
        <AppointmentTooltip showCloseButton showOpenButton showDeleteButton />
        <AppointmentForm />
        <AllDayPanel />
        <DragDropProvider allowDrag={() => true} />
        <CurrentTimeIndicator
          updateInterval={60}
          shadePreviousCells
          shadePreviousAppointments
        />
      </Scheduler>
    </Paper>
  )
}

export default Schedule
