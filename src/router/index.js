import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode  : 'hash',
  routes: [
    {
      path     : '/',
      component: () => import('../layout/default'),
      children : [
        {
          path     : 'about',
          component: () => import('../page/about')
        },
        {
          path     : 'demo',
          component: () => import('../page/demo')
        },
        { path: '*', redirect: 'about' }
      ]
    },
    { path: '*', redirect: 'about' }
  ]
})

export default router