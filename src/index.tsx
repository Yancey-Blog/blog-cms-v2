import ReactDOM from 'react-dom'
import { Switch, Route, Redirect, Router } from 'react-router-dom'
import loadable from '@loadable/component'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ApolloProvider } from '@apollo/client'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import MomentUtils from '@date-io/moment'
import { SnackbarProvider } from 'notistack'
import * as serviceWorker from './serviceWorker'
import { SnackbarUtilsConfigurator } from './components/Toast/Toast'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Loading from './components/Loading/InstagramLoading'
import client from './graphql/apolloClient'
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

serviceWorker.unregister()

ReactDOM.render(
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
  </ApolloProvider>,
  document.getElementById('root'),
)
