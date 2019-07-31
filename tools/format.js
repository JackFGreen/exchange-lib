/**
 * @FileDesc: format
 * @Author: Jack
 * @Date: 2018-05-08 22:05:52
 * @Last Modified by: Jack
 * @Last Modified time: 2019-06-26 21:35:08
 */
const addZero = num => (num < 10 ? '0' + num : num)

function getDate (timestamp = 0) {
  const date = new Date(Number(timestamp))
  return date
}
export function getMon (timestamp = 0, digit = 0) {
  const date = getDate(timestamp)
  let month = date.getMonth() + 1
  if (digit && month < 10) {
    month = '0' + month
  }
  return month
}
export function getYear (timestamp = 0) {
  const date = getDate(timestamp)
  const year = date.getFullYear()
  return year
}
export function getDay (timestamp = 0, digit = 0) {
  const date = getDate(timestamp)
  let day = date.getDate()
  if (digit && day < 10) {
    day = '0' + day
  }
  return day
}
export function getHour (timestamp = 0) {
  const date = getDate(timestamp)
  const hour = addZero(date.getHours())
  return hour
}
export function getMin (timestamp = 0) {
  const date = getDate(timestamp)
  const min = addZero(date.getMinutes())
  return min
}
export function getSec (timestamp = 0) {
  const date = getDate(timestamp)
  const sec = addZero(date.getSeconds())
  return sec
}
/**
 * 时间戳 转换为 时间
 * timestamp => 22:22:22
 */
export const time = (timestamp = 0) => {
  const hour = getHour(timestamp)
  const min = getMin(timestamp)
  const sec = getSec(timestamp)
  return `${hour}:${min}:${sec}`
}
/**
 * 时间戳 转换为 日期
 * timestamp => 2018-06-01
 */
export const date = function (timeYmd = 0, symbol = '-') {
  const newdate = new Date(Number(timeYmd))
  const year = addZero(newdate.getFullYear())
  const month = addZero(newdate.getMonth() + 1)
  const dateTime = addZero(newdate.getDate())
  return `${year}${symbol}${month}${symbol}${dateTime}`
}

export const getLastHour = time => {
  return Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
}

export const getLastMin = time => {
  return Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
}

export const getLastSec = time => {
  return Math.floor((time % (1000 * 60)) / 1000)
}
/**
 * 获取英文月份
 */
export const enMonth = function (timestamp) {
  let month = new Date(Number(timestamp)).toDateString().split(' ')[1]
  let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  for (let i = 0; i < months.length; i++) {
    if (months[i].indexOf(month) !== -1) {
      return months[i]
    }
  }
}
