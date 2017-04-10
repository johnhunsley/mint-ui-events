<template>
  <div class="hello">
    <mt-button @click.native="handleClick('button1')">Button 1</mt-button>
    <mt-spinner color="grey" type="fading-circle"></mt-spinner>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import auth from './auth.js'

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    handleClick: function (button) {
      console.log(auth.getToken())
      console.log('button clicked ' + button)
      Toast({
        message: 'button clicked ' + button
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

