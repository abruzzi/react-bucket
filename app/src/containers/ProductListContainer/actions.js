import httpClient from '../../utils/http'
import * as types from '../../constants'

export const getProducts = (params) => ({
  type: types.GET_PRODUCTS,
  promise: httpClient.get('/products', {params})
})
