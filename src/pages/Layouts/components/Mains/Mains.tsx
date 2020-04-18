import React, { FC } from 'react'
import { Route, Switch } from 'react-router-dom'
import loadable from '@loadable/component'
import routes from 'src/routes'
import Loading from 'src/components/Loading/InstagramLoading'
import NotFound from 'src/components/NotFound/NotFound'
import useStyles from './styles'

interface IRoute {
  path: string
  component: string
}

function getRoutes() {
  const routers: IRoute[] = []

  routes.forEach((route) => {
    routers.push({
      path: route.path,
      component: route.component as string,
    })

    if (route.routes) {
      route.routes.forEach((routeChild) => {
        routers.push({
          path: routeChild.path,
          component: routeChild.component,
        })
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
      <Switch>
        {routeList.map((route) => (
          <Route
            exact
            key={route.path}
            path={route.path}
            component={loadable(
              () => import(`src/containers/${route.component}`),
              {
                fallback: <Loading />,
              },
            )}
          />
        ))}
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </main>
  )
}

export default Mains
