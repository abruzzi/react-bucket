import {createStore, compose, applyMiddleware} from 'redux'
import {syncHistoryWithStore, routerMiddleware} from 'react-router-redux'
import thunk from 'redux-thunk'
import {browserHistory} from 'react-router'
import {promiseMiddleware} from 'utils'
import rootReducer from './reducers'

const routingMiddleware = routerMiddleware(browserHistory)
const middlewares = [thunk, routingMiddleware, promiseMiddleware]
const isClient = typeof document !== 'undefined'
const isDeveloping = process.env.NODE_ENV !== 'production'
let storeInstance = null

const enhancers = []

if (isClient && isDeveloping) {
  const devToolsExtension = window.devToolsExtension
  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension())
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middlewares),
  ...enhancers,
)

function configureStore(initialState) {
  storeInstance = createStore(
    rootReducer,
    initialState,
    composedEnhancers,
  )
  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers') // eslint-disable-line
      storeInstance.replaceReducer(nextReducer)
    })
  }
  return storeInstance
}

export const getStoreInstance = function (initialState) {
  return storeInstance || configureStore(initialState)
}

export const history = syncHistoryWithStore(browserHistory, getStoreInstance())


if (isDeveloping && isClient) {
  const loggerMiddleware = require('redux-logger').default // eslint-disable-line
  middlewares.push(loggerMiddleware)
}
