<template>
  <div>
    <mt-header title="Client View">
      <router-link to="/" slot="left">
        <mt-button icon="back">back</mt-button>
      </router-link>
      <router-link to="/events" slot="right">
        <mt-button>Events</mt-button>&nbsp;&nbsp;&nbsp;&nbsp;
        <mt-button @click.native="handleLogout()">logout</mt-button>
      </router-link>
    </mt-header><br/>
    <div class="hello">
      <mt-button size="large" type="default" @click.native="createEvent('1')">Priority 1 Event</mt-button><br/>
      <mt-button size="large" type="default" @click.native="createEvent('2')">Priority 2 Event</mt-button><br/>
      <mt-button size="large" type="default" @click.native="createEvent('3')">Priority 3 Event</mt-button><br/>
    </div>
  </div>
</template>

  <script>
  import { Toast } from 'mint-ui'
  import AuthService from './AuthenticationService.js'

  export default {
    name: 'client',
    data () {
      return {
        event: {
          'class': 'Event',
          'longitude': 0,
          'latitude': 0,
          'priority': '',
          'status': 'Open'
        }
      }
    },
    methods: {
      createEvent: function (button) {
        // set priority according to button
        switch (button) {
          case '1': this.event.priority = 'High'; break
          case '2': this.event.priority = 'Medium'; break
          case '3': this.event.priority = 'Low'; break
        }

        var gl = navigator.geolocation
        gl.getCurrentPosition(function (position) {
          this.event.longitude = position.coords.longitude
          this.event.latitude = position.coords.latitude
          console.log('got current loc - ' + this.event.longitude + ':' + this.event.latitude)

          this.$http.post('http://localhost:8080/app/event/', this.event, {headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token'), 'Content-Type': 'application/json'}}).then(function (response) {
            Toast({
              message: 'Event created with priority ' + button
            })
            this.$router.push('/client')
          }, function (response) {
            console.log(response)
            Toast({
              message: 'Error : ' + response

            })
            this.$router.push('/')
          })
        }.bind(this))
      },
      handleLogout: function () {
        const auth = new AuthService()
        auth.logout()
        this.$router.push('./')
      }
    }
  }
</script>

<style>
div {
  font-family: Arial
}
</style>

