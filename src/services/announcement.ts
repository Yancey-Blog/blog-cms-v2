import { Observable } from 'rxjs'
import { GET, POST, PUT, DELETE } from 'shared/axios'

export const getAnnouncements = (): Observable<any[]> => GET('/announcements', {})

export const addAnnouncement = (data: any): Observable<any> => POST('/announcements', data)

export const updateAnnouncement = (id: string, data: any): Observable<any> =>
  PUT(`/announcements/${id}`, data)

export const deleteAnnouncement = (id: string): Observable<any> => DELETE(`/announcements/${id}`)

export const deleteAnnouncements = (data: string[]): Observable<any> =>
  DELETE('/announcements', data)
