import Vue from 'vue'
import KRouter from './kkb-router'
import Home from './views/Home'

Vue.use(KRouter)

export default new KRouter({
  routes: [
    {
      path: '/',
      component: Home,
      beforeEnter(to, from, next) {
        setTimeout(() => {
          next()
        }, 1000)
      }
    },
    {
      path: '/about',
      component: () => import(/* webpackChunkName: 'about' */ './views/About'),
    }
  ]
})
