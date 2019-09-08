import dayjs from 'dayjs'

export const getInitials = (txt: string) =>
  txt
    .split(' ')
    .map(v => v[0])
    .join('')

export const formatISODate = (ISODate: string) =>
  dayjs(ISODate).format('YYYY-MM-DD HH:mm:ss')
