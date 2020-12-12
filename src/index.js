import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import AppContainer from './AppContainer'
import store from './redux/store'
import { HashRouter as Router } from 'react-router-dom'
import { Provider } from 'react-redux'

ReactDOM.render(
   <React.StrictMode>
      <Provider store={store}>
         <Router>
            <AppContainer />
         </Router>
      </Provider>
   </React.StrictMode>,
   document.getElementById('root'),
)
