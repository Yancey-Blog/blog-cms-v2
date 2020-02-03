import React, { FC, useState } from 'react'
import { Paper } from '@material-ui/core'
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
import ExternalViewSwitcher from '../ExternalViewSwitcher/ExternalViewSwitcher'
import CustomNavigationButton from '../CustomNavigationButton/CustomNavigationButton'
import CustomTodayButton from '../CustomTodayButton/CustomTodayButton'
import CustomOpenButton from '../CustomOpenButton/CustomOpenButton'
import useStyles from '../../styles'
import { ScheduleProps } from '../../types'

const Schedule: FC<ScheduleProps> = ({
  dataSource,
  createAgenda,
  updateAgendaById,
  deleteAgendaById,
}) => {
  const classes = useStyles()

  const [currentViewName, setCurrentViewName] = useState('Day')

  const commitChanges = ({ added, changed, deleted }: ChangeSet) => {
    if (added) {
      createAgenda({ variables: { input: added } })
    }
    if (changed) {
      console.log(changed)
      // updateAgendaById({ variables: { input: changed } })
    }
    if (deleted !== undefined) {
      deleteAgendaById({ variables: { id: deleted } })
    }
  }

  return (
    <Paper className={classes.customPaper}>
      <Scheduler data={dataSource as AppointmentModel[]}>
        <ExternalViewSwitcher
          currentViewName={currentViewName}
          onChange={(val: string) => setCurrentViewName(val)}
        />
        <ViewState currentViewName={currentViewName} />
        <EditingState onCommitChanges={commitChanges} />
        <EditRecurrenceMenu />
        <IntegratedEditing />
        <DayView />
        <WeekView />
        <MonthView />
        <Toolbar />
        <DateNavigator
          navigationButtonComponent={CustomNavigationButton}
          openButtonComponent={CustomOpenButton}
        />
        <TodayButton buttonComponent={CustomTodayButton} />
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

export default Schedule
