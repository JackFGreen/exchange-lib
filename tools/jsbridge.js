import d from 'dsbridge'
import { isFunction, isObject, isString } from './tcheck'
import { isAndroid, isIOS } from './platform'
console.log(d)

const SCHEME_HEAD = 'exchangescheme://'
const SCHEME_NATIVE = 'native/'
const SCHEME_H5 = 'h5/path?url='

export function getSchemeNativeUrl (url) {
  return SCHEME_HEAD + SCHEME_NATIVE + url
}

export function getSchemeWebUrl (url) {
  return SCHEME_HEAD + SCHEME_H5 + url
}

function callSync (method = '', content = {}) {
  const cont = handleParam(method, content)
  return d.call('callNativeSync', cont)
}

function callAsync (method = '', content = {}) {
  return new Promise((resolve, reject) => {
    try {
      const cont = handleParam(method, content)
      d.call('callNativeAsync', cont, resolve)
    } catch (err) {
      reject(err)
    }
  })
}

function setCont (cont) {
  return JSON.stringify(cont)
}

function getCont (cont) {
  return JSON.parse(cont)
}

function handleParam (method, content) {
  console.log(`method: ${method}`)
  console.log(content)
  return setCont({
    method,
    content
  })
}

function handleNativeCb (resp, { success, fail = null, error = true } = {}) {
  if (!resp) return
  const res = isString(resp) ? getCont(resp) : resp
  console.log('callback')
  console.log(res)
  return handleApiRes(res, { success, fail, error })
}

function handleApiRes (res, { success, fail = null, error = true } = {}) {
  const code = res.code
  if (isFunction(success) && code === 1) {
    return success(res)
  }

  if (isObject(fail)) {
    const handler = fail[code]
    if (isFunction(handler)) {
      return handler(res)
    }
  }

  if (isFunction(error)) {
    return error(res)
  } else if (error) {
    // jsbridge 会调用 app alert
    window.alert(res.msg)
  }
}
const jsbridge = {
  isApp () {
    const resp = this.sysInfo()
    return handleNativeCb(resp, {
      success: () => true
    }) || false
  },
  isAndrApp () {
    return this.isApp() && isAndroid()
  },
  isIosApp () {
    return this.isApp() && isIOS()
  },
  getUserInfo () {
    const resp = this.userInfo()
    return handleNativeCb(resp, {
      success: res => {
        return res.data
      }
    }) || {}
  },
  handleNativeCb,
  /**
   * sync
   * 一下为 同步 调用，使用方法同 普通函数调用 返回
   */
  sysInfo () {
    return callSync('sysInfo')
  },
  userInfo () {
    return callSync('userInfo')
  },
  logOut () {
    return callSync('logOut')
  },
  closeView () {
    return callSync('closeView')
  },
  openView (link = '') {
    const cont = {
      link
    }
    return callSync('openView', cont)
  },
  openNative (link = '') {
    const url = getSchemeNativeUrl(link)
    return this.openView(url)
  },
  openWeb (link = '') {
    const url = getSchemeWebUrl(link)
    return this.openView(url)
  },
  /**
   * [old] open web
   * @param {String} link url
   */
  open (link = '') {
    const cont = {
      type: 'web',
      link
    }
    return callSync('openView', cont)
  },
  /**
   * @param {String} refreshUrl xxx.com
   */
  refresh (refreshUrl = window.location.href) {
    const cont = {
      refreshUrl
    }
    return callSync('refresh', cont)
  },
  /**
   * 设置返回按钮
   * @param {Boolean} backIconVisible 是否可见
   * @param {Boolean} backIconIsArrow true: 返回 false: 叉叉
   */
  setBackIconTheme ({ backIconVisible = true, backIconIsArrow = true } = {}) {
    const cont = {
      backIconVisible,
      backIconIsArrow
    }
    return callSync('setBackIconTheme', cont)
  },
  copy (text = 'copy') {
    const cont = {
      text
    }
    return callSync('copy', cont)
  },
  launchApp ({ pkg = '', cls = '', appName = '' } = {}) {
    const cont = {
      pkg,
      cls,
      appName
    }
    return callSync('launchApp', cont)
  },
  printLog (log = 'printLog') {
    const cont = {
      log
    }
    return callSync('printLog', cont)
  },
  showRightText (text = '右侧按钮', url = 'https://www.baidu.com/') {
    const cont = {
      text,
      url
    }
    return callSync('showRightText', cont)
  },
  /**
   * async
   * 以下为 异步 调用，使用方法同 promise
   */
  async login () {
    return callAsync('login', {})
  },
  /**
   * 保存 app 本地
   * @param {String} str img base64
   * @param {Number} len 字符串长度，分段保存，每次保存多少个字符串 500KB=256000
   */
  async saveImage (str, len = 256000) {
    if (!str) return
    const strs = str.match(new RegExp(`.{1,${len}}`, 'g'))
    const last = strs.length - 1
    let cur = 0

    const save = saveImageByBase64()

    try {
      const resp = await save.first(strs[cur])
      return handleSave(resp)
    } catch (err) {
      throw err
    }

    async function handleSave (resp) {
      return handleNativeCb(resp, {
        success: async res => {
          try {
            if (res.data.continue) {
              cur++
              const curImg = strs[cur]
              if (cur >= last) {
                // 返回到 最后一次 调用 handleSave
                return save.last(curImg)
              } else {
                const resp = await save.pend(curImg)
                // 递归调用 handleSave
                // 最后一次调用也在这，需要在这里 reutrn，将 last 返回
                return handleSave(resp)
              }
            } else {
              throw Error(`continue: ${res.data.continue}`)
            }
          } catch (err) {
            throw err
          }
        }
      })
    }
  }
}

function saveImageByBase64 () {
  async function saveImage ({
    isNew = true,
    finish = false,
    base64Str = '',
    title = '',
    desc = ''
  } = {}) {
    const cont = {
      isNew,
      finish,
      base64Str,
      title,
      desc
    }
    return callAsync('saveImageByBase64', cont)
  }

  return {
    async first (str) {
      return saveImage({ base64Str: str })
    },
    async pend (str) {
      return saveImage({ base64Str: str, isNew: false, finish: false })
    },
    async last (str, title = '', desc = '') {
      return saveImage({
        base64Str: str,
        isNew: false,
        finish: true,
        title,
        desc
      })
    }
  }
}

export default jsbridge
export { handleNativeCb }
