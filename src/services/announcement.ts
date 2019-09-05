import { GET } from 'shared/axios'
import { AxiosResponse } from 'axios'
import { IAnnouncement } from 'typings/announcement'

export const getAnnouncements = (): Promise<AxiosResponse<IAnnouncement>> => {
  return GET('/announcements')
}
