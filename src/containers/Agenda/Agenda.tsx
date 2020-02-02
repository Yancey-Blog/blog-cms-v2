import React, { FC, useState, ChangeEvent } from 'react'
import { Paper, RadioGroup, Radio, FormControlLabel } from '@material-ui/core'
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

interface IExternalViewSwitcher {
  currentViewName: string
  onChange: any
}

const ExternalViewSwitcher: FC<IExternalViewSwitcher> = ({
  currentViewName,
  onChange,
}) => (
  <RadioGroup
    aria-label="Views"
    style={{ flexDirection: 'row' }}
    name="views"
    value={currentViewName}
    onChange={onChange}
  >
    <FormControlLabel value="Day" control={<Radio />} label="Day" />
    <FormControlLabel value="Week" control={<Radio />} label="Week" />
    <FormControlLabel value="Month" control={<Radio />} label="Month" />
  </RadioGroup>
)

const Agenda: FC = () => {
  const [currentViewName, setCurrentViewName] = useState('Day')
  return (
    <Paper>
      <ExternalViewSwitcher
        currentViewName={currentViewName}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          setCurrentViewName(e.target.value)
        }
      />
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
