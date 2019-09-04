import { GET } from 'shared/axios'
import { AxiosResponse } from 'axios'
import { IAnnouncement } from 'typings/announcement'

export const getAnnouncement = (): Promise<AxiosResponse<IAnnouncement>> => {
  return GET('/latestAnnouncements')
}
