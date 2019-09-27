import { connect } from 'react-redux'
import { RootState } from 'typesafe-actions'
import { push } from 'connected-react-router'
import {
  getAnnouncements,
  deleteAnnouncement,
  deleteAnnouncements,
} from 'stores/announcement/actions'
import Announcement from './Announcement'

const mapStateToProps = (state: RootState) => {
  const {
    announcements: { announcements },
    router: {
      location: { pathname },
    },
  } = state

  return {
    announcements: announcements.allIds.map(
      (id: string) => announcements.byId[id],
    ),
    byId: announcements.byId,
    isFetching: announcements.isFetching,
    pathname,
  }
}

const mapDispatchToProps = {
  getAnnouncements: getAnnouncements.request,
  deleteAnnouncement: deleteAnnouncement.request,
  deleteAnnouncements: deleteAnnouncements.request,
  push,
}

export type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Announcement)
