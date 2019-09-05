import { createAsyncAction } from 'typesafe-actions'
import { IAnnouncement } from 'typings/announcement'

export const fetchAnnouncements = createAsyncAction(
  'announcement/FETCH_ANNOUNCEMENTS_REQUEST',
  'announcement/FETCH_ANNOUNCEMENTS_SUCCESS',
  'announcement/FETCH_ANNOUNCEMENTS_FAILURE',
  'announcement/FETCH_ANNOUNCEMENTS_CANCEL',
)<{ page: number; pageSize: number }, IAnnouncement[], string, string>()
