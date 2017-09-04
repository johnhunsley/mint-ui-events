<template>
  <div class="spinner">
    <img src="../assets/loading.svg" alt="loading"/>
  </div>
</template>

<script>
export default {
  name: 'callback',
  props: ['auth'],
  data () {
    var url = window.location.href

    if (url.includes('#')) {
      this.auth.handleAuthentication(this.$router)
    } else {
      this.auth.login()
    }
    return {}
  }
}
</script>
