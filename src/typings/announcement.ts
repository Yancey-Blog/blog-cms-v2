import { IBaseParams } from './common'

export interface IAnnouncement extends IBaseParams {
  announcement: string
}

export interface IAnnouncementState {
  byId: { [key: string]: IAnnouncement }
  allIds: string[]
  isFetching: boolean
  errorMsg: string
}

export interface IAnnouncementParams {
  announcement: string
}
