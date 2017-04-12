import Vue from 'vue'
import Router from 'vue-router'
import VueResource from 'vue-resource'
import Mint from 'mint-ui'
import Login from '@/components/Login'
import Client from '@/components/Client'
import EventsList from '@/components/EventsList'
import Map from '@/components/Map'
import auth from '../components/auth.js'

Vue.use(VueResource)
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

function centerOnEvent (route) {
  console.log('routing - ' + route.params.eventId)
  Vue.http.get('http://localhost:8080/events/' + route.params.eventId, {headers: {'Authorization': 'Bearer ' + auth.getToken()}}).then(function (response) {
    console.log(response)
    var lat = response.data.latitude
    var lng = response.data.longitude
    var cent = {event: {lat: lat, lng: lng}}
    console.log(cent)
    return cent
  }, function (response) {
    console.log(response)
  })
}

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', redirect: '/login'},
    {path: '/login', component: Login},
    {path: '/client', component: Client, beforeEnter: requireAuth},
    {path: '/events', component: EventsList, beforeEnter: requireAuth},
    {path: '/map', component: Map, beforeEnter: requireAuth},
    {path: '/map/:eventId', component: Map, beforeEnter: requireAuth, props: centerOnEvent}
  ]
})
