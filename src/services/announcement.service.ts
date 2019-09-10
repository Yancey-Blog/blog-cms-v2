import { Observable } from 'rxjs'
import { IAnnouncement, IAnnouncementParams } from 'typings/announcement'
import { IBatchDeleteRes } from 'typings/common'
import { GET, POST, PUT, DELETE } from 'shared/axios'

export const getAnnouncements = (): Observable<IAnnouncement[]> => {
  return GET('/announcements', {})
}

export const addAnnouncement = (
  data: IAnnouncementParams,
): Observable<IAnnouncement> => {
  return POST('/announcements', data)
}

export const updateAnnouncement = (
  id: string,
  data: IAnnouncementParams,
): Observable<IAnnouncement> => {
  return PUT(`/announcements/${id}`, data)
}

export const deleteAnnouncement = (id: string): Observable<IAnnouncement> => {
  return DELETE(`/announcements/${id}`)
}

export const deleteAnnouncements = (
  data: string[],
): Observable<IBatchDeleteRes> => {
  return DELETE('/announcements', data)
}
