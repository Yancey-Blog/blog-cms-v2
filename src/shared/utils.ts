import dayjs from 'dayjs'

export const getInitials = (txt: string) =>
  txt
    .split(' ')
    .map(v => v[0])
    .join('')

export const formatISODate = (ISODate: string) =>
  dayjs(ISODate).format('YYYY-MM-DD HH:mm:ss')

export const getType = (type: any) =>
  Object.prototype.toString
    .call(type)
    .slice(8, -1)
    .toLowerCase()

export const matchPath = (path: string) => {
  const _str = path.split('/').filter(v => v !== '')
  if (_str.length > 1) {
    return {
      parent: `/${_str[0]}`,
      child: `/${_str.join('/')}`,
    }
  } else {
    return {
      parent: `/${_str}`,
      child: '',
    }
  }
}

export const isNumber = (type: any) => getType(type) === 'number'

export const isString = (type: any) => getType(type) === 'string'

export const isArray = (type: any) => Array.isArray(type)
