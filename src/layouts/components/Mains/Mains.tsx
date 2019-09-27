import React, { FC, lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import Loading from 'components/Loading/Loading'
import styles from './Mains.module.scss'

const Announcement = lazy(() =>
  import('containers/Home/Announcement/Announcement.connect'),
)
const Motto = lazy(() => import('containers/Home/Motto/Motto'))

const Mains: FC = () => (
  <main className={styles.main}>
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path='/home/announcement' render={() => <Announcement />} />
        <Route path='/home/motto' render={() => <Motto />} />
      </Switch>
    </Suspense>
  </main>
)

export default Mains
