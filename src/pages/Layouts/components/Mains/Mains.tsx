import React, { FC } from 'react'
import { Route } from 'react-router-dom'
// import Routes from 'src/config/Routes'
import useStyles from './styles'

import Announcement from 'src/containers/Home/Announcement/Announcement'
import OpenSource from 'src/containers/Home/OpenSource/OpenSource'
import Motto from 'src/containers/Home/Motto/Motto'
import Agenda from 'src/containers/Agenda/Agenda'

// interface IRoute {
//   path: string
//   component: string
// }

// function getRoutes() {
//   const routers: IRoute[] = []

//   Routes.forEach(route => {
//     if (route.routes) {
//       route.routes.forEach(routeChild => {
//         routers.push({
//           path: routeChild.path,
//           component: routeChild.component,
//         })
//       })
//     } else {
//       routers.push({
//         path: route.path,
//         component: route.component as string,
//       })
//     }
//   })

//   return routers
// }

// const routeList = getRoutes()

const Mains: FC = () => {
  const classes = useStyles()

  return (
    <main className={classes.main}>
      {/* {routeList.map(route => (
      <Route
        exact
        key={route.path}
        path={`/${route.path}`}
        component={lazy(() => import(`src/containers/${route.component}`))}
      />
    ))} */}
      <Route exact path={`/announcement`}>
        <Announcement />
      </Route>
      <Route exact path={`/motto`}>
        <Motto />
      </Route>
      <Route exact path={`/open-source`}>
        <OpenSource />
      </Route>
      <Route exact path={`/agenda`}>
        <Agenda />
      </Route>
    </main>
  )
}

export default Mains
