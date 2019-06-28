<template>
  <Container>
    <Header v-bind:title="'Login'"></Header>
    <Error></Error>
    <form class="new-task-form" v-on:submit.prevent="login">
      <div class="user">
        <InputField 
          type="text" 
          v-model="username"
          placeholder="jls-2"> </InputField>
      </div>
      <div class="pass">
        <InputField 
              type="password" 
              v-model="password"></InputField>
      </div>
      <BlueButton></BlueButton>
    </form>
  </Container>
</template>


<script>
import Header from '../ui/Header.vue'
import Error from '../ui/Error.vue'
import Container from '../ui/Container.vue'
import InputField from '../ui/InputField.vue'
import BlueButton from '../ui/BlueButton.vue'
import { mapMutations, mapActions } from 'vuex'

export default {
  name: 'Login',
  
  components: {
    Header,
    Error,
    Container,
    InputField,
    BlueButton
  },

  data: function () {
    return {
      showInput: false,
      username: "",
      password: "",
    }
  },

  mounted() {
    //Need a better solution here.
    let token = localStorage.getItem("token")
    if(token) {
        this.LOGIN(token);
        this.$router.replace({ name: "todo" });
    }
  },

  methods: {
      ...mapMutations([
        "THROW_ERROR",
        "LOGIN"
      ]),
      ...mapActions([
        "doLogin"
      ]),
      login() {
        if(this.username === "" || this.password === "") {
          this.THROW_ERROR("Username and password cannot be empty!")
        } else {
          let credentials = {
              username: this.username,
              password: this.password
          }
          this.doLogin(credentials)
          .then(response => {
            this.$router.replace({ name: "todo" });
            return response;
          }).catch(e => {
            if(e.response.status === 401) {
              this.THROW_ERROR("Wrong username or password");
            }
          });
        }
      },
  
  },
  
}
</script>

<style scoped>

.tasks-todo {
  margin-top: 25px;
  box-shadow: 0px 0px 14px 1px grey;
}


</style>
