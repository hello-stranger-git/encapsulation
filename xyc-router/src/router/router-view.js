
export default {
  render (h) {
    let component
    // 查找当前选择路由,并加载相应组件
    const route = this.$router.$options.routes.find((item) => {
      return this.$router.current === item.path
    })
    if (route) {
      component = route.component
    }
    return h(component)
  }
}
