import * as types from '../../constants'

export const initialState = {
  orders: {},
  error: null,
  success: null,
  failed: null
}

const ProductsReducer =
  (state = initialState, action) => {
    switch (action.type) {
      case types.GET_PRODUCTS_REQUEST:
        return Object.assign({}, state, {
          ...state,
          success: null,
          failed: null,
        })
      case types.GET_PRODUCTS_SUCCESS:
        return Object.assign({}, state, {
          ...state,
          products: action.req.data,
          success: true,
          failed: false
        })
      case types.GET_PRODUCTS_FAILURE:
        return Object.assign({}, state, {
          ...state,
          success: false,
          failed: true,
          error: action.error.data
        })
      default:
        return state
    }
  }

export default ProductsReducer
