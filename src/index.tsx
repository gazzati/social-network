import * as serviceWorker from './serviceWorker'
import React from 'react'
import ReactDOM from 'react-dom'
import MainApp from './App'

ReactDOM.render(<MainApp/>, document.getElementById('root'))

serviceWorker.unregister()
