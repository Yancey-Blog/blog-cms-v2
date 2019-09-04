import React, { FC } from 'react'
import { connect } from 'react-redux'
import { fetchAnnouncements } from 'stores/announcement/actions'
import styles from 'Motto.module.scss'

const mapStateToProps = (state: any) => ({
  count: state.CounterReducers.count,
})

const mapDispatchToProps = {
  fetchAnnouncements: fetchAnnouncements.request,
}

type Props = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps

const Motto: FC<any> = ({ count, increase, decrease }) => {
  return (
    <section>
      <button onClick={increase}>+</button>
      <span>{count}</span>
      <button onClick={decrease}>-</button>
    </section>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Motto)
