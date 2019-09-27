import { Observable } from 'rxjs'
import { IAnnouncement, IAnnouncementParams } from 'typings/announcement'
import { IBatchDeleteRes } from 'typings/common'
import { GET, POST, PUT, DELETE } from 'shared/axios'

export const getAnnouncements = (): Observable<IAnnouncement[]> =>
  GET('/announcements', {})

export const addAnnouncement = (
  data: IAnnouncementParams,
): Observable<IAnnouncement> => POST('/announcements', data)

export const updateAnnouncement = (
  id: string,
  data: IAnnouncementParams,
): Observable<IAnnouncement> => PUT(`/announcements/${id}`, data)

export const deleteAnnouncement = (id: string): Observable<IAnnouncement> =>
  DELETE(`/announcements/${id}`)

export const deleteAnnouncements = (
  data: string[],
): Observable<IBatchDeleteRes> => DELETE('/announcements', data)
