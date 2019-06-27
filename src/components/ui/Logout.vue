<template>
    <span class="logout" @click="logout">logout</span>
</template>


<script>

export default {
  name: 'Logout',
  components: {
    
  },
  props: {
  },
  data: function () {
    return {
         
    }
  },
 
  computed: {
  
  },
  methods: {
      logout() {
          this.$store.commit("LOGOUT");
      }
  },

  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logout {
  cursor: pointer;
  position:relative;
  bottom: 12rem;
  left: 12rem;
}
</style>
