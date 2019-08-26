import React from 'react'
import ReactDOM from 'react-dom'
import Layouts from 'layouts/Layouts'
import * as serviceWorker from 'serviceWorker'
import 'shared/fontAwesome'

ReactDOM.render(<Layouts />, document.getElementById('root'))
serviceWorker.unregister()
