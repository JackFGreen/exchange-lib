import { setCSS } from './dom'

const FullMask = {
  el: document.createElement('div'),
  id: 'FullMask'
}

const OPTION_BACKGROUND = 'rgba(255, 255, 255, 0.2)'
const OPTION_ZINDEX = '999'
const OPTION_SHOWTIME = 50

const opt = {
  background: OPTION_BACKGROUND,
  zIndex: OPTION_ZINDEX,
  showTime: OPTION_SHOWTIME
}

_init()

function _init () {
  FullMask.el.id = FullMask.id
  setCSS(FullMask.el, {
    position: 'fixed',
    left: '0',
    top: '0',
    width: '100%',
    height: '100%'
  })
  config()
}

/**
 * config
 * @param {String} background css background
 * @param {String} zIndex css z-index
 * @param {Number} showTime ms insert FullMask DOM only when (removeTime - insertTime > showTime)
 */
function config ({
  background = OPTION_BACKGROUND,
  zIndex = OPTION_ZINDEX,
  showTime = OPTION_SHOWTIME
} = opt) {
  setCSS(FullMask.el, {
    background,
    zIndex
  })

  FullMask.showTime = showTime
}

let diffTime = 0
let insertTime = 0
let removeTime = 0
let runTimer = null

function insert () {
  insertTime = Date.now()

  clearTimeout(runTimer)
  runTimer = setTimeout(() => {
    document.body.appendChild(FullMask.el)
  }, FullMask.showTime)
}

function remove () {
  removeTime = Date.now()
  diffTime = removeTime - insertTime
  if (diffTime <= FullMask.showTime) {
    clearTimeout(runTimer)
  } else {
    const parentNode = FullMask.el.parentNode
    if (parentNode) {
      parentNode.removeChild(FullMask.el)
    } else {
      setTimeout(() => {
        FullMask.el.parentNode.removeChild(FullMask.el)
      }, 0)
    }
  }
}

export default {
  config,
  insert,
  remove
}
