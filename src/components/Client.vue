<template>
  <div class="hello">
    <mt-button size="large" type="danger" @click.native="handleClick('1')">Priority 1 Event</mt-button><br/>
    <mt-button size="large" type="primary" @click.native="handleClick('2')">Priority 2 Event</mt-button><br/>
    <mt-button size="large" type="default" @click.native="handleClick('3')">Priority 3 Event</mt-button><br/>
  </div>
</template>

  <script>
  import { Toast } from 'mint-ui'
  import auth from './auth.js'

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
      handleClick: function (button) {
        console.log(auth.getToken())
        this.createEvent(button)
        console.log(this.event)
        this.$http.post('http://localhost:8080/events/', this.event, {headers: {'Authorization': 'Bearer ' + auth.getToken(), 'Content-Type': 'application/json'}}).then(function (response) {
          Toast({
            message: 'Event created with priority ' + button
          })
          this.$router.push('/client')
        }, function (response) {
          console.log(response)
          Toast({
            message: 'Error : ' + response

          })
          this.$router.push('/login')
        })
      },
      createEvent: function (button) {
        // set priority according to button
        if (button === '1') {
          this.event.priority = 'High'
        }

        if (button === '2') {
          this.event.priority = 'Medium'
        }

        if (button === '3') {
          this.event.priority = 'Low'
        }

        this.getCurrentLocation()
      },
      getCurrentLocation: function () {
        navigator.geolocation.getCurrentPosition(function (position) {
          // Get the coordinates of the current position.
          var lat = position.coords.latitude
          var lng = position.coords.longitude
          console.log('lat - ' + lat + ' lng - ' + lng)
          this.event.longitude = lng
          this.event.latitude = lat
        })
      }
    }
}
</script>

<style>
div {
  font-family: Arial
}
</style>

