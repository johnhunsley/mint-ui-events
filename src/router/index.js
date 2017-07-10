import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Mint from 'mint-ui'
import Login from '@/components/Login'
import Client from '@/components/Client'
import EventsList from '@/components/EventsList'
import EventsPagedList from '@/components/EventsPagedList'
import Event from '@/components/Event'
import Map from '@/components/Map'
import Callback from '@/components/Callback'
import AuthService from '../components/AuthService'

Vue.use(VueResource)
Vue.use(Router)
Vue.use(Mint)

const auth = new AuthService()

function requireAuth (to, from, next) {
  console.log('requires auth')

  if (!auth.isAuthenticated()) {
    alert('not logged in, forwarding to /login')
    auth.login()
    next()
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
    {path: '/callback', component: Callback, props: {auth}},
    {path: '/client', component: Client, beforeEnter: requireAuth},
    {path: '/events', component: EventsList, beforeEnter: requireAuth},
    {path: '/eventspage', component: EventsPagedList, beforeEnter: requireAuth},
    {path: '/map', component: Map, beforeEnter: requireAuth},
    {path: '/map/:eventId', component: Map, beforeEnter: requireAuth, props: true},
    {path: '/event/:eventId', component: Event, beforeEnter: requireAuth, props: true}
  ]
})
