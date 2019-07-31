/**
 * 设置 css
 * @param {Object} el DOM
 * @param {Object} styleObj 样式对象
 * setCSS(el, { width: '100%' })
 */
export function setCSS (el, styleObj) {
  for (const k in styleObj) {
    if (styleObj.hasOwnProperty(k)) {
      const val = styleObj[k]
      el.style[k] = val
    }
  }
}

/**
 * 获取第一个 input
 * @param {DOM} el dom
 */
export function getInputEl (el) {
  const isInput = el instanceof window.HTMLInputElement
  if (!isInput) {
    el = el.querySelector('input')
  }
  return el
}

/**
 * new image
 * @param {String} url img url
 * @param {Function} onload img load callback
 */
export function newImg (url, onload) {
  const img = new window.Image()
  img.src = url
  img.onload = onload(img)
}

/**
 * <a> download
 * @param {DOM} el <a> tag
 * @param {String} url url
 * @param {String} name download name
 */
export function download (el, url, name) {
  el.href = url
  el.download = name
}

export function getOffsetHeight (el) {
  return el.offsetHeight
}
export function getClientHeight (el) {
  return el.clientHeight
}
export function getScrollTop (el) {
  if (el === document.documentElement || el === document.body) {
    return document.documentElement.scrollTop || document.body.scrollTop
  }
  return el.scrollTop
}
