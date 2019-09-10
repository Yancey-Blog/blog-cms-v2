import React, { FC } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'typesafe-actions'

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

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps

const AnnouncementConnect: FC<Props> = ({}) => {
  return <></>
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AnnouncementConnect)
