import React, { FC, lazy } from 'react'
import { Route, Switch } from 'react-router-dom'

import styles from './Mains.module.scss'

const Announcement = lazy(() =>
  import('src/containers/Home/Announcement/Announcement'),
)
const OpenSource = lazy(() =>
  import('src/containers/Home/OpenSource/OpenSource'),
)

const Motto = lazy(() => import('src/containers/Home/Motto/Motto'))

const Mains: FC = () => (
  <main className={styles.main}>
    <Switch>
      <Route path="/announcement" component={Announcement} />
      <Route path="/open-source" component={OpenSource} />
      <Route path="/motto" component={Motto} />
    </Switch>
  </main>
)

export default Mains
