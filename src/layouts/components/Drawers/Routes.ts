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
    name: 'Dashborad',
    path: '/dashborad',
    icon: 'tachometer-alt',
    children: [],
  },
  {
    name: 'Home',
    path: '/',
    icon: 'home',
    children: [
      {
        name: 'Motto',
        path: '/motto',
      },
      {
        name: 'Announcement',
        path: '/announcement',
      },
      {
        name: 'Project',
        path: '/project',
      },
      {
        name: 'Cover',
        path: '/cover',
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
        path: '/liveTours',
      },
      {
        name: 'Featured Records',
        path: '/featuredRecords',
      },
      {
        name: 'Player',
        path: '/player',
      },
      {
        name: 'Yancey Music',
        path: '/yanceyMusic',
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
