import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { ApolloProvider } from '@apollo/react-hooks'
import { library } from '@fortawesome/fontawesome-svg-core'
import * as serviceWorker from './serviceWorker'
import fontAwesomes from './shared/fontAwesome'
import client from './shared/ApolloClient'
import Layouts from './pages/Layouts/Layouts'

library.add(...fontAwesomes)
serviceWorker.unregister()

ReactDOM.render(
  <ApolloProvider client={client}>
    <BrowserRouter>
      <Layouts />
    </BrowserRouter>
  </ApolloProvider>,
  document.getElementById('root'),
)
