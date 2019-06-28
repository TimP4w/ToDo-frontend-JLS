<template>
  <div>
    <div class="error" v-if="isError">
      <h3> Oops. </h3>
      <span>{{errorMessage}}</span>
    </div>
  </div>
</template>


<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Error',
  components: {
    
  },
  props: {
  },
  data: function () {
    return {
         
    }
  },
 
  computed: {
    ...mapGetters([
      "errorMessage",
      "isError",
    ]),
  },
  methods: {
  
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
</style>
