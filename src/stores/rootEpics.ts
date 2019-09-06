import { combineEpics } from 'redux-observable'
import { values } from 'ramda'
import * as AnnouncementEpics from './announcement/epics'
export default combineEpics(
  ...values({
    ...AnnouncementEpics,
  }),
)
