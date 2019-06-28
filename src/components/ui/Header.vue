<template>
    <div class="header">
      <div class="logout">
        <Logout></Logout>
      </div>
      <h1> {{title}} </h1>
      <slot></slot>
    </div>
</template>


<script>
import Logout from "./Logout.vue"

export default {
  name: 'Header',
  components: {
    Logout
  },
  props: {
    title: String,
  },
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.header {
  position: relative;
  background-color: #3498db;
  padding-top: 1rem;
  padding-bottom: 1rem;
  margin-bottom: 2rem;
  color: white;
  width: 100%;
}

.logout {
  color: white;
  position:absolute;
  right: 0.6rem;
}
/* Toggle input button */

</style>
