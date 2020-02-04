import React, { FC, lazy } from 'react'
import { Route, Switch } from 'react-router-dom'
import Routes from 'src/config/Routes'
import styles from './Mains.module.scss'

interface IRoute {
  path: string
  component: string
}

function getRoutes() {
  const routers: IRoute[] = []

  Routes.forEach(route => {
    if (route.routes) {
      route.routes.forEach(routeChild => {
        routers.push({
          path: routeChild.path,
          component: routeChild.component,
        })
      })
    } else {
      routers.push({
        path: route.path,
        component: route.component as string,
      })
    }
  })

  return routers
}

const routeList = getRoutes()

const Mains: FC = () => (
  <main className={styles.main}>
    <Switch>
      {routeList.map(route => (
        <Route
          key={route.path}
          path={`/${route.path}`}
          component={lazy(() => import(`src/containers/${route.component}`))}
        />
      ))}
    </Switch>
  </main>
)

export default Mains
