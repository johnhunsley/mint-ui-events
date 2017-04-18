<template>
  <div>
    <mt-header title="Service Provider View">
      <router-link to="/" slot="left">
        <mt-button icon="back">back</mt-button>
      </router-link>
      <mt-button @click.native="handleLogout()" slot="right">logout</mt-button>
    </mt-header><br/>
    <div class="nav">
      <mt-button type="default" size="small" @click.native.prevent="active = 'tab-container1'">High</mt-button>
      <mt-button type="default" size="small" @click.native.prevent="active = 'tab-container2'">Medium</mt-button>
      <mt-button type="default" size="small" @click.native.prevent="active = 'tab-container3'">Low</mt-button>
    </div>
    <div class="page-tab-container">
      <mt-tab-container v-model="active" >
        <mt-tab-container-item id="tab-container1">
          <mt-cell id="tab-container1" @click.native="centerMap(item.hash)" v-for="item in highList" :key="item.hash" :title="item.hash">
            <mt-badge size="small" color="#888">{{item.created}}</mt-badge>
            <mt-badge v-if="item.status === 'Open'" type="success" size="small" >{{item.status}}</mt-badge>
            <mt-badge v-if="item.status === 'Closed'" type="warning" size="small" >{{item.status}}</mt-badge>
          </mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container2">
          <mt-cell id="tab-container2" @click.native="centerMap(item.hash)" v-for="item in mediumList" :key="item.hash" :title="item.hash">
            <mt-badge size="small" color="#888">{{item.created}}</mt-badge>
            <mt-badge v-if="item.status === 'Open'" type="success" size="small" >{{item.status}}</mt-badge>
            <mt-badge v-if="item.status === 'Closed'" type="warning" size="small" >{{item.status}}</mt-badge>
          </mt-cell>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container3">
          <mt-cell id="tab-container3" @click.native="centerMap(item.hash)" v-for="item in lowList" :key="item.hash" :title="item.hash">
            <mt-badge size="small" color="#888">{{item.created}}</mt-badge>
              <mt-badge v-if="item.status === 'Open'" type="success" size="small" >{{item.status}}</mt-badge>
              <mt-badge v-if="item.status === 'Closed'" type="warning" size="small" >{{item.status}}</mt-badge>
          </mt-cell>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>

<script>
import { Toast } from 'mint-ui'
import auth from './auth.js'

export default {
  name: 'events',
  data () {
    return {
      active: 'tab-container1',
      highList: [],
      mediumList: [],
      lowList: []
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

      // get high priority events
      this.$http.get('http://localhost:8080/app/events/High/', {headers: {'Authorization': 'Bearer ' + auth.getToken()}, params: {'page': 0, 'size': 100}}).then(function (response) {
        console.log(response)
        this.highList = response.data.content
      }, function (response) {
        console.log(response)
        Toast({
          message: 'Error : ' + response
        })
        this.$router.push('/login')
      })

      // get medium priority events
      this.$http.get('http://localhost:8080/app/events/Medium/', {headers: {'Authorization': 'Bearer ' + auth.getToken()}, params: {'page': 0, 'size': 100}}).then(function (response) {
        console.log(response)
        this.mediumList = response.data.content
      }, function (response) {
        console.log(response)
        Toast({
          message: 'Error : ' + response
        })
        this.$router.push('/login')
      })

      // get low priority events
      this.$http.get('http://localhost:8080/app/events/Low/', {headers: {'Authorization': 'Bearer ' + auth.getToken()}, params: {'page': 0, 'size': 100}}).then(function (response) {
        console.log(response)
        this.lowList = response.data.content
      }, function (response) {
        console.log(response)
        Toast({
          message: 'Error : ' + response
        })
        this.$router.push('/login')
      })
    },
    handleLogout: function () {
      auth.logout()
      this.$router.push('login/')
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

