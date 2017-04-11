import Vue from 'vue'
import Router from 'vue-router'
import Mint from 'mint-ui'
import Login from '@/components/Login'
import Client from '@/components/Client'
import EventsList from '@/components/EventsList'
import Map from '@/components/Map'
import auth from '../components/auth.js'

Vue.use(Router)
Vue.use(Mint)

function requireAuth (to, from, next) {
  if (!auth.loggedIn()) {
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
    {path: '/client', component: Client, beforeEnter: requireAuth},
    {path: '/events', component: EventsList, beforeEnter: requireAuth},
    {path: '/map', component: Map, beforeEnter: requireAuth}
  ]
})
