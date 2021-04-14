import { FC } from 'react'
import { Route, Redirect, Prompt } from 'react-router-dom'
import loadable from '@loadable/component'
import Loading from 'src/components/Loading/InstagramLoading'

const Layouts = loadable(() => import('src/pages/Layouts/Layouts'), {
  fallback: <Loading />,
})

const Guard: FC = () => {
  return (
    <Route
      path="/"
      render={({ location }) =>
        window.localStorage.getItem('token') ? (
          <Layouts />
        ) : (
          <>
            <Prompt message="Are you sure you want to leave?" />

            <Redirect
              to={{
                pathname: '/login',
                state: { from: location },
              }}
            />
          </>
        )
      }
    />
  )
}

export default Guard
