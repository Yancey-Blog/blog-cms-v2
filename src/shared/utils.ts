import dayjs from 'dayjs'

export const getInitials = (txt: string) =>
  txt
    .split(' ')
    .map(v => v[0])
    .join('')

export const formatISO8601Date = (ISO8601Date: string) =>
  dayjs(ISO8601Date).format('YYYY-MM-DD HH:mm:ss')
