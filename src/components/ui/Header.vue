<template>
    <div class="header">
      <h1> {{title}} </h1>
      <slot></slot>
    </div>
</template>


<script>

export default {
  name: 'Header',
  components: {
  },
  props: {
    title: String,
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

.header {
  background-color: #3498db;
  padding-top: 20px;
  padding-bottom: 10px;
  margin-bottom: 35px;
  color: white;
}
/* Toggle input button */

</style>
