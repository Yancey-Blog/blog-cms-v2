import moment from 'moment'
import qs from 'query-string'
import history from './history'

interface Dict {
  [index: string]: any
}

export const getInitials = (txt: string) =>
  txt
    .split(' ')
    .map((v: string) => v[0])
    .join('')

export const formatDate = (timestamp: string) =>
  moment(parseInt(timestamp)).format('YYYY-MM-DD HH:mm:ss')

export const getType = (type: any) =>
  Object.prototype.toString
    .call(type)
    .slice(8, -1)
    .toLowerCase()

export const goBack = (resetForm?: Function) => {
  history.goBack()
  resetForm && resetForm()
}

export const parseSearch = (search: string) => qs.parse(search, { parseBooleans: true })

export const stringfySearch = (searchObj: Dict) => qs.stringify(searchObj)

export const noop = () => {}

export const isNumber = (type: any) => getType(type) === 'number'

export const isString = (type: any) => getType(type) === 'string'

export const isBoolean = (type: any) => getType(type) === 'boolean'

export const isArray = (type: any) => Array.isArray(type)
