<template>
  <div class="center-pane">
    <mt-field label="username" placeholder="Input username" v-model.trim="uname"></mt-field>
    <mt-field label="password" placeholder="Input password" type="password" v-model.trim="pword"></mt-field>
    <mt-button type="default" @click.native="authenticate()" size="normal">Login</mt-button>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import auth from './auth.js'

export default {
  name: 'login',
  data () {
    return {
      uname: '',
      pword: ''
    }
  },
  methods: {
    authenticate: function () {
      console.log('authenticating ' + this.uname)
      var body = 'grant_type=password&username=' + this.uname + '&password=' + this.pword + 'audience=http://localhost:8080/events&scope=openid&client_id=VYoe_PnqLCViw25NigT8MUfZFcTYpDE8&client_secret=ggwTcidEN93Ors1im2wQBVp63_kO94e16PFzHq9OqY7sL2MyPyjPA_RMa4c9Mnrw'

      this.$http.post('https://johnhunsley.eu.auth0.com/oauth/token', body,
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (response) {
          console.log(response.data.access_token)
          auth.login(response.data.access_token)
          this.$router.push('/client')
        }, function (response) {
          console.log(response)
        })

      Toast({
        message: 'authenticating ' + this.uname
      })
    }
  }
}
</script>

<style>


</style>
