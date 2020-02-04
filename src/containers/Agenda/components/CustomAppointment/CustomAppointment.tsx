import React, { FC } from 'react'
import { Appointments } from '@devexpress/dx-react-scheduler-material-ui'

const CustomAppointment: FC = ({ children }) => (
  // @ts-ignore
  <Appointments.Appointment
    style={{
      backgroundColor: '#4fc3f7',
      borderRadius: '8px',
    }}
  >
    {children}
  </Appointments.Appointment>
)

export default CustomAppointment
