import React, { FC } from 'react'
import { Route } from 'react-router-dom'
import loadable from '@loadable/component'
import routes from 'src/config/routes'
import Loading from 'src/components/Loading/InstagramLoading'
import useStyles from './styles'

interface IRoute {
  path: string
  component: string
}

function getRoutes() {
  const routers: IRoute[] = []

  routes.forEach(route => {
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

const Mains: FC = () => {
  const classes = useStyles()

  return (
    <main className={classes.main}>
      {routeList.map(route => (
        <Route
          exact
          key={route.path}
          path={`/${route.path}`}
          component={loadable(
            () => import(`src/containers/${route.component}`),
            {
              fallback: <Loading />,
            },
          )}
        />
      ))}
    </main>
  )
}

export default Mains
