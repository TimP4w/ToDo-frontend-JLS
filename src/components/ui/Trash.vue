<template>
    <div class="toggle-input"  @click="clicked" >
        <i class="fas fa-trash trash"></i>
    </div>
</template>


<script>
export default {
  name: 'Trash',
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
    clicked() {
      this.$emit("button-clicked");
    },

  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>


.trash {
  font-size: 24px;
  cursor: pointer;
}

.trash:hover {
  color: red;
}

.trash:active{
  color: #c0392b;
}
</style>
