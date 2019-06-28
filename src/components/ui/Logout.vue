<template>
    <span v-if="routeName !== 'login'" class="logout" @click="LOGOUT">logout</span>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'Logout',
  methods: {
      ...mapMutations([
        "LOGOUT"
      ]),
  },
  computed: {
    routeName() {
      return this.$router.currentRoute.name;

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.logout {
  cursor: pointer;
}
</style>
