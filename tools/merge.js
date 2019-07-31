import * as tcheck from './tcheck'

/**
 * 合并
 * merge(obj1, obj2, ...)
 * merge(true, obj1, obj2, ...)
 */
function isArrObj (i) {
  return tcheck.isArray(i) || tcheck.isObject(i)
}
export default function merge (obj1, obj2) {
  const arr =
    obj1 === true ? Array.prototype.slice.call(arguments, 1) : Array.prototype.slice.call(arguments)

  let obj = {}
  let i = 0
  const len = arr.length

  if (obj1 !== true) {
    obj = arr[0]
    i++
  }

  for (; i < len; i++) {
    const el = arr[i]
    loop(obj, el)
  }

  function loop (obj, el) {
    for (const k in el) {
      if (typeof el[k] === 'object') {
        // !{} | ![]
        if (!isArrObj(el[k]) || (obj1 !== true && !isArrObj(obj[k]))) {
          obj[k] = el[k]
        } else {
          // Array | Object
          // 深拷贝
          if (obj1 === true && !isArrObj(obj[k])) {
            obj[k] = tcheck.isArray(el[k]) ? [] : {}
          }

          // 浅拷贝
          loop(obj[k], el[k])
        }
        continue
      }
      obj[k] = el[k]
    }
  }

  return obj
}
