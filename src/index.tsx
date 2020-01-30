import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import { library } from '@fortawesome/fontawesome-svg-core'
import CssBaseline from '@material-ui/core/CssBaseline'
import { SnackbarProvider } from 'notistack'
import * as serviceWorker from './serviceWorker'
import fontAwesomes from './shared/fontAwesome'
import client from './shared/apolloClient'
import Layouts from './pages/Layouts/Layouts'
import Login from './pages/Login/Login'

library.add(...fontAwesomes)
serviceWorker.unregister()

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <SnackbarProvider
        maxSnack={1}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        autoHideDuration={2000}
      >
        <CssBaseline />
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/" component={Layouts} />
        </Switch>
      </SnackbarProvider>
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
)
