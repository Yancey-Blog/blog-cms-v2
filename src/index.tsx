import React from 'react'
import ReactDOM from 'react-dom'
import * as serviceWorker from 'serviceWorker'

import { library } from '@fortawesome/fontawesome-svg-core'
import fontAwesomes from 'shared/fontAwesome'
import Layouts from 'layouts/Layouts'

library.add(...fontAwesomes)
ReactDOM.render(<Layouts />, document.getElementById('root'))
serviceWorker.unregister()
