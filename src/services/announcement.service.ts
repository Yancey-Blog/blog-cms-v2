import { Observable } from 'rxjs'
import http from 'configs/httpConfig'
import { IAnnouncement } from 'typings/announcement'

export const getAnnouncements = (): Observable<IAnnouncement[]> => {
  return http.get('/announcements', {})
}

// export const addAnnouncement = (
//   announcement: string,
// ): Observable<IAnnouncement> => {
//   return http.post('/announcements', { announcement })
// }

export const updateAnnouncement = (): Observable<IAnnouncement> => {
  return http.put('/announcements', {})
}

// export const deleteAnnouncement = (): Observable<IAnnouncement[]> => {
//   return http.delete('/announcements', {})
// }

// export const deleteAnnouncements = (): Observable<IAnnouncement[]> => {
//   return http.delete('/announcements', {})
// }
