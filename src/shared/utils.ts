import moment from 'moment'
import qs from 'query-string'
import history from './history'

interface Dict {
  [index: string]: any
}

export const getInitials = (txt: string) =>
  txt
    .split(' ')
    .map((val: string) => val[0])
    .join('')

export const formatDate = (ISOString: string) =>
  moment(ISOString).format('YYYY-MM-DD HH:mm:ss')

export const getType = <T>(type: T) =>
  Object.prototype.toString.call(type).slice(8, -1).toLowerCase()

export const goBack = () => history.goBack()

export const parseSearch = (search: string) =>
  qs.parse(search, { parseBooleans: true })

export const stringfySearch = (searchObj: Dict) => qs.stringify(searchObj)

export const noop = () => {}

export const isNumber = <T>(type: T) => getType(type) === 'number'

export const isString = <T>(type: T) => getType(type) === 'string'

export const isBoolean = <T>(type: T) => getType(type) === 'boolean'

export const isArray = <T>(type: T) => Array.isArray(type)

export const logout = () => {
  window.localStorage.clear()
  history.replace('/login')
}

export const getURLPathName = (url: string) =>
  decodeURI(new URL(url).pathname.slice(1))

export const generateFile = (data: string, type = 'text/plain') => {
  return URL.createObjectURL(new Blob([data], { type }))
}
