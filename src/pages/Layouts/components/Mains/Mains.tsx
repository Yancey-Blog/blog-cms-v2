import React, { FC, lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import Loading from 'src/components/Loading/Loading'
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
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path="/announcement" render={() => <Announcement />} />
        <Route exact path="/open-source" render={() => <OpenSource />} />
        <Route exact path="/motto" render={() => <Motto />} />
      </Switch>
    </Suspense>
  </main>
)

export default Mains
