import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route, Redirect, Router } from 'react-router-dom'
import loadable from '@loadable/component'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ApolloProvider } from '@apollo/react-hooks'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import { SnackbarProvider } from 'notistack'
import * as serviceWorker from './serviceWorker'
import { SnackbarUtilsConfigurator } from './components/Toast/Toast'
import Login from './pages/Login/Login'
import Register from './pages/Register/Register'
import Loading from './components/Loading/InstagramLoading'
import client from './shared/apolloClient'
import history from './shared/history'
import {
  snackbarAnchorOrigin,
  snackbarMaxNum,
  snackbarAutoHideDuration,
} from './shared/constants'
import './assets/global.scss'

const Layouts = loadable(() => import('./pages/Layouts/Layouts'), {
  fallback: <Loading />,
})

serviceWorker.unregister()

ReactDOM.render(
  <ApolloProvider client={client}>
    <SnackbarProvider
      maxSnack={snackbarMaxNum}
      anchorOrigin={snackbarAnchorOrigin}
      autoHideDuration={snackbarAutoHideDuration}
    >
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <SnackbarUtilsConfigurator />
        <CssBaseline />
        <Router history={history}>
          <Switch>
            <Route path="/login">
              <Login />
            </Route>
            <Route path="/register">
              <Register />
            </Route>
            <Route
              path="/"
              render={({ location }) =>
                window.localStorage.getItem('token') ? (
                  <Layouts />
                ) : (
                  <Redirect
                    to={{
                      pathname: '/login',
                      state: { from: location },
                    }}
                  />
                )
              }
            />
          </Switch>
        </Router>
      </MuiPickersUtilsProvider>
    </SnackbarProvider>
  </ApolloProvider>,
  document.getElementById('root'),
)
