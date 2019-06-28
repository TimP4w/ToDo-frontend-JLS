<template>
  <BaseContainer>
    <BaseHeader v-bind:title="'LoginView'"></BaseHeader>
    <BaseError></BaseError>
    <form class="new-task-form" v-on:submit.prevent="login">
      <div class="user">
        <BaseInput
          type="text"
          v-model="username"
          placeholder="jls-2"> </BaseInput>
      </div>
      <div class="pass">
        <BaseInput
              type="password"
              v-model="password"></BaseInput>
      </div>
      <BlueButton>Login</BlueButton>
    </form>
  </BaseContainer>
</template>


<script>
import BaseHeader from '../ui/BaseHeader.vue'
import BaseError from '../ui/BaseError.vue'
import BaseContainer from '../ui/BaseContainer.vue'
import BaseInput from '../ui/BaseInput.vue'
import BlueButton from '../ui/BlueButton.vue'
import { mapMutations, mapActions } from 'vuex'

export default {
  name: 'LoginView',

  components: {
    BaseHeader,
    BaseError,
    BaseContainer,
    BaseInput,
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
        this.$router.replace({ name: "TodoView" });
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
            this.$router.replace({ name: "TodoView" });
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
