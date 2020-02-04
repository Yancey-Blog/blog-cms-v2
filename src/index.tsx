import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route, Redirect, Router } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import CssBaseline from '@material-ui/core/CssBaseline'
import { SnackbarProvider } from 'notistack'
import * as serviceWorker from './serviceWorker'
import client from './shared/apolloClient'
import history from './shared/history'
import { SnackbarUtilsConfigurator } from './components/Toast/Toast'
import Login from 'src/pages/Login/Login'
import Register from 'src/pages/Register/Register'
import Layouts from 'src/pages/Layouts/Layouts'

serviceWorker.unregister()

ReactDOM.render(
  <ApolloProvider client={client}>
    <SnackbarProvider
      maxSnack={1}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
      autoHideDuration={3000}
    >
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
    </SnackbarProvider>
  </ApolloProvider>,
  document.getElementById('root'),
)
