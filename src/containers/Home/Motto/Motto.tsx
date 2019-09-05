import React, { FC, useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchAnnouncements } from 'stores/announcement/actions'
// import styles from 'Motto.module.scss'

const mapStateToProps = (state: any) => ({
  announcements: state.announcements,
})

const mapDispatchToProps = {
  fetchAnnouncements: fetchAnnouncements.request,
}

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps

const Motto: FC<Props> = ({ announcements, fetchAnnouncements }) => {
  useEffect(() => {
    fetchAnnouncements({})
  }, [])
  return <section>{announcements.toString()}</section>
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Motto)
