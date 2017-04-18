<template>
  <div>
    <mt-header title="Service Provider View">
      <router-link to="/events" slot="left">
        <mt-button icon="back">back</mt-button>
      </router-link>
      <mt-button @click.native="handleLogout()" slot="right">logout</mt-button>
    </mt-header><br/>
  </div>
</template>

