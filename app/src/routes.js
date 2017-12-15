import AppContainer from './containers/AppContainer'

const errorLoading = _ => _ // console.error('Dynamic loading failed' + err)

const loadRoute = cb =>
  module => cb(null, module.default)


export const routes = {
  component: AppContainer,
  path: '/',
  indexRoute: {
    getComponent(location, callback) {
      import('./containers/LandingPageContainer')
        .then(loadRoute(callback))
        .catch(err => errorLoading(err))
    }
  },
  childRoutes: [
    {
      path: '/products',
      getComponent(location, callback) {
        import('./containers/ProductListContainer')
          .then(loadRoute(callback))
          .catch(err => errorLoading(err))
      }
    },
    {
      path: '*',
      getComponent(location, callback) {
        import('./containers/NotFound') // eslint-disable-line block-scoped-var
          .then(loadRoute(callback))
          .catch(err => errorLoading(err))
      }
    }
  ]
}
