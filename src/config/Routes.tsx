import React, { ReactElement } from 'react'
import {
  Dashboard,
  Home,
  Headset,
  Settings,
  PostAdd,
  LinkedIn,
  Event,
} from '@material-ui/icons'

interface Route {
  name: string
  path: string
  icon: ReactElement | string
  component?: string
  children?: Array<{
    hideInMenu?: boolean
    name: string
    path: string
    component: string
  }>
}

const routes: Route[] = [
  // {
  //   name: 'Dashboard',
  //   path: 'dashboard',
  //   icon: <Dashboard />,
  //   component: 'DashBoard/DashBoard',
  // },
  {
    name: 'Home',
    path: 'home',
    icon: <Home />,
    children: [
      {
        name: 'Motto',
        path: 'motto',
        component: 'Home/Motto/Motto',
      },
      {
        name: 'Announcement',
        path: 'announcement',
        component: 'Home/Announcement/Announcement',
      },
      {
        name: 'Open Source',
        path: 'open-source',
        component: 'Home/OpenSource/OpenSource',
      },
      // {
      //   name: 'Cover',
      //   path: 'cover',
      //   component: 'Home/Cover/Cover',
      // },
    ],
  },
  // {
  //   name: 'Music',
  //   path: 'music',
  //   icon: <Headset />,
  //   children: [
  //     {
  //       name: 'Live Tour',
  //       path: 'live-tour',
  //       component: 'Music/LiveTour/LiveTour',
  //     },
  //     {
  //       name: 'Best Album',
  //       path: 'best-album',
  //       component: 'Music/BestAlbum/BestAlbum',
  //     },
  //     {
  //       name: 'Player',
  //       path: 'player',
  //       component: 'Music/Player/Player',
  //     },
  //     {
  //       name: 'Yancey Music',
  //       path: 'yancey-music',
  //       component: 'Music/YanceyMusic/YanceyMusic',
  //     },
  //   ],
  // },
  // {
  //   name: 'Article',
  //   path: 'article-list',
  //   icon: <PostAdd />,
  //   component: 'Article/ArticleList/ArticleList',
  //   children: [
  //     {
  //       name: 'Article Detail',
  //       path: 'article-detail',
  //       component: 'Article/ArticleDetail/ArticleDetail',
  //       hideInMenu: true,
  //     },
  //   ],
  // },
  // {
  //   name: 'CV',
  //   path: 'cv',
  //   icon: <LinkedIn />,
  //   component: 'CV/CV',
  // },
  // {
  //   name: 'Setting',
  //   path: 'setting',
  //   icon: <Settings />,
  //   component: 'Setting/Setting',
  // },
  {
    name: 'Agenda',
    path: 'agenda',
    icon: <Event />,
    component: 'Agenda/Agenda',
  },
]

export default routes
