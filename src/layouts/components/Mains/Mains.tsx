import React, { FC } from 'react'
import { Route, Switch } from 'react-router-dom'
import Announcement from 'containers/Home/Announcement/Announcement'
import styles from './Mains.module.scss'

const Mains: FC = () => {
  return (
    <main className={styles.main}>
      <Switch>
        <Route path='/announcement' render={() => <Announcement />} />
      </Switch>
    </main>
  )
}

export default Mains
