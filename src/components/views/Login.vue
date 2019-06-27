<template>
  <Container>
    <Header v-bind:title="'Login'">

    </Header>
    <Error></Error>
    <form class="new-task-form" v-on:submit.prevent="login">
    <div class="user">
        <input id="username" 
            type="text" 
            v-model="username"
            placeholder="JLS">
    </div>

    <div class="pass">
        <input id="password" 
            type="password" 
            v-model="password">
    </div>
    <button> Login </button>
</form>
  </Container>
</template>


<script>
import Header from '../ui/Header.vue'
import Error from '../ui/Error.vue'
import Container from '../ui/Container.vue'

export default {
  name: 'Login',
  components: {
    Header,
    Error,
    Container,
  },
  props: {
  },
  data: function () {
    return {
      showInput: false,
      username: "",
      password: "",
     
    }
  },

  mounted() {
    let token = localStorage.getItem("token")
    if(token) {
        this.$store.commit("LOGIN", token);
        this.$router.replace({ name: "todo" });
    }
  },
  //Filtered lists methods
  computed: {
   

  },
  methods: {
      login() {
          let credentials = {
              username: this.username,
              password: this.password
          }
          this.$store.dispatch("doLogin", credentials)
          .then(response => {
            this.$router.replace({ name: "todo" });
          }).catch(e => {
            if(e.response.status === 401) {
              this.$store.commit("THROW_ERROR", "Wrong username or password");
            }
          });

      },
  
  },
  
}
</script>

<style scoped>

</style>
