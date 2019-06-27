<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>


export default {
  name: 'app',
  components: {
  },
  data() {
    return {
    }
  },
  mounted() {
    
    if(!this.$store.isAuthenticated) {
      this.$router.replace({ name: "login"});
    } 

  },
  methods: {
  
  },
  computed: {
    isLoggedIn() {
      return this.$store.getters.isAuthenticated;
    },
    apiError() {
      return this.$store.state.apiError;
    }
  },
  watch: {
    isLoggedIn(oldStatus, newStatus) {
      if(newStatus) {
        this.$router.replace({ name: "login"});
      }
    },
    apiError(oldError, newError) {
      let code = oldError;
      if(code === 401) {
          this.$store.commit("LOGOUT");
          this.$store.commit("THROW_ERROR", "Please login again to update your token");
      } else {
          this.$store.commit("THROW_ERROR", "Something went wrong");
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
