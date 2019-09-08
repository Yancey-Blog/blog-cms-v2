import React, { FC } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'typesafe-actions'

import {
  getAnnouncements,
  addAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
} from 'stores/announcement/actions'

const mapStateToProps = (state: RootState) => {
  const {
    announcements: { announcements },
  } = state

  return {
    announcements: announcements.allIds.map(id => announcements.byId[id]),
    isFetching: announcements.isFetching,
  }
}

const mapDispatchToProps = {
  getAnnouncements: getAnnouncements.request,
  addAnnouncement: addAnnouncement.request,
  updateAnnouncement: updateAnnouncement.request,
  deleteAnnouncement: deleteAnnouncement.request,
}

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps

const MottoConnect: FC<Props> = ({}) => {
  return <></>
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(MottoConnect)
