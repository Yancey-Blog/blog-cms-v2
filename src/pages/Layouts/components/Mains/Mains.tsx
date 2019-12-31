import React, { FC, lazy, Suspense } from 'react'
import { Route, Switch } from 'react-router-dom'
import Loading from '../../../../components/Loading/Loading'
import styles from './Mains.module.scss'

const Announcement = lazy(() => import('../../../../containers/Home/Announcement/Announcement'))
const OpenSource = lazy(() => import('../../../../containers/Home/OpenSource/OpenSource'))

const Mains: FC = () => (
  <main className={styles.main}>
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route exact path="/announcement" render={() => <Announcement />} />
        <Route exact path="/open-source" render={() => <OpenSource />} />
      </Switch>
    </Suspense>
  </main>
)

export default Mains