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
  onChange: Function
}
