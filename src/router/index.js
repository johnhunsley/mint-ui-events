import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Mint from 'mint-ui'
import Client from '@/components/Client'
import EventsList from '@/components/EventsList'
import EventsPagedList from '@/components/EventsPagedList'
import Event from '@/components/Event'
import Map from '@/components/Map'
import Callback from '@/components/Callback'
import AuthService from '../components/AuthenticationService'

Vue.use(VueResource)
Vue.use(Router)
Vue.use(Mint)

const auth = new AuthService()

function requireAuth (to, from, next) {
  if (!auth.isAuthenticated()) {
    auth.login()
    next()
  } else {
    next()
  }
}

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', redirect: '/callback'},
    {path: '/callback', component: Callback, props: {auth}},
    {path: '/client', component: Client, beforeEnter: requireAuth},
    {path: '/events', component: EventsList, beforeEnter: requireAuth},
    {path: '/eventspage', component: EventsPagedList, beforeEnter: requireAuth},
    {path: '/map', component: Map, beforeEnter: requireAuth},
    {path: '/map/:eventId', component: Map, beforeEnter: requireAuth, props: true},
    {path: '/event/:eventId', component: Event, beforeEnter: requireAuth, props: true}
  ]
})
