export const getInitials = (txt: string) =>
  txt
    .split(' ')
    .map(v => v[0])
    .join('')

export const formatJSONDate = (jsonDate: string) =>
  new Date(+new Date(new Date(jsonDate).toJSON()) + 8 * 3600 * 1000)
    .toISOString()
    .replace(/T/g, ' ')
    .replace(/\.[\d]{3}Z/, '')
