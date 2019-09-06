import { combineReducers } from 'redux'
import { createReducer } from 'typesafe-actions'
import { fetchAnnouncements } from './actions'
import { IAnnouncement } from 'typings/announcement'

const initialState = {}

const announcements = createReducer([] as IAnnouncement[]).handleAction(
  fetchAnnouncements.success,
  (state, action) => {
    const newAll = action.payload.reduce((acc, curr) => {
      return {
        ...acc,
        [curr._id]: curr,
      }
    }, {})

    const xxx = {
      byId: {
        ...newAll,
      },
      allIds: action.payload.map(banner => banner._id),
    }
  },
)

const AnnouncementsReducer = combineReducers({
  announcements,
})

export default AnnouncementsReducer
