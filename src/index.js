import React from 'react'
import ReactDOM from 'react-dom'
import './assets/main.css'
import * as serviceWorker from './serviceWorker'
import App from './components/App'

ReactDOM.render(<App />, document.getElementById('root'))

serviceWorker.unregister()
