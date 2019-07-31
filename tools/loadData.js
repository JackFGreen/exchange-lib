import { getClientHeight, getOffsetHeight, getScrollTop } from './dom'
import { isFunction, isString } from './tcheck'

const EVENT_SCROLL = 'scroll'
const SCROLL_DOWN = 'down'
const SCROLL_UP = 'up'

let scrollListener = null

const scrollAction = {
  dir: '',
  x: 0,
  y: 0
}

export const loadBottom = ({ wrap, cont, loader, endCb } = {}) => {
  const docEl = document.documentElement
  loadBottom.wrap = wrap || docEl
  loadBottom.cont = cont || docEl
  createLoader(loader)

  scrollAction.y = getScrollTop(loadBottom.wrap)

  scrollListener = () => {
    const wrapHeight = getClientHeight(loadBottom.wrap)
    const contHeight = getOffsetHeight(loadBottom.cont)

    const scrollTop = getScrollTop(loadBottom.wrap)
    const diffY = scrollAction.y - scrollTop
    if (diffY < 0) {
      scrollAction.dir = SCROLL_DOWN
    }
    if (diffY > 0) {
      scrollAction.dir = SCROLL_UP
    }
    scrollAction.y = scrollTop

    const diffHeight = contHeight - scrollTop - wrapHeight
    // console.log(scrollAction)
    // console.log(`contHeight: ${contHeight}, wrapHeight: ${wrapHeight}, scrollTop: ${scrollTop}, diffHeight: ${diffHeight}`)

    // need <= in ios
    if (diffHeight <= 0 && scrollAction.dir === SCROLL_DOWN) {
      // if loading do nothing
      if (!loadBottom.isLoading) {
        loadBottom.loading()
        if (isFunction(endCb)) endCb()
      }
    }
  }

  window.addEventListener(EVENT_SCROLL, scrollListener, false)
}

loadBottom.wrap = null
loadBottom.cont = null

loadBottom.destroyed = () => {
  window.removeEventListener(EVENT_SCROLL, scrollListener, false)
  loadBottom.unloading()
  scrollListener = null
  loadBottom.wrap = null
  loadBottom.cont = null
}

loadBottom.isLoading = false
loadBottom.loading = () => {
  loadBottom.isLoading = true
  loadBottom.cont.appendChild(loadBottom.loader)
  const contHeight = getOffsetHeight(loadBottom.cont)

  if (loadBottom.wrap.scrollTo) {
    loadBottom.wrap.scrollTo(0, contHeight)
    return
  }
  if (loadBottom.wrap.scrollTop) {
    loadBottom.wrap.scrollTop = contHeight
  }
}
loadBottom.unloading = () => {
  loadBottom.isLoading = false
  const loader = document.querySelector('.load-bottom__loader')
  if (loader) loadBottom.cont.removeChild(loader)
}

const LOADER_HEIGHT = '30px'
function createLoader (cus) {
  const loader = document.createElement('div')
  loader.className = 'load-bottom__loader'
  loader.style.height = LOADER_HEIGHT
  loader.style.lineHeight = LOADER_HEIGHT
  loader.style.textAlign = 'center'
  loader.style.fontSize = '12px'

  if (isString(cus)) {
    loader.innerHTML = cus
  } else if (typeof cus === 'object') {
    loader.appendChild(cus)
  } else {
    const loaderCont = document.createTextNode('加载中...')
    loader.appendChild(loaderCont)
  }

  loadBottom.loader = loader
}
