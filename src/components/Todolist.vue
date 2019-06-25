<template>
  <div class="main">
    <h1> My ToDo List </h1>
    <div class="info">
      <p class="task-counter"> 
        <span class="count">{{tasksDoneCount}}</span> task(s) done out of <span class="count">{{tasksCount}}</span> 
      </p>
    </div>
    <form class="newTask" v-on:submit.prevent="addNewTask">
      <input id="input" 
          type="text" 
          class="input-todo" 
          v-model="newTask"
          placeholder="E.g. Complete the ToDo app">
    </form>
    <ToDo v-for="task in toDoTasks" 
        v-bind:id="task.id" 
        v-bind:date="task.date"
        v-bind:description="task.desc"
        v-bind:status="task.status"
        v-bind:key="task.id"> {{ task.desc }} </ToDo>
    <ToDo v-for="task in doneTasks" 
        v-bind:id="task.id" 
        v-bind:date="task.date"
        v-bind:description="task.desc"
        v-bind:status="task.status"
        v-bind:key="task.id"> {{ task.desc }} </ToDo>
  </div>
</template>


<script>
import ToDo from './Todo.vue'

export default {
  name: 'Todolist',
  components: {
    ToDo
  },
  props: {
  },
  data: function () {
    return {
      nextId: 3, // only for testing before API implementation
      newTask: "",
      buttonDisabled: true,
      todoList: [],
      tasksCount: 0,
      tasksDoneCount: 0,
    }
  },
  mounted() {
    //Make GET request to retrieve data

    let date = new Date('7/13/2019');
    this.todoList = [
        {id: 0, desc: "Lorem ipsum dolor sic amet", status: false, date: date},
        {id: 1, desc: "Another todo thing", status: false, date: date},
        {id: 2, desc: "This is getting repetitive", status: true, date: date},
      ];

    this.tasksCount = this.todoList.length;
    this.tasksDoneCount = this.todoList.filter(function(task) {return task.status === true}).length;
  },
  computed: {
    doneTasks: function () {
      return this.todoList.filter(function(task) {
        return task.status === true
      });
    },
    toDoTasks: function () {
      return this.todoList.filter(function(task) {
        return task.status !== true
      });
    }
  },
  methods: {
    addNewTask() {
      this.todoList.push({
        id: this.nextId++,
        desc: this.newTask,
        status: false,
        date: new Date()
      })

      this.newTask = "";
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}



.input-todo {
  width: 50%;
  height: 50px;
  margin-bottom: 25px;
  font-size: 24px;
  border-radius: 10px;
  text-align: center;
}

.newTask input[type=text]:hover {
  background: rgba(128, 128, 128, 0.253);
}

</style>
