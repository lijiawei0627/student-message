import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: []
})

router.beforeEach((to, from, next) => {
  const isLogin = localStorage.Token? true : false
  if (to.path == '/login' || to.path == '/register') {
    next()
  } else {
    isLogin? next() : next('/login')
  }
})

export default router
