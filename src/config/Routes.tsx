import React, { ReactElement } from 'react'
import {
  Dashboard,
  Home,
  Headset,
  Settings,
  PostAdd,
  LinkedIn,
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
  {
    name: 'Dashboard',
    path: 'dashboard',
    icon: <Dashboard />,
    component: 'DashBoard/DashBoard',
  },
  {
    name: 'Home',
    path: 'home',
    icon: <Home />,
    children: [
      {
        name: 'Motto',
        path: 'motto',
        component: 'Home/Motto',
      },
      {
        name: 'Announcement',
        path: 'announcement',
        component: 'Home/Announcement',
      },
      {
        name: 'Open Source',
        path: 'open-source',
        component: 'Home/OpenSource',
      },
      {
        name: 'Cover',
        path: 'cover',
        component: 'Home/Cover',
      },
    ],
  },
  {
    name: 'Music',
    path: 'music',
    icon: <Headset />,
    children: [
      {
        name: 'Live Tour',
        path: 'live-tour',
        component: 'Music/LiveTour',
      },
      {
        name: 'Best Album',
        path: 'best-album',
        component: 'Music/BestAlbum',
      },
      {
        name: 'Player',
        path: 'player',
        component: 'Music/Player',
      },
      {
        name: 'Yancey Music',
        path: 'yancey-music',
        component: 'Music/YanceyMusic',
      },
    ],
  },
  {
    name: 'Article',
    path: 'article-list',
    icon: <PostAdd />,
    component: 'Article/ArticleList',
    children: [
      {
        name: 'Article Detail',
        path: 'article-detail',
        component: 'Article/ArticleDetail',
        hideInMenu: true,
      },
    ],
  },
  {
    name: 'CV',
    path: 'cv',
    icon: <LinkedIn />,
    component: 'CV/CV',
  },
  {
    name: 'Setting',
    path: 'setting',
    icon: <Settings />,
    component: 'Setting/Setting',
  },
]

export default routes
