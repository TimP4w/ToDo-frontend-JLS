<template>
    <div class="toggle-input" :class="{active: toggled}" @click="toggle" >
        <i class="fas fa-plus plus"></i>
    </div>
</template>


<script>

export default {
  name: 'ToggleOpenCloseButton',
  components: {
    
  },
  props: {
      toggled: Boolean,
  },
  data: function () {
    return {
         
    }
  },
 
  computed: {
  
  },
  methods: {
    toggle() {
      this.$emit("button-clicked");
    },

  },

  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

.toggle-input {
  position: relative;
  background-color: #c0392b;
  border-radius: 30px;
  width: 3rem;
  height: 3rem;
  font-size: 30px;
  align-content: center;
  left: 13.5rem;
  bottom: -3rem;
  transform: rotate(0deg);
  transition: transform 0.2s ease-in;
  cursor: pointer;
}

.toggle-input.active {
  transition: transform 0.2s ease-in;
  transform: rotate(45deg);
}

.toggle-input:hover {
  background-color: #e74c3c;

}

.toggle-input:active {
  background-color: #c0392b;  
}

.plus {
  position: relative;
  top: 12%;
  
}
</style>
