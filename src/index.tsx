import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Router } from 'react-router-dom'
import history from 'shared/history'
import * as serviceWorker from 'serviceWorker'

import { library } from '@fortawesome/fontawesome-svg-core'
import fontAwesomes from 'shared/fontAwesome'
import Layouts from 'layouts/Layouts'

library.add(...fontAwesomes)
ReactDOM.render(
  <BrowserRouter>
    <Router history={history}>
      <Layouts />
    </Router>
  </BrowserRouter>,
  document.getElementById('root'),
)
serviceWorker.unregister()
