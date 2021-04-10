import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
//import dotenv from 'dotenv-safe'
import Routes from './config/routers/index'
import * as serviceWorker from './serviceWorker'
import './global.css'
//import * as dotenv from 'dotenv'
//dotenv.config()

//dotenv.config()
ReactDOM.render(
  <BrowserRouter>
    <Routes />
  </BrowserRouter>,
  document.getElementById('root')
)

// Setting lazy loading, all imagens static of system

/*
 <React.StrictMode>
    <App />
  </React.StrictMode>,
*/
// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
