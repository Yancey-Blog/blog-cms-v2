export interface Error {
  status: number
  code: string
}

export interface UploaderRes {
  name: string
  url: string
}

export interface Props {
  type?: 'avatar' | 'simple'
  variant?: 'elevation' | 'outlined' | undefined
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
  name?: string
  defaultFile?: string
  needMarginLeft?: boolean
  className?: any
  onChange: Function
}
