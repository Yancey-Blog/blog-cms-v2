import React, { FC } from 'react'
import CircularProgress from '@material-ui/core/CircularProgress'
import styles from './Loading.module.scss'

const Loading: FC = () => {
  return (
    <section className={styles.mask}>
      <CircularProgress />
    </section>
  )
}

export default Loading
