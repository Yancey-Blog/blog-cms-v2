import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Router } from 'react-router-dom'
import * as serviceWorker from 'serviceWorker'
import { Provider } from 'react-redux'
import { library } from '@fortawesome/fontawesome-svg-core'
import configureStore from 'stores/configureStore'
import history from 'shared/history'
import fontAwesomes from 'shared/fontAwesome'
import Layouts from 'layouts/Layouts'

// import Login from 'containers/Login/Login'

const store = configureStore()
library.add(...fontAwesomes)
serviceWorker.unregister()

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Router history={history}>
        <Layouts />
      </Router>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
)
