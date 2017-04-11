<template>
  <ul v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
    <li v-for="item in list">{{item}}</li>
  </ul>
</template>

<script>
import Vue from 'vue'
import { InfiniteScroll, Toast } from 'mint-ui'
import auth from './auth.js'
Vue.use(InfiniteScroll)

export default {
  data () {
    return {
      list: []
    }
  },
  mounted: function () {
    this.loadListItems()
  },
  methods: {
    loadListItems: function () {
      console.log(auth.getToken())
      this.$http.get('http://localhost:8080/events/', {headers: {'Authorization': 'Bearer ' + auth.getToken()}, params: {'page': 0, 'size': 10}}).then(function (response) {
        console.log(response)
        this.list = response.body
      }, function (response) {
        console.log(response)
        Toast({
          message: 'Error : ' + response
        })
      })
    },
    loadMore () {
      this.loading = true
      setTimeout(() => {
        let last = this.list[this.list.length - 1]
        for (let i = 1; i <= 10; i++) {
          this.list.push(last + i)
        }
        this.loading = false
      }, 2500)
    },
    handleClick: function (button) {
      console.log(auth.getToken())
      this.$http.post('http://localhost:8080/events/', this.createEvent(), {headers: {'Authorization': 'Bearer ' + auth.getToken(), 'Content-Type': 'application/json'}}).then(function (response) {
        console.log(response.data.access_token)
        Toast({
          message: 'Event created with priority ' + button
        })
        this.$router.push('/client')
      }, function (response) {
        console.log(response)
        Toast({
          message: 'Error : ' + response
        })
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

