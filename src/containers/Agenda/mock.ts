import { AppointmentModel } from '@devexpress/dx-react-scheduler'

export const appointments = [
  {
    startDate: '2020-02-02 10:00',
    endDate: '2020-02-02 11:00',
    title: 'Meeting',
  },
  {
    startDate: '2020-02-02 10:30',
    title: '只有开始时间没有结束时间',
  },
  {
    startDate: '2020-02-04 18:00',
    endDate: '2020-02-04 19:30',
    title: 'Go to a gym',
    // SECONDLY | MINUTELY | HOURLY | DAILY | WEEKLY | MONTHLY | YEARLY
    rRule: 'FREQ=WEEKLY',
    exDate: '2020-03-08',
  },
] as AppointmentModel[]
