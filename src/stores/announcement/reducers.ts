import { combineReducers } from 'redux'
import { createReducer } from 'typesafe-actions'
import { zipObj } from 'ramda'
import { IAnnouncementState } from 'typings/announcement'
import {
  getAnnouncements,
  addAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  deleteAnnouncements,
} from './actions'

const initialState: IAnnouncementState = {
  byId: {},
  allIds: [],
  isFetching: false,
  errorMsg: '',
}

const announcements = createReducer(initialState)
  .handleAction(
    [
      getAnnouncements.request,
      addAnnouncement.request,
      updateAnnouncement.request,
      deleteAnnouncement.request,
      deleteAnnouncements.request,
    ],
    (state: any) => ({ ...state, isFetching: true }),
  )
  .handleAction(getAnnouncements.success, (state, action) => {
    const allIds = action.payload.map((item: any) => item._id)
    const byId = zipObj(allIds, action.payload)
    return { ...state, byId, allIds, isFetching: false }
  })
  .handleAction(
    [
      getAnnouncements.failure,
      addAnnouncement.failure,
      updateAnnouncement.failure,
      deleteAnnouncement.failure,
      deleteAnnouncements.failure,
      deleteAnnouncement.cancel,
      deleteAnnouncement.cancel,
      deleteAnnouncement.cancel,
      deleteAnnouncement.cancel,
      deleteAnnouncements.cancel,
    ],
    (state: any) => ({ ...state, isFetching: false }),
  )

const AnnouncementsReducer = combineReducers({
  announcements,
})

export default AnnouncementsReducer
