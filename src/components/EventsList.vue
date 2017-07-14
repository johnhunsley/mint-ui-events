<template>
  <div>
    <mt-header title="Service Provider View">
      <router-link to="/" slot="left">
        <mt-button icon="back">back</mt-button>
      </router-link>
      <mt-button @click.native="handleLogout()" slot="right">logout</mt-button>
    </mt-header><br/>
    <div class="page-tab-container">
      <mt-tab-container v-model="active" >
        <mt-tab-container-item id="tab-container1">
          <mt-cell id="tab-container1" @click.native="viewEvent(item.hash)" v-for="item in list" :key="item.hash" :title="item.hash">
            <mt-badge v-if="item.priority === 'High'" type="error" size="small" >{{item.priority}}</mt-badge>
            <mt-badge v-if="item.priority === 'Medium'" type="warning" size="small" >{{item.priority}}</mt-badge>
            <mt-badge v-if="item.priority === 'Low'" type="primary" size="small" >{{item.priority}}</mt-badge>
            <mt-badge size="small" color="#888">{{item.createdDate}}</mt-badge>
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
import AuthService from './AuthenticationService.js'

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
    viewEvent: function (eventId) {
      console.log('Event item clicked - ' + eventId)
      this.$router.push('/event/' + encodeURIComponent(eventId))
    },
    loadListItems: function () {
      console.log(localStorage.getItem('access_token'))

      this.$http.get('http://localhost:8080/app/events/', {headers: {'Authorization': 'Bearer ' + localStorage.getItem('access_token')}, params: {'page': 0, 'size': 10}}).then(function (response) {
        console.log(response)
        this.list = response.data.content
      }, function (response) {
        console.log(response)
        Toast({
          message: 'Error : ' + response
        })
        this.$router.push('/events')
      })
    },
    handleLogout: function () {
      const auth = new AuthService()
      auth.logout()
      this.$router.push('./')
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

