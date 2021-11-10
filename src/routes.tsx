import { ReactElement } from 'react'
import {
  Dashboard,
  Home,
  Headset,
  PostAdd,
  Settings,
  Event,
} from '@material-ui/icons'

export interface RouteChildren {
  hideInMenu?: boolean
  name: string
  path: string
  component?: string
  isExternalLink?: boolean
}

export interface Route {
  name: string
  path: string
  icon: ReactElement
  component?: string
  isExternalLink?: boolean
  routes?: RouteChildren[]
}

interface MappedRoute {
  path: string
  component: string
}

const routes: Route[] = [
  {
    name: 'Dashboard',
    path: '/',
    icon: <Dashboard />,
    component: 'DashBoard/DashBoard',
  },
  {
    name: 'Home',
    path: '/home',
    icon: <Home />,
    routes: [
      {
        name: 'Announcement',
        path: '/announcement',
        component: 'Home/Announcement/Announcement',
      },
      {
        name: 'Cover',
        path: '/cover',
        component: 'Home/Cover/Cover',
      },
      {
        name: 'Motto',
        path: '/motto',
        component: 'Home/Motto/Motto',
      },
      {
        name: 'Open Source',
        path: '/open-source',
        component: 'Home/OpenSource/OpenSource',
      },
    ],
  },
  {
    name: 'Music',
    path: '/music',
    icon: <Headset />,
    routes: [
      {
        name: 'Best Album',
        path: '/best-album',
        component: 'Music/BestAlbum/BestAlbum',
      },
      {
        name: 'Live Tour',
        path: '/live-tour',
        component: 'Music/LiveTour/LiveTour',
      },
      {
        name: 'Player',
        path: '/player',
        component: 'Music/Player/Player',
      },
      {
        name: 'Yancey Music',
        path: '/yancey-music',
        component: 'Music/YanceyMusic/YanceyMusic',
      },
    ],
  },
  {
    name: 'Post',
    path: '/post',
    icon: <PostAdd />,
    component: 'Post/PostList',
    routes: [
      {
        name: 'Post Editor',
        path: '/post/edit',
        component: 'Post/PostEditor',
        hideInMenu: true,
      },
    ],
  },
  {
    name: 'Events',
    path: '/events',
    icon: <Event />,
    routes: [
      {
        name: 'Agenda',
        path: '/events/agenda',
        component: 'Events/Agenda',
      },
    ],
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: <Settings />,
    routes: [
      {
        name: 'Profile',
        path: '/settings/profile',
        component: 'Settings/Profile/Profile',
      },
      {
        name: 'Account',
        path: '/settings/account',
        component: 'Settings/Account/Account',
      },
      {
        name: 'Security',
        path: '/settings/security',
        component: 'Settings/Security/Security',
      },
      {
        name: 'Global Config',
        path: '/settings/global-config',
        component: 'Settings/GlobalConfig/GlobalConfig',
      },
    ],
  },
]

export function mapRoutes() {
  const routers: MappedRoute[] = []

  routes.forEach((route) => {
    routers.push({
      path: route.path,
      component: route.component as string,
    })

    if (route.routes) {
      route.routes.forEach((routeChild) => {
        if (!routeChild.isExternalLink) {
          routers.push({
            path: routeChild.path,
            component: routeChild.component as string,
          })
        }
      })
    }
  })

  return routers
}

export default routes
