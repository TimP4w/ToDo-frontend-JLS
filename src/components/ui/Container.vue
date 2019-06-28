<template>
  <div class="main">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'Container',
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main {
  background-color: white;
  width: 50%;
  position: absolute;
  top: 5%;
  left: 25%;
  border-radius: 15px;
  box-shadow: -1px 4px 20px 0px grey;
  overflow: auto;
  padding-bottom: 50px;
  margin-bottom: 50px;
  overflow: hidden;
}
</style>
