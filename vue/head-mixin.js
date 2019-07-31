/**
  head () {
    return {
      title: '',
      description: '',
      keywords: ''
    }
  },
  watchLang () {
    this.$_setHead()
  }
 */

function getHead (vm) {
  // 组件可以提供一个 `title` 选项
  // 此选项可以是一个字符串或函数
  const { head } = vm.$options
  if (head) {
    return typeof head === 'function' ? head.call(vm) : head
  }
}

const serverHeadMixin = {
  created () {
    const head = getHead(this)
    if (head) {
      const { title, description, keywords } = head
      if (title) this.$ssrContext.title = title
      if (description) this.$ssrContext.description = description
      if (keywords) this.$ssrContext.keywords = keywords
    }
  }
}

const clientHeadMixin = {
  mounted () {
    this.$_setHead()
  },
  methods: {
    $_setHead () {
      const head = getHead(this)
      if (head) {
        const { title, description, keywords } = head
        if (title) document.title = title
        const descriptionEl = document.querySelector('meta[name=description]')
        if (descriptionEl && description) descriptionEl.setAttribute('content', description)
        const keywordsEl = document.querySelector('meta[name=keywords]')
        if (keywordsEl && keywords) keywordsEl.setAttribute('content', keywords)
      }
    }
  }
}

// 可以通过 `webpack.DefinePlugin` 注入 `VUE_ENV`
export default (process.env.VUE_ENV === 'server' ? serverHeadMixin : clientHeadMixin)
