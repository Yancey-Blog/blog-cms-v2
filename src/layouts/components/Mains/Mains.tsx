import React, { FC } from 'react'
import Announcement from 'containers/Announcement/Announcement'
import styles from './Mains.module.scss'

const Mains: FC = () => {
  return (
    <main className={styles.main}>
      <Announcement />
    </main>
  )
}

export default Mains
