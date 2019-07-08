<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

import { mapState } from 'vuex'

export default {
  name: 'app',
  components: {
  },
  data() {
    return {
    }
  },
  mounted() {

    if(!this.authenticated) {
      this.$router.replace({ name: "LoginView"});
    }

  },
  methods: {

  },
  computed: {
    ...mapState(['authenticated']),
  },
  watch: {
    authenticated(newStatus, oldStatus) {
      if(!newStatus && oldStatus) {
        this.$router.replace({ name: "LoginView"});
      }
    }
  },
}
</script>

<style>
body {
  background-color: #ecf0f1;
}
#app {
  font-family: 'Nova Flat', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
