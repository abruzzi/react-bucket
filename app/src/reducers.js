import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import mobile from './containers/ProductListContainer/reducers'

const rootReducer = combineReducers({
  routing: routerReducer,
  mobile
})

export default rootReducer
