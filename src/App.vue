<template>
  <div id="app">
    <TodoList></TodoList>
  </div>
</template>

<script>
import TodoList from './components/Todolist.vue'

export default {
  name: 'app',
  components: {
    TodoList
  }
}
</script>

<style>
body {
  background-color: #ecf0f1;
}
#app {
  font-family: 'Nova Flat', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
