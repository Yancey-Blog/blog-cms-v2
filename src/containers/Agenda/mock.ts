import { AppointmentModel } from '@devexpress/dx-react-scheduler'
import moment from 'moment'

export const appointments = [
  {
    startDate: moment('2020-02-02 10:00').toDate(),
    endDate: moment('2020-02-02 11:00').toDate(),
    title: 'Meeting',
    id: '1',
  },
  {
    startDate: moment('2020-02-02 10:30').toDate(),
    title: '只有开始时间没有结束时间',
    id: '2',
  },
  {
    startDate: moment('2020-02-04 18:00').toDate(),
    endDate: moment('2020-02-04 19:30').toDate(),
    title: 'Go to a gym',
    // SECONDLY | MINUTELY | HOURLY | DAILY | WEEKLY | MONTHLY | YEARLY
    rRule: 'FREQ=WEEKLY;count=10',
    exDate: '2020-03-08',
    id: '3',
  },
] as AppointmentModel[]
