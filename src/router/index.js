import Vue from 'vue'
import Router from 'vue-router'
import Mint from 'mint-ui'
import Hello from '@/components/Hello'
import Login from '@/components/Login'
import Map from '@/components/Map'
import VueCookie from 'vue-cookie'

Vue.use(Router)
Vue.use(Mint)
Vue.use(VueCookie)

function requireAuth (to, from, next) {
  var cookie = Vue.cookie.get('access_token')
  console.log(cookie)
  if (!Vue.cookie.get('access_token')) {
    console.log('not logged in, forwarding to /login')
    next({
      path: '/login'
    })
  } else {
    console.log('logged in, forwarding to next()')
    next()
  }
}

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', redirect: '/login'},
    {path: '/login', component: Login},
    {path: '/hello', component: Hello, beforeEnter: requireAuth},
    {path: '/map', component: Map, beforeEnter: requireAuth}
  ]
})
