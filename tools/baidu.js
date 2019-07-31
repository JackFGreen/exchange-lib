export default {
  install (code) {
    window._hmt = window._hmt || []
    ;(function () {
      var hm = document.createElement('script')

      hm.src = 'https://hm.baidu.com/hm.js?' + code
      var s = document.getElementsByTagName('script')[0]
      s.parentNode.insertBefore(hm, s)
    })()
  },
  trackEvent (category, action, label, value) {
    var _hmt = window._hmt || []
    _hmt.push(['_trackEvent', category, action, label, value])
  },
  trackPage (pageURL) {
    var _hmt = window._hmt || []
    _hmt.push(['_trackPageview', pageURL])
  }
}
