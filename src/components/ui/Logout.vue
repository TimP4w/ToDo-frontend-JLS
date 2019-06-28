<template>
    <span class="logout" @click="LOGOUT">logout</span>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Logout',
  methods: {
      ...mapMutations([
        "LOGOUT"
      ])
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
