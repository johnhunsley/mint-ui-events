<template>
  <div class="center-pane">
    <mt-field label="username" placeholder="Input username" v-model.trim="uname"></mt-field>
    <mt-field label="password" placeholder="Input password" type="password" v-model.trim="pword"></mt-field>
    <mt-button type="default" @click.native="auth()" size="normal">Login</mt-button>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'

export default {
  name: 'login',
  data () {
    return {
      uname: '',
      pword: ''
    }
  },
  methods: {
    auth: function () {
      console.log('authenticating ' + this.uname)
      var body = 'grant_type=password&username=' + this.uname + '&password=' + this.pword
      console.log(body)

      this.$http.post('https://proven-salute.apps.stormpath.io/oauth/token', body,
        {headers: {'Content-Type': 'application/x-www-form-urlencoded'}}).then(function (data) {
          console.log(data.bodyText)
          this.$router.push('/hello')
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
