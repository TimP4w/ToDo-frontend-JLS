<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  name: 'app',
  components: {
  },
  data() {
    return {
    }
  },
  mounted() {
    
    if(!this.isAuthenticated) {
      this.$router.replace({ name: "login"});
    } 

  },
  methods: {
  
  },
  computed: {
    ...mapGetters([
      "isAuthenticated",

    ]),
    isLoggedIn() {
      return this.isAuthenticated;
    },
  },
  watch: {
    isLoggedIn(oldStatus, newStatus) {
      if(newStatus) {
        this.$router.replace({ name: "login"});
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
