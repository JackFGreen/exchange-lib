/**
 * @FileDesc: 正则校验
 * @Author: Jack
 * @Date: 2018-05-11 11:15:39
 * @Last Modified by: Jack
 * @Last Modified time: 2019-04-15 17:33:59
 */

/**
 * 邮箱
 */
export function email (i) {
  const reg = /[\w!#$%&'*+/=?^_`{|}~-]+(?:\.[\w!#$%&'*+/=?^_`{|}~-]+)*@(?:[\w](?:[\w-]*[\w])?\.)+[\w](?:[\w-]*[\w])?/
  return reg.test(i)
}

/**
 * code
 */
export function code (i) {
  const reg = /^[0-9]{6}$/
  return reg.test(i)
}

/**
 * 密码
 */
export function password (i) {
  return i.length >= 8 && i.length <= 24
}

/**
 * 图片验证码
 */
export function captchaCode (i) {
  const reg = /^[a-zA-Z0-9]{4}$/
  return reg.test(i)
}

/**
 * 资金密码
 */
export function tradePassword (i) {
  const reg = /^[0-9]{6}$/
  return reg.test(i)
}

/**
 * 验证是否为空
 */
export function empty (i) {
  return !!i && i.replace(/\s/g, '') !== ''
}

/**
 * 验证姓名不能有数字
 */
export function name (i) {
  const regName = new RegExp('^[^\\d]+$')
  return !!i && regName.test(i)
}

/**
 * 验证手机号码
 */
export function mobile (i) {
  const reg = /^(13[0-9]|14[579]|15[0-3,5-9]|16[6]|17[0135678]|18[0-9]|19[89])\d{8}$/
  return reg.test(i)
}

/**
 * 验证电话号码（包括座机和手机）
 */
export function tel (i) {
  const regTel = new RegExp(
    '(^(0[0-9]{2,3}\\-?)?([2-9][0-9]{6,7})+(\\-?[0-9]{1,4})?$)|(^((\\(\\d{3}\\))|(\\d{3}\\-?))?(1[34578]\\d{9})$)'
  )

  return regTel.test(i) && !/-400/.test(i)
}

/**
 * 验证字符串不包含数字
 */
export function noNumber (i) {
  const regNoNumber = new RegExp('\\d+')

  return !regNoNumber.test(i)
}

/**
 * 验证身份证号
 */
export function idCard (i) {
  const regIdCard = new RegExp(
    '^[1-9]\\d{7}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}$|^[1-9]\\d{5}[1-9]\\d{3}((0\\d)|(1[0-2]))(([0|1|2]\\d)|3[0-1])\\d{3}(\\d|x|X)$'
  )

  return regIdCard.test(i)
}

/**
 * 验证日期（年月） 2016-08
 */
export function date (i) {
  const regDate = new RegExp('^[1-9]\\d{3}-((0?[1-9])|(1[0-2]))$')

  return regDate.test(i)
}

/**
 * 验证日期（年月日） 2016-08-01
 */
export function wholeDate (i) {
  const regWholeDate = new RegExp('\\d{4}-\\d{2}-\\d{2}')

  return regWholeDate.test(i)
}

/**
 * 验证金额
 */
export function money (i) {
  const regMoney = new RegExp('^[1-9]\\d*.\\d*$')

  return regMoney.test(i)
}

/**
 * 银行卡验证，最大 19 位数字
 */
export function bankcard (i) {
  const reg = new RegExp('^\\d{14,19}$')

  return reg.test(i)
}

/**
 * 车牌
 */
export function carid (i) {
  return /^[\u4e00-\u9fa5][A-Z0-9]{6}$/.test(i)
}

/**
 * 车架号
 */
export function carnum (i) {
  return /^[A-Z0-9]{17}$/.test(i)
}

/**
 * 0 | 正整数
 */
export function nonnegativeinteger (i) {
  return /^(?:0|[1-9]\d*)$/.test(i)
}

/**
 * img type
 * default: png|jpg|jpeg
 */
export function imgType (i, t = 'png|jpe?g') {
  const reg = new RegExp(`^image/(${t})$`)
  return reg.test(i)
}

/**
 * file size
 * default: 5 * 1024 * 1024 B
 */
export function sizeLt (i, s = 5 * 1024 * 1024) {
  return i > s
}
