import React from 'react'
import ReactDOM from 'react-dom'
import { Switch, Route, Redirect, Router } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import { library } from '@fortawesome/fontawesome-svg-core'
import CssBaseline from '@material-ui/core/CssBaseline'
import { SnackbarProvider } from 'notistack'
import * as serviceWorker from './serviceWorker'
import fontAwesomes from './shared/fontAwesome'
import client from './shared/apolloClient'
import history from './shared/history'
import { SnackbarUtilsConfigurator } from './components/Toast/Toast'
import Layouts from './pages/Layouts/Layouts'
import Login from './pages/Login/Login'

library.add(...fontAwesomes)
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
