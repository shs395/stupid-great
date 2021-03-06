import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/Home.vue'

// import VueSession from 'vue-session'
// Vue.use(VueSession)

//import BoardContentShow from '../components/BoardContentShow.vue'

Vue.use(Router)

// const requireAuth = () => (to, from, next) => {
//   var id = this.$session.exists()
//   if ( this.$session.exists()) return next()
//   next('/signin')
// }


export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,

    },
        /*
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about"  './views/About.vue')
    },
    */
    {
      path: '/signin',
      name: 'signin',
      component: () => import('../views/Signin.vue')
      
    },
    {
      path: '/mypage',
      name: 'mypage',
      component: () => import('../views/MyPage.vue')
      
    },
    {
      path: '/developers',
      name: 'developers',
      component: () => import('../views/Developers.vue')
    },
    {
      path: '/account-book',
      name: 'account-book',
      component: () => import('../views/AccountBook.vue')
    },
    {
      path: '/stupid-great-community',
      name: 'stupid-great-community',
      component: () => import('../views/StupidGreatCommunity.vue')
    },
    {
      path: '/stupid-great-content-create',
      name: 'stupid-great-content-create',
      component: () => import('../views/StupidGreatContentCreate.vue')
    },
    {
      path: '/stats',
      name: 'stats',
      component: () => import('../views/Stats.vue')
    },
    {
      path: '/evaluation',
      name: 'evaluation',
      component: () => import('../views/Evaluation.vue')
    },
    { 
      path: '/test',
      name: 'test',
      component: () => import('../views/Test.vue')
    },
    {
      path: '/boardwrite',
      name: 'boardwrite',
      component: () => import('../views/BoardWrite.vue')
    },
    {
      path: '/boardshow/:postNumber/:writer',
      name: 'boardshow',
      component: () => import('../views/BoardShow.vue'),
    
    }
  ]
})
