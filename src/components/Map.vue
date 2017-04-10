<template>
  <gmap-map :center="center" :zoom="zoom" style="width: 500px; height: 300px">
    <gmap-marker v-for="m in markers" :key="m.id" :position="m.position" :clickable="true" :draggable="true" @click="center=m.position"></gmap-marker>
  </gmap-map>
</template>
<script>
import Vue from 'vue'
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyDYKtSIFVP7lnx21p8xi0NKTdHX3whD670'
  }
})

export default {
  data () {
    return {
      center: {lat: 52.58, lng: -2.5},
      zoom: 9,
      markers: [{
        id: 1,
        position: {
          lat: 52.4, lng: -2.2}
      },
      {
        id: 2,
        position: {lat: 52.7, lng: -2.77}
      }]
    }
  },
  computed: {
    getCurrentLoc: function () {
      console.log('computed......')
      var loc = navigator.geolocation.getCurrentPosition(function (position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        console.log(pos)
        return pos
      })
      this.center = loc
    }
  }
}
</script>
<style>
map {
  width:100%;
  height: 600px;
  display: block;
}
</style>
