import React, { StrictMode } from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route, Redirect, Router } from 'react-router-dom'
import loadable from '@loadable/component'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ApolloProvider } from '@apollo/client'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import { SnackbarProvider } from 'notistack'
import * as serviceWorkerRegistration from './serviceWorkerRegistration'
import { SnackbarUtilsConfigurator } from './components/Toast/Toast'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Loading from './components/Loading/InstagramLoading'
import client from './graphql/apolloClient'
import reportWebVitals from './reportWebVitals'
import history from './shared/history'
import {
  SNACKBAR_ANCHOR_ORIGIN,
  SNACKBAR_MAX_NUM,
  SNACKBAR_AUTO_HIDE_DURATION,
} from './shared/constants'
import './assets/global.scss'

const Layouts = loadable(() => import('./pages/Layouts/Layouts'), {
  fallback: <Loading />,
})

ReactDOM.render(
  <StrictMode>
    <ApolloProvider client={client}>
      <SnackbarProvider
        maxSnack={SNACKBAR_MAX_NUM}
        anchorOrigin={SNACKBAR_ANCHOR_ORIGIN}
        autoHideDuration={SNACKBAR_AUTO_HIDE_DURATION}
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
    </ApolloProvider>
  </StrictMode>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
