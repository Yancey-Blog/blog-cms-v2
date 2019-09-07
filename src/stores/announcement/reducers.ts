import { combineReducers } from 'redux'
import { createReducer } from 'typesafe-actions'
import { zipObj } from 'ramda'
import {
  getAnnouncements,
  addAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from './actions'
import { IAnnouncementState } from 'typings/announcement'

import Toast from 'components/Toast/Toast'

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
    ],
    (state, action) => {
      return { ...state, isFetching: true }
    },
  )
  .handleAction(getAnnouncements.success, (state, action) => {
    const allIds = action.payload.map(item => item._id)
    const byId = zipObj(allIds, action.payload)
    return { ...state, byId, allIds, isFetching: false }
  })
  .handleAction(
    [
      getAnnouncements.failure,
      addAnnouncement.failure,
      updateAnnouncement.failure,
      deleteAnnouncement.failure,
    ],
    (state, action) => {
      Toast.error(action.payload)
      return { ...state, isFetching: false }
    },
  )

const AnnouncementsReducer = combineReducers({
  announcements,
})

export default AnnouncementsReducer
