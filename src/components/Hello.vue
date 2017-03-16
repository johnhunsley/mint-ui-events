<template>
  <div class="hello">
    <mt-button @click.native="handleClick">Button</mt-button>
    <mt-spinner color="grey" type="fading-circle"></mt-spinner>
  </div>
</template>

<script>
import Toast from 'mint-ui'

export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  methods: {
    handleClick: function () {
      Toast({
        message: 'operation success'
      })
    }
  }
}
</script>
