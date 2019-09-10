import React, { FC, lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import styles from './Mains.module.scss'
import Loading from 'components/Loading/Loading'

const Announcement = lazy(() =>
  import('containers/Home/Announcement/Announcement.connect'),
)
const Motto = lazy(() => import('containers/Home/Motto/Motto'))

const Mains: FC = () => {
  return (
    <main className={styles.main}>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route path='/home/announcement' render={() => <Announcement />} />
          <Route path='/home/motto' render={() => <Motto />} />
        </Switch>
      </Suspense>
    </main>
  )
}

export default Mains
