<template>
  <div class="main">
    <div class="header">
      <h1> My ToDo List </h1>
      <p class="task-counter"> 
        <span class="count">{{tasksDoneCount}}</span> task(s) done out of <span class="count">{{tasksCount}}</span> 
      </p>
      <div class="toggle-input" :class="{active: showInput}" @click="toggleInput">
        <i class="fas fa-plus plus"></i>
      </div>
    </div>
    <div class="error" v-if="error">
      <h3> Oops. </h3>
      <span>{{error_message}}</span>
    </div>
    <div id="input-task" class="input-form" :class="{active: showInput}" >
    <form class="newTask" v-on:submit.prevent="addNewTask">
        <input id="description" 
            type="text" 
            class="input-todo" 
            v-model="newTask"
            autocomplete="off"
            placeholder="E.g. Complete the ToDo app">
    </form>
    </div>
    <div class="noContent" v-if="tasksCount == 0"> 
      <h2> There are no tasks yet </h2>
      <span> Start by adding one </span>

    </div>
    <div class="tasksTodo">
      <ToDo v-for="task in toDoTasks" 
          v-bind:id="task.id" 
          v-bind:date="task.date"
          v-bind:description="task.desc"
          v-bind:status="task.status"
          v-bind:key="task.id"
          @task-updated="updateTask" 
          @task-deleted="removeTask"> {{ task.desc }} </ToDo>
    </div>
    <div class="tasksDone">
      <ToDo v-for="task in doneTasks" 
          v-bind:id="task.id" 
          v-bind:date="task.date"
          v-bind:description="task.desc"
          v-bind:status="task.status"
          v-bind:key="task.id"
          @task-updated="updateTask" 
          @task-deleted="removeTask"> {{ task.desc }} </ToDo>
    </div>
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
      error_message: "",
      error: false,
      showInput: false,
      inputHeight: 0,
      
    }
  },
  mounted() {

    //TODO Make GET request to retrieve data
  
    let date = new Date('7/13/2019');
    this.todoList = [
        {id: 12, desc: "Lorem ipsum dolor sic amet", status: false, date: date},
        {id: 34, desc: "Another todo thing", status: false, date: date},
        {id: 56, desc: "This is getting repetitive", status: true, date: date},
      ];

    // Initialize counters
    this.tasksCount = this.todoList.length;
    this.tasksDoneCount = this.todoList.filter(function(task) {return task.status === true}).length; // count every task with status true (=done)
  },
  computed: {
    /*                                                                    *
    *       Returns a list with the tasks with status == true             *
    *                                                                     */
    doneTasks() {
      return this.todoList.filter(function(task) {
        return task.status === true
      });
    },
    /*                                                                    *
    *       Returns a list with the tasks with status == false            *
    *                                                                     */
    toDoTasks() {
      return this.todoList.filter(function(task) {
        return task.status !== true
      });
    }
  },
  methods: {
    /*                                                                    *
    *       Add a new Task to the list with date +5 days                  *
    *                                                                     */
    addNewTask() {
      if (this.newTask === "") {
        this.error = true;
        this.error_message = "Your task cannot be empty!";
      } else {
        let date = new Date();
        date.setDate(date.getDate() + 5);
        this.todoList.push({
          id: this.nextId++,
          desc: this.newTask,
          status: false,
          date: date,
        })

        this.newTask = "";
        this.tasksCount++;
        this.error = false;
      }
    },
    /*                                                                                  *
    *       Remove task from list by id (got via event) and decrement counters         *
    *                                                                                 */
    // TODO API
    removeTask(task) {
      
      this.todoList.splice(this.todoList.findIndex((task2) => task.id === task2.id), 1);
 
      this.tasksCount--;
      this.tasksDoneCount = this.doneTasks.length;


    },
    /*                                                                                  *
    *       Update task from list by id (got via event) and decrement counters         *
    *       or increment, based on status.                                             *
    *                                                                                 */
    // TODO API
    updateTask(task) {
      if (task.status === true) {
        this.tasksDoneCount++
      } else {
        this.tasksDoneCount--;
      }
      this.todoList[this.todoList.findIndex((task2) => task.id === task2.id)].status = task.status;
    },

    toggleInput() {
      this.showInput = !this.showInput;
    }
  },

  
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

.addTaskDescription {
  float: left;
}

.dueTo {
  float: right;
}

.hidden {
  display: none;
}

.input-todo {
  width: 100%;
  height: 70px;
  background: #3498db;
  color: #ecf0f1;
  font-size: 24px;
  text-align: center;
  font-family: 'Nova Flat', cursive;
}

::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #ecf0f1;
  opacity: 1; /* Firefox */
}

:-ms-input-placeholder { /* Internet Explorer 10-11 */
  color: #ecf0f1;
}

::-ms-input-placeholder { /* Microsoft Edge */
  color: #ecf0f1;
}

.newTask input[type=text]:hover {

  background: #2980b9;
}

.datepicker {
  margin-left: 25px;
}

.tasksTodo {
  margin-top: 25px;
  border-width: 1px 0px 0px 0px;
  border-color: black;
  border-style: solid;
  box-shadow: -1px -1px 14px 5px grey;


}

.main {
  background-color: white;
  width: 50%;
  position: absolute;
  top: 5%;
  left: 25%;
  border-radius: 15px;
  box-shadow: -1px 4px 20px 7px grey;
  overflow: auto;
  padding-bottom: 50px;
  margin-bottom: 50px;
}

.noContent {
  padding-bottom: 50px;
}

.header {
  background-color: #3498db;
  padding-top: 20px;
  padding-bottom: 10px;
  margin-bottom: 35px;
  color: white;
}

.error {
  margin-bottom: 10px;
  background-color: #e74c3c;
  color: white;
}

.toggle-input {
  position: relative;
  background-color: #c0392b;
  border-radius: 30px;
  width: 50px;
  height: 50px;
  font-size: 30px;
  align-content: center;
  left: 48%;
  bottom: -32px;
  transform: rotate(0deg);
  transition: transform 0.2s ease-in;
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

.input-form {
  height: 0px;
  transition: height 0.5s ease-in;
  overflow: hidden;
}

.input-form.active {
  height: 100px;
  transition: height 0.5s ease-in;
  overflow: hidden;
}



</style>
