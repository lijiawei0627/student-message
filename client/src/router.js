import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/index',
      component: () => import ('./views/Index.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import ('./views/Register.vue')
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import ('./views/Login.vue')
    },
    {
      path: '/index',
      name: 'index',
      component: () => import ('./views/Index.vue')
    }
  ]
})
