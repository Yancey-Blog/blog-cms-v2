import { connect } from 'react-redux'
import { RootState } from 'typesafe-actions'
import Announcement from './Announcement'
import {
  getAnnouncements,
  addAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  deleteAnnouncements,
} from 'stores/announcement/actions'

const mapStateToProps = (state: RootState) => {
  const {
    announcements: { announcements },
  } = state

  return {
    announcements: announcements.allIds.map(id => announcements.byId[id]),
    byId: announcements.byId,
    isFetching: announcements.isFetching,
  }
}

const mapDispatchToProps = {
  getAnnouncements: getAnnouncements.request,
  addAnnouncement: addAnnouncement.request,
  updateAnnouncement: updateAnnouncement.request,
  deleteAnnouncement: deleteAnnouncement.request,
  deleteAnnouncements: deleteAnnouncements.request,
}

export type Props = ReturnType<typeof mapStateToProps> &
  typeof mapDispatchToProps

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Announcement)
