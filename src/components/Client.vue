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
    name: 'hello',
    data () {
      return {
      }
    },
    methods: {
      handleClick: function (button) {
        this.$http.post('http://localhost:8080/events/', this.createEvent(), {headers: {'Authorization': 'Bearer ' + auth.getToken(), 'Content-Type': 'application/json'}}).then(function (response) {
          console.log(response.data.access_token)
          auth.login(response.data.access_token)
          this.$router.push('/client')
        }, function (response) {
          console.log(response)
        })
        console.log(auth.getToken())
        Toast({
          message: 'button clicked ' + button
        })
      },
      createEvent: function () {

      }
    }
}
</script>

<style>
div {
  font-family: Arial
}
</style>

