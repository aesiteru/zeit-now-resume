import Vue from 'vue'
import Router from 'vue-router'
import store from '../store'

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
          path: 'demo',
          beforeEnter (to, from, next) {
            const moduleName = 'demo'
            const storeModule = require('../store/demo').default
            const isStore = (store && store.state && store.state[moduleName])
            if (!isStore) store.registerModule(moduleName, storeModule)

            store.dispatch('demo/SET_DATA')
            next()
          },
          component: () => import('../page/demo')
        },
        { path: '*', redirect: 'about' }
      ]
    },
    { path: '*', redirect: 'about' }
  ]
})

export default router