import { FC, useState } from 'react'
import { Paper } from '@mui/material'
import { ClassNameMap } from '@mui/styles'
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
import ExternalViewSwitcher from './ExternalViewSwitcher'
import CustomNavigationButton from './CustomNavigationButton'
import CustomTodayButton from './CustomTodayButton'
import CustomOpenButton from './CustomOpenButton'
import useStyles from '../styles'
import { ScheduleProps } from '../types'
import { formatChangedData } from '../tools'

const Schedule: FC<ScheduleProps> = ({
  dataSource,
  createAgenda,
  updateAgendaById,
  deleteAgendaById,
}) => {
  const classes: ClassNameMap = useStyles()

  const [currentViewName, setCurrentViewName] = useState('Week')

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
      <Scheduler data={dataSource as AppointmentModel[]}>
        <ExternalViewSwitcher
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
        <Appointments />
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
