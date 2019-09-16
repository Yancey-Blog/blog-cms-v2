import React from 'react'
import ReactDOM from 'react-dom'
import { ConnectedRouter } from 'connected-react-router'
import * as serviceWorker from 'serviceWorker'
import { Provider } from 'react-redux'
import { library } from '@fortawesome/fontawesome-svg-core'
import configureStore from 'stores/configureStore'
import history from 'shared/history'
import fontAwesomes from 'shared/fontAwesome'
import Layouts from 'layouts/Layouts'

// import Login from 'pages/Login/Login'

const store = configureStore()
library.add(...fontAwesomes)
serviceWorker.unregister()

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <Layouts />
      {/* <Login /> */}
    </ConnectedRouter>
  </Provider>,
  document.getElementById('root'),
)
