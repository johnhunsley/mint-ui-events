<template>
  <div>
    <mt-header title="Service Provider View">
      <router-link to="/events" slot="left">
        <mt-button icon="back">back</mt-button>
      </router-link>
      <mt-button @click.native="handleLogout()" slot="right">logout</mt-button>
    </mt-header><br/>
    <gmap-map :center="center" :zoom="zoom" style="width:100%; height: 100vh">
      <gmap-marker v-for="m in markers" :key="m.id" :position="m.position" :clickable="true" :draggable="true" @click="center=m.position"></gmap-marker>
    </gmap-map>
  </div>
</template>
<script>
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'
import AuthService from './AuthenticationService.js'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDYKtSIFVP7lnx21p8xi0NKTdHX3whD670'
  }
})

export default {
  props: {
    eventId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      center: { lat: 0, lng: 0 },
      zoom: 16,
      markers: [{
        id: 1,
        position: {
          lat: 52.4, lng: -2.2
        }
      },
      {
        id: 2,
        position: {lat: 52.7, lng: -2.77}
      }]
    }
  },
  methods: {
    handleLogout: function () {
      const auth = new AuthService()
      auth.logout()
      this.$router.push('./')
    }
  },
  mounted: function () {
    console.log('routing - ' + this.eventId)
    this.$http.get('http://localhost:8080/app/event/' + encodeURIComponent(this.eventId), {headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}}).then(function (response) {
      console.log(response)
      var lat = response.data.latitude
      var lng = response.data.longitude
      this.center = {lat: lat, lng: lng}
      this.markers = [{id: this.eventId, position: {lat: lat, lng: lng}}]
    }, function (response) {
      console.log(response)
    })
  }
}
</script>
<style>
map {
  width:100%;
  min-height:100%;
  height:100%;
}
</style>
