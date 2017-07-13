<template>
  <div>
    <mt-header title="Service Provider View">
      <router-link to="/events" slot="left">
        <mt-button icon="back">back</mt-button>
      </router-link>
      <mt-button @click.native="handleLogout()" slot="right">logout</mt-button>
    </mt-header><br/>
    <mt-cell title="ID" :value="event.hash"></mt-cell>
    <mt-cell title="Created" :value="event.createdDate"></mt-cell>
    <mt-cell title="Client ID" :value="event.user"></mt-cell>
    <mt-cell title="Client First Name" :value="event.firstName"></mt-cell>
    <mt-cell title="Client Last Name" :value="event.lastName"></mt-cell>
    <mt-cell title="Client Phone" :value="event.phoneNumber"></mt-cell>
    <mt-cell title="Priority">
      <mt-badge v-if="event.priority === 'High'" type="error" size="small" >{{event.priority}}</mt-badge>
      <mt-badge v-if="event.priority === 'Medium'" type="warning" size="small" >{{event.priority}}</mt-badge>
      <mt-badge v-if="event.priority === 'Low'" type="primary" size="small" >{{event.priority}}</mt-badge>
    </mt-cell>
    <mt-cell title="Status">
        <mt-badge v-if="event.status === 'Open'" type="success" size="small" >{{event.status}}</mt-badge>
        <mt-badge v-if="event.status === 'Closed'" type="warning" size="small" >{{event.status}}</mt-badge>
    </mt-cell>
    <mt-button @click.native="centerMap()">
      <img src="../assets/map.jpg" height="30" width="30" slot="icon">
    </mt-button>

  </div>
</template>
<script>
import AuthService from './AuthService.js'
export default {
  props: {
    eventId: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      event: {}
    }
  },
  methods: {
    handleLogout: function () {
      const auth = new AuthService()
      auth.logout()
      this.$router.push('./')
    },
    centerMap: function () {
      console.log('Map icon clicked - ' + this.eventId)
      this.$router.push('/map/' + encodeURIComponent(this.eventId))
    }
  },
  mounted: function () {
    console.log('routing - ' + this.eventId)
    this.$http.get('http://localhost:8080/app/event/' + encodeURIComponent(this.eventId), {headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}}).then(function (response) {
      console.log(response)
      this.event = response.data
    }, function (response) {
      console.log(response)
    })
  }
}
</script>
