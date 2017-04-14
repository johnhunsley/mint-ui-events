<template>
  <mt-tab-container v-model="active">
    <mt-tab-container-item id="tab-container1">
      <mt-cell id="tab-container1" @click.native="centerMap(item.hash)" v-for="item in list" :key="item.hash" :title="item.hash"></mt-cell>
    </mt-tab-container-item>
    <mt-tab-container-item id="tab-container2">
      <mt-cell id="tab-container2" @click.native="centerMap(item.hash)" v-for="item in list" :key="item.hash" :title="item.hash">}</mt-cell>
    </mt-tab-container-item>
    <mt-tab-container-item id="tab-container3">
      <mt-cell id="tab-container3" @click.native="centerMap(item.hash)" v-for="item in list" :key="item.hash" :title="item.hash"></mt-cell>
    </mt-tab-container-item>
  </mt-tab-container>
</template>

<script>
import { Toast } from 'mint-ui'
import auth from './auth.js'

export default {
  name: 'events',
  data () {
    return {
      active: 'tab-container1',
      list: []
    }
  },
  mounted: function () {
    this.loadListItems()
  },
  methods: {
    centerMap: function (eventId) {
      console.log('Event item clicked - ' + eventId)
      this.$router.push('/map/' + encodeURIComponent(eventId))
    },
    loadListItems: function () {
      console.log(auth.getToken())
      this.$http.get('http://localhost:8080/events/', {headers: {'Authorization': 'Bearer ' + auth.getToken()}, params: {'page': 0, 'size': 100}}).then(function (response) {
        console.log(response)
        this.list = response.data.content
      }, function (response) {
        console.log(response)
        Toast({
          message: 'Error : ' + response
        })
        this.$router.push('/login')
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
    }
  }
}
</script>

<style>
</style>

