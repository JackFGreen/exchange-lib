const userAgent = window.navigator.userAgent.toLowerCase()

export const isWeiXin = (s = userAgent) => {
  return /micromessenger/.test(s)
}

export const isAndroid = (s = userAgent) => {
  return /android|linux/.test(s)
}

export const isIOS = (s = userAgent) => {
  return /iphone|ipad/.test(s)
}

export const isMobile = (s = userAgent) => {
  return /mobile/i.test(s)
}
