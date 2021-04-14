import { StrictMode, FC } from 'react'
import { Switch, Route, Router } from 'react-router-dom'
import CssBaseline from '@material-ui/core/CssBaseline'
import { ApolloProvider } from '@apollo/client'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import LuxonUtils from '@date-io/luxon'
import { SnackbarProvider } from 'notistack'
import { SnackbarUtilsConfigurator } from './components/Toast/Toast'
import Login from './pages/Auth/Login'
import Register from './pages/Auth/Register'
import Guard from './pages/Auth/Guard'
import client from './graphql/apolloClient'
import history from './shared/history'
import {
  SNACKBAR_ANCHOR_ORIGIN,
  SNACKBAR_MAX_NUM,
  SNACKBAR_AUTO_HIDE_DURATION,
} from './shared/constants'
import './assets/global.scss'

const App: FC = () => {
  return (
    <StrictMode>
      <ApolloProvider client={client}>
        <SnackbarProvider
          maxSnack={SNACKBAR_MAX_NUM}
          anchorOrigin={SNACKBAR_ANCHOR_ORIGIN}
          autoHideDuration={SNACKBAR_AUTO_HIDE_DURATION}
        >
          <MuiPickersUtilsProvider utils={LuxonUtils}>
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
                <Guard />
              </Switch>
            </Router>
          </MuiPickersUtilsProvider>
        </SnackbarProvider>
      </ApolloProvider>
    </StrictMode>
  )
}

export default App
