import React from 'react'
import { render } from 'react-dom'
import { Router, match } from 'react-router'
import { Provider } from 'react-redux'
import { install } from 'offline-plugin/runtime'

import { routes } from './routes'
import { getStoreInstance, history } from './store'
import '../styles/antd.less'
import '../styles/index.scss'

import 'assets/fonts/font_zck90zmlh7hf47vi.eot' // eslint-disable-line
import 'assets/fonts/font_zck90zmlh7hf47vi.svg' // eslint-disable-line
import 'assets/fonts/font_zck90zmlh7hf47vi.ttf' // eslint-disable-line
import 'assets/fonts/font_zck90zmlh7hf47vi.woff' // eslint-disable-line

const isProduction = process.env.NODE_ENV === 'production'
const store = getStoreInstance()

const RouterApp = props => (
  <Provider {...props} store={store}>
    <Router history={history} routes={routes} />
  </Provider>
)

match({ history, routes },
  (error, redirectLocation, renderProps) => { // eslint-disable-line
    if (error) {
      return console.error('Require.ensure error') // eslint-disable-line
    }
    render(<RouterApp {...renderProps} />, document.getElementById('app'))
  })

if (isProduction) {
  install()
} else {
  /* eslint-disable */
  if (module.hot) {
    module.hot.accept('./routes', () => {
      const NewRouterApp = require('./routes').default
      render(<NewRouterApp />, document.getElementById('app'))
    })
  }
  /* eslint-enable */
}
