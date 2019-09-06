import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import history from 'shared/history'
import AnnouncementsReducer from './announcement/reducers'

const rootReducers = combineReducers({
  router: connectRouter(history),
  announcements: AnnouncementsReducer,
})

export default rootReducers
