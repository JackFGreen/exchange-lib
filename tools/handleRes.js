import { isFunction, isObject } from './tcheck'
import { CODE_SUCCESS } from '../constant'

/**
 * handle api response
 * @param {Object} res api response
 * @param {Object} options handler res
 * @param {Function} options.success
 * @param {Object} options.fail each code with handler { code: handler }
 * @param {Function|Boolean} options.error
 */
export default (successCode = CODE_SUCCESS) => {
  return async function (res, { success, fail = null, error = true } = {}) {
    const code = res.code

    if (isFunction(success) && code === successCode) {
      return success()
    }

    if (isObject(fail)) {
      const handler = fail[code]
      if (isFunction(handler)) {
        return handler()
      }
    }

    if (isFunction(error)) {
      return error()
    } else if (error) {
      window.noti.error({
        message: res.message
      })
    }
  }
}
