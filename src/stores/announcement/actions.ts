import { createAsyncAction } from 'typesafe-actions'
import { IAnnouncement } from 'typings/announcement'
import { IBatchDeleteRes } from 'typings/common'

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

export const updateAnnouncement = createAsyncAction(
  'announcement/UPDATE_ANNOUNCEMENT_REQUEST',
  'announcement/UPDATE_ANNOUNCEMENT_SUCCESS',
  'announcement/UPDATE_ANNOUNCEMENT_FAILURE',
  'announcement/UPDATE_ANNOUNCEMENT_CANCEL',
)<{ id: string; announcement: string }, IAnnouncement, string, void>()

export const deleteAnnouncement = createAsyncAction(
  'announcement/DELETE_ANNOUNCEMENT_REQUEST',
  'announcement/DELETE_ANNOUNCEMENT_SUCCESS',
  'announcement/DELETE_ANNOUNCEMENT_FAILURE',
  'announcement/DELETE_ANNOUNCEMENT_CANCEL',
)<{ id: string }, IAnnouncement, string, void>()

export const deleteAnnouncements = createAsyncAction(
  'announcement/DELETE_ANNOUNCEMENTS_REQUEST',
  'announcement/DELETE_ANNOUNCEMENTS_SUCCESS',
  'announcement/DELETE_ANNOUNCEMENTS_FAILURE',
  'announcement/DELETE_ANNOUNCEMENTS_CANCEL',
)<{ ids: string[] }, IBatchDeleteRes, string, void>()
