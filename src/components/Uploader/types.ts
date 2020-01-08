export interface Error {
  status: number
  code: string
}

export interface Data {
  name: string
  url: string
}

export interface Props {
  accept?: string
  action?: string
  method?:
    | 'GET'
    | 'POST'
    | 'HEAD'
    | 'PUT'
    | 'DELETE'
    | 'CONNECT'
    | 'OPTIONS'
    | 'TRACE'
    | 'PATCH'
  disabled?: boolean
  name?: string
  defaultFile?: string
  onChange: Function
}
