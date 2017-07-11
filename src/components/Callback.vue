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
    this.auth.handleAuthentication(this.$router)
    return {}
  }
}
</script>
