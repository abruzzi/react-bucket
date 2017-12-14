/* eslint-disable */
import {notification} from 'antd'
import {get} from 'lodash'

export default (interceptor) => {
  interceptor.response.use(function (response) {
      if (response.headers.authorization) {
        cookie.set('TOKEN', response.headers.authorization)
      }
      return response
    },
    function (error) {
      switch (error.status) {
        case 401:
          const code = get(error, 'data.code')
          if(code) {
            notification.open({
              message: '错误',
              description: authError + ',请重新登录'
            })
          }
          break
        default:
          break
      }
      if (!error.message) {
        error.message = '系统异常'
      }
      return Promise.reject(error)
    }
  )
}


/* eslint-enable */