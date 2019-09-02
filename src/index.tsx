import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import * as serviceWorker from 'serviceWorker'

import { library } from '@fortawesome/fontawesome-svg-core'
import fontAwesomes from 'shared/fontAwesome'
import Layouts from 'layouts/Layouts'

library.add(...fontAwesomes)
ReactDOM.render(
  <BrowserRouter>
    <Layouts />
  </BrowserRouter>,
  document.getElementById('root'),
)
serviceWorker.unregister()
