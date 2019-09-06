import { createAsyncAction } from 'typesafe-actions'
import { IAnnouncement } from 'typings/announcement'

export const getAnnouncements = createAsyncAction(
  'announcement/GET_ANNOUNCEMENTS_REQUEST',
  'announcement/GET_ANNOUNCEMENTS_SUCCESS',
  'announcement/GET_ANNOUNCEMENTS_FAILURE',
  'announcement/GET_ANNOUNCEMENTS_CANCEL',
)<undefined, IAnnouncement[], string, void>()

export const addAnnouncement = createAsyncAction(
  'announcement/ADD_ANNOUNCEMENT_REQUEST',
  'announcement/ADD_ANNOUNCEMENT_SUCCESS',
  'announcement/ADD_ANNOUNCEMENT_FAILURE',
  'announcement/ADD_ANNOUNCEMENT_CANCEL',
)<{ announcement: string }, IAnnouncement, string, void>()
