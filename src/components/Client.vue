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
        }.bind(this))
      }
    }
}
</script>

<style>
div {
  font-family: Arial
}
</style>

