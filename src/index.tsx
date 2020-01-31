import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import { library } from '@fortawesome/fontawesome-svg-core'
import CssBaseline from '@material-ui/core/CssBaseline'
import { SnackbarProvider } from 'notistack'
import * as serviceWorker from './serviceWorker'
import fontAwesomes from './shared/fontAwesome'
import client from './shared/apolloClient'
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
      <BrowserRouter>
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
      </BrowserRouter>
    </SnackbarProvider>
  </ApolloProvider>,
  document.getElementById('root'),
)
