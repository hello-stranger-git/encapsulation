
export default {
  render (h) {
    // let component
    // console.log(this.$router.current)
    // console.log(this.$router.$options.routes)
    const current = this.$router.current
    this.renderComponents(current, this.$router.$options.routes)
    return h(this.component)
  },
  data () {
    return {
      component: ''
    }
  },
  methods: {

    renderComponents (current, routes) {
      // 查找hash与path匹配的路由
      const route = routes.find((item) => {
        return current === item.path
      })

      // 将查找到的路由的components保存
      if (route) {
        this.component = route.component
      } else {
        for (let index = 0; index < routes.length; index++) {
          // 查找子路由
          if (routes[index].childrens) {
            this.renderComponents(current, routes[index].childrens)
            return
          }
        }
      }
    }
  }
}
