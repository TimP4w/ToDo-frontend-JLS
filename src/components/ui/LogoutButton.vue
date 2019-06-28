<template>
    <span v-if="routeName !== 'LoginView'" class="logout" @click="LOGOUT">logout</span>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  name: 'LogoutButton',
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

<style scoped>
.logout {
  cursor: pointer;
}
.logout:hover {
  color: black;
}
</style>
