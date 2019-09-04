import { combineEpics } from 'redux-observable'
import { values } from 'ramda'
import * as Announcement from 'stores/announcement/epics'

export default combineEpics(
  ...values({
    ...Announcement,
  }),
)
