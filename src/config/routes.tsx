import React, { ReactElement } from 'react'
import {
  // Dashboard,
  Home,
  Headset,
  PostAdd,
  Settings,
  Event,
} from '@material-ui/icons'

export interface Route {
  name: string
  path: string
  icon: ReactElement
  component?: string
  routes?: Array<{
    hideInMenu?: boolean
    name: string
    path: string
    component: string
  }>
}

const routes: Route[] = [
  // {
  //   name: 'Dashboard',
  //   path: '/dashboard',
  //   icon: <Dashboard />,
  //   component: 'DashBoard/DashBoard',
  // },
  {
    name: 'Home',
    path: '/home',
    icon: <Home />,
    routes: [
      {
        name: 'Motto',
        path: '/motto',
        component: 'Home/Motto/Motto',
      },
      {
        name: 'Announcement',
        path: '/announcement',
        component: 'Home/Announcement/Announcement',
      },
      {
        name: 'Open Source',
        path: '/open-source',
        component: 'Home/OpenSource/OpenSource',
      },
      // {
      //   name: 'Cover',
      //   path: '/cover',
      //   component: 'Home/Cover/Cover',
      // },
    ],
  },
  {
    name: 'Music',
    path: '/music',
    icon: <Headset />,
    routes: [
      {
        name: 'Live Tour',
        path: '/live-tour',
        component: 'Music/LiveTour/LiveTour',
      },
      {
        name: 'Best Album',
        path: '/best-album',
        component: 'Music/BestAlbum/BestAlbum',
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
        name: 'Post Config',
        path: '/post/config',
        component: 'Post/PostConfig',
        hideInMenu: true,
      },
    ],
  },
  {
    name: 'Agenda',
    path: '/agenda',
    icon: <Event />,
    component: 'Agenda/Agenda',
  },
  {
    name: 'Settings',
    path: '/settings',
    icon: <Settings />,
    component: 'Settings/Settings',
    // routes: [
    //   {
    //     name: 'Profile',
    //     path: '/settings/profile',
    //     component: 'Settings/Profile/Profile',
    //     hideInMenu: true,
    //   },
    //   {
    //     name: 'Account',
    //     path: '/settings/account',
    //     component: 'Settings/Account/Account',
    //     hideInMenu: true,
    //   },
    //   {
    //     name: 'Security',
    //     path: '/settings/security',
    //     component: 'Settings/Security/Security',
    //     hideInMenu: true,
    //   },
    // ],
  },
]

export default routes
