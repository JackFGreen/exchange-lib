import { DEFAULT_MOBILE_CODE } from '../constant'

function email (param) {
  const regResult = /([\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*)(@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?)/.exec(
    param
  )

  if (regResult) {
    return regResult[1].substring(0, 3) + '*****' + regResult[2]
  }
  return ''
}

function mobile (param, prefix = '') {
  if (prefix && prefix !== DEFAULT_MOBILE_CODE) {
    return i18nMobile(param)
  }
  return chinaMobile(param)
}

function chinaMobile (param) {
  let t = ''
  if (param) {
    t = String(param)
  }
  const length = t.length
  return t.substr(0, 3) + '*****' + t.substr(length - 4, length)
}

function i18nMobile (param) {
  let t = ''
  if (param) {
    t = String(param)
  }
  const length = t.length
  return '*******' + t.substr(length - 4, length)
}

export default {
  email,
  mobile
}
