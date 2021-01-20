import Link from './router-link'
import View from './router-view'
class VueRouter {
  constructor (options) {
    this.$options = options

    // 定义响应式数据current
    const initial = window.location.hash.slice(1) || '/'
    Vue.util.defineReactive(this, 'current', initial)
    // hash改变时
    window.addEventListener('hashchange', this.onHashChange.bind(this))
    window.addEventListener('load', this.onHashChange.bind(this))
  }

  onHashChange () {
    this.current = window.location.hash.slice(1)
  }
}
let Vue
// vue插件编写的方式install
VueRouter.install = function (vue, opts) {
  Vue = vue
  Vue.mixin({

    // 在vue实例化后将$router挂载
    beforeCreate () {
      if (this.$options && this.$options.router) {
        Vue.prototype.$router = this.$options.router
      }
    }
  })
  // 实现router-link；router-view
  Vue.component('router-link', Link)
  Vue.component('router-view', View)
}

export default VueRouter
