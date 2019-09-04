import { combineReducers } from 'redux'
import { createReducer } from 'typesafe-actions'
import { fetchAnnouncements } from './actions'
import { IAnnouncement } from 'typings/announcement'

const announcements = createReducer([] as IAnnouncement[]).handleAction(
  fetchAnnouncements.success,
  (state, action) => {
    return action.payload
  },
)

const AnnouncementsReducer = combineReducers({
  announcements,
})

export default AnnouncementsReducer
