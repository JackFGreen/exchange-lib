/**
 * @FileDesc: 数值计算
 * @Author: Jack
 * @Date: 2018-05-15 16:34:23
 * @Last Modified by: Jack
 * @Last Modified time: 2019-06-26 21:22:34
 */
import Big from 'big.js'

export function newBig (x = 0) {
  const n = Number(x)
  return window.isNaN(n) ? new Big(0) : new Big(n)
}

/**
 * type: 1 四舍五入
 * type: 0 末尾舍去
 */
export const round = (x, n, type = 1) => {
  x = newBig(x)
  return x.round(n, type)
}

/**
 * 四舍五入，末尾补零
 */
export const toFixed = (x, n) => {
  n = typeof n === 'string' ? +n : n
  x = newBig(x)
  return x.toFixed(n)
}

/**
 * x
 */
export const times = (x, y) => {
  x = newBig(x)
  y = newBig(y)
  const r = x.times(y)
  return r
}

/**
 * /
 */
export const div = (x, y) => {
  x = newBig(x)
  y = newBig(y)
  const r = x.div(y)
  return r
}

/**
 * +
 */
export const plus = (x, y) => {
  x = newBig(x)
  y = newBig(y)
  const r = x.plus(y)
  return r
}

/**
 * -
 */
export const minus = (x, y) => {
  x = newBig(x)
  y = newBig(y)
  const r = x.minus(y)
  return r
}
/**
 * 数字三位加,
 */
export const toThousands = (num) => {
  let result = ''
  let counter = 0
  if (num % 1 !== 0) {
    let arr = num.toString().split('.')
    for (let i = arr[0].length - 1; i >= 0; i--) {
      counter++
      result = arr[0].charAt(i) + result
      if (!(counter % 3) && i !== 0) { result = ',' + result }
    }
    return result + '.' + arr[1]
  } else {
    num = (num || 0).toString()
    for (let i = num.length - 1; i >= 0; i--) {
      counter++
      result = num.charAt(i) + result
      if (!(counter % 3) && i !== 0) { result = ',' + result }
    }
    return result
  }
}
/**
 * 整数转几位小数，并截取固定位数，不四舍五入;
 */
export const digit = (num, n = 3) => {
  if (num % 1 === 0) {
    num = newBig(num)
    const r = num.toFixed(n)
    return r
  } else {
    if (num.toString().split('.')[1].length > n) {
      let reg = `^\\d+(\\.\\d{0,${n}})?`
      return new RegExp(reg).exec(num)[0]
    } else {
      num = newBig(num)
      const r = num.toFixed(n)
      return r
    }
  }
}
/**
 * 大于多少位的整数加小数位截取;
 */
export const cutOut = (num, n = 8) => {
  if (num % 1 === 0) {
    return num
  } else {
    if (num.toString().split('.')[1].length > n) {
      let reg = `^\\d+(\\.\\d{0,${n}})?`
      return new RegExp(reg).exec(num)[0]
    } else {
      return num
    }
  }
}
