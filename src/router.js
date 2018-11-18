import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/signin',
      name: 'signin',
      component: () => import('./views/Signin.vue')
    },
    {
      path: '/signup',
      name: 'signup',
      component: () => import('./views/Signup.vue')
    },
    {
      path: '/account-book',
      name: 'account-book',
      component: () => import('./views/AccountBook.vue')
    },
    {
      path: '/stupid-great-community',
      name: 'stupid-great-community',
      component: () => import('./views/StupidGreatCommunity.vue')
    },
    {
      path: '/statistic',
      name: 'statistic',
      component: () => import('./views/Statistic.vue')
    }
  ]
})
