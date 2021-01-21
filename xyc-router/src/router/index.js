import Vue from 'vue'
// import VueRouter from 'vue-router'
import VueRouter from './xyc-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import RouterTest from '../components/routerTest.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: About,
    childrens: [
      {

        path: '/about/aboutChildren',
        name: 'AboutChildren',
        component: RouterTest,
        childrens: [
          {
            path: '/about/aboutChildren/aboutChildren1',
            name: 'AboutChildren',
            component: Home
          }
        ]
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
