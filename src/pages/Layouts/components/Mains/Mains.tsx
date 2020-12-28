import { FC } from 'react'
import { Route, Switch } from 'react-router-dom'
import loadable from '@loadable/component'
import { mapRoutes } from 'src/routes'
import Loading from 'src/components/Loading/InstagramLoading'
import NotFound from 'src/components/NotFound/NotFound'
import useStyles from './styles'

const routeList = mapRoutes()

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
