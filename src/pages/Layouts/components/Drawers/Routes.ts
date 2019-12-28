interface Route {
  name: string
  path: string
  icon: string
  component?: string
  children?: Array<{ hideInMenu?: boolean; name: string; path: string; component: string }>
}

const routes: Route[] = [
  {
    name: 'Dashboard',
    path: 'dashboard',
    icon: 'tachometer-alt',
    component: 'DashBoard/DashBoard',
  },
  {
    name: 'Home',
    path: 'home',
    icon: 'home',
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
    icon: 'headphones-alt',
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
    icon: 'blog',
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
    icon: 'kiss-wink-heart',
    component: 'CV/CV',
  },
  {
    name: 'Setting',
    path: 'setting',
    icon: 'cog',
    component: 'Setting/Setting',
  },
]

export default routes
