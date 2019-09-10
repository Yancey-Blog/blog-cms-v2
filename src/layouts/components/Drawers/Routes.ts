export interface BaseRoute {
  name: string
  path: string
}

export interface Route extends BaseRoute {
  icon: string
  children: BaseRoute[]
}

const routes: Route[] = [
  {
    name: 'Dashboard',
    path: '/dashboard',
    icon: 'tachometer-alt',
    children: [],
  },
  {
    name: 'Home',
    path: '/home',
    icon: 'home',
    children: [
      {
        name: 'Motto',
        path: '/home/motto',
      },
      {
        name: 'Announcement',
        path: '/home/announcement',
      },
      {
        name: 'Project',
        path: '/home/project',
      },
      {
        name: 'Cover',
        path: '/home/cover',
      },
    ],
  },
  {
    name: 'Music',
    path: '/music',
    icon: 'headphones-alt',
    children: [
      {
        name: 'Live Tours',
        path: '/music/liveTours',
      },
      {
        name: 'Featured Records',
        path: 'v/featuredRecords',
      },
      {
        name: 'Player',
        path: '/music/player',
      },
      {
        name: 'Yancey Music',
        path: '/music/yanceyMusic',
      },
    ],
  },
  {
    name: 'Article',
    path: '/article',
    icon: 'blog',
    children: [],
  },
  {
    name: 'CV',
    path: '/cv',
    icon: 'kiss-wink-heart',
    children: [],
  },
  {
    name: 'About',
    path: '/about',
    icon: 'cog',
    children: [],
  },
  {
    name: 'Setting',
    path: '/setting',
    icon: 'cog',
    children: [],
  },
]

export default routes
