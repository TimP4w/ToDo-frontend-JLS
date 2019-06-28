<template>
  <div>
    <div class="error" v-if="isError">
      <h3> Oops. </h3>
      <span>{{errorMessage}}</span>
      <i class="fa fa-plus close" @click="QUIT_ERROR"></i>
    </div>
  </div>
</template>


<script>
import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'BaseError',

  computed: {
    ...mapGetters([
      "errorMessage",
      "isError",
    ]),
  },
  methods: {
    ...mapMutations([
      "QUIT_ERROR"
    ])

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.error {
  margin-bottom: 10px;
  background-color: #e74c3c;
  color: white;
}

.close {
  position: relative;
  bottom: 2rem;
  left: 10rem;
  color: #c03e30;
  transform: rotate(45deg);
  cursor: pointer;

}

.close:hover {
  color: #8a2e24;
}

.close:active {
  color: #000000;
}
</style>
