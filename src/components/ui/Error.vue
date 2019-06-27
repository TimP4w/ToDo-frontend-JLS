<template>
  <div>
    <div class="error" v-if="$store.getters.isError">
      <h3> Oops. </h3>
      <span>{{$store.getters.errorMessage}}</span>
    </div>
  </div>
</template>


<script>

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
