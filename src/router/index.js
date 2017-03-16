import Vue from 'vue'
import Router from 'vue-router'
import Mint from 'mint-ui'
import Hello from '@/components/Hello'
import Map from '@/components/Map'

Vue.use(Router)
Vue.use(Mint)

export default new Router({
  mode: 'history',
  routes: [
    {path: '/', redirect: '/hello'},
    {path: '/hello', component: Hello},
    {path: '/map', component: Map}
  ]
})
