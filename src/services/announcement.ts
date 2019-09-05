import { Observable } from 'rxjs'
import http from 'configs/httpConfig'
import { IAnnouncement } from 'typings/announcement'

export const getAnnouncements = (): Observable<IAnnouncement[]> => {
  return http.get('/announcements', {})
}
