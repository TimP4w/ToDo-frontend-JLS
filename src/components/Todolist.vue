<template>
  <div class="main">
    <h1> My ToDo List </h1>
    <div class="info">
      <p class="task-counter"> 
        <span class="count">{{tasksDoneCount}}</span> task(s) done out of <span class="count">{{tasksCount}}</span> 
      </p>
    </div>
    <form class="newTask" v-on:submit.prevent="addNewTask">
        <input id="description" 
            type="text" 
            class="input-todo" 
            v-model="newTask"
            placeholder="E.g. Complete the ToDo app">
    </form>
    <div v-if="tasksCount == 0"> 
      <h2> There are no tasks yet </h2>
      <span> Start by adding one </span>

    </div>
    <ToDo v-for="task in toDoTasks" 
        v-bind:id="task.id" 
        v-bind:date="task.date"
        v-bind:description="task.desc"
        v-bind:status="task.status"
        v-bind:key="task.id"
        @task-updated="updateTask" 
        @task-deleted="removeTask"> {{ task.desc }} </ToDo>
    <ToDo v-for="task in doneTasks" 
        v-bind:id="task.id" 
        v-bind:date="task.date"
        v-bind:description="task.desc"
        v-bind:status="task.status"
        v-bind:key="task.id"
        @task-updated="updateTask" 
        @task-deleted="removeTask"> {{ task.desc }} </ToDo>
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
  width: 50%;
  height: 50px;
  margin-bottom: 25px;
  font-size: 24px;
  border-radius: 10px;
  text-align: center;
}

.newTask input[type=text]:hover {
  background: rgba(207, 201, 201, 0.253);
}

.datepicker {
  margin-left: 25px;
}

</style>
