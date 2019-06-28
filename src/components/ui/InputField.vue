<template>
  <input :type="type"
        :placeholder="placeholder"
        @input="$emit('input', $event.target.value)">
</template>


<script>

export default {
  name: "InputField",
  components: {
    
  },
  props: {
      type: String,
      placeholder: String
  },
  data: function () {
    return {
         
    }
  },
 
  computed: {
  
  }

  
}
</script>

<style scoped>


</style>
