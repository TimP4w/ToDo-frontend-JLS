<template>
      <button class="blue-button"> Login </button>
</template>


<script>
export default {
  name: 'BlueButton',
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
.blue-button {
  cursor: pointer;
  width: 5rem;
  height: 3rem;
  background-color: #2980b9;
  border-width: 0px;
  border-radius: 10px;
  color: white;
  font-size: 20px;
  font-family: 'Nova Flat', cursive;
  box-shadow: 3px 4px 8px 0px grey;

}

.blue-button:hover {
  background-color: #3498db;
}

.blue-button:active {
  background-color: #2980b9;
}
</style>
