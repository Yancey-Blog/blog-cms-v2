import { combineReducers } from 'redux'
import { createReducer } from 'typesafe-actions'
import { zipObj } from 'ramda'
import { getAnnouncements } from './actions'
import { IAnnouncementState } from 'typings/announcement'

const initialState: IAnnouncementState = {
  byId: {},
  allIds: [],
}

const announcements = createReducer(initialState).handleAction(
  getAnnouncements.success,
  (state, action) => {
    const allIds = action.payload.map(item => item._id)
    const byId = zipObj(allIds, action.payload)
    return { ...state, byId, allIds }
  },
)

const AnnouncementsReducer = combineReducers({
  announcements,
})

export default AnnouncementsReducer
