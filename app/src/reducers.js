import {combineReducers} from 'redux'
import {routerReducer} from 'react-router-redux'

import productListReducer from './containers/ProductListContainer/reducers'

const rootReducer = combineReducers({
  routing: routerReducer,
  productListReducer
})

export default rootReducer
