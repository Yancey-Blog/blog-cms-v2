export const getInitials = (txt: string) =>
  txt
    .split(' ')
    .map(v => v[0])
    .join('')
