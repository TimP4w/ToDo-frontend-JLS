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
    <div class="error" v-if="isError">
      <h3> Oops. </h3>
      <span>{{error_message}}</span>
    </div>
    <div class="input-form" :class="{active: showInput}" >
    <form class="new-task-form" v-on:submit.prevent="addNewTask">
        <input id="description" 
            type="text" 
            v-model="newTaskDescription"
            autocomplete="off"
            placeholder="E.g. Complete the ToDo app">
          <div class="select-deadline">
            <div class="subtract" @click="subtractDays">
              <i class="fas fa-minus"></i>
            </div>
            <div class="days-selection">
              {{deadline}} <span class="selection-text"> days </span>
            </div>
            <div class="add" @click="addDays">
              <i class="fas fa-plus"></i>
            </div>
          </div>
    </form>
    </div>
    <div class="no-content" v-if="tasksCount == 0"> 
      <h2> There are no tasks yet </h2>
      <span> Start by adding one </span>

    </div>
    <div class="tasks-todo">
      <Task v-for="task in tasksTodoList" 
          v-bind:id="task.id" 
          v-bind:date="task.date"
          v-bind:description="task.desc"
          v-bind:status="task.status"
          v-bind:key="task.id"
          @task-updated="updateTask" 
          @task-deleted="removeTask"> {{ task.desc }} </Task>
    </div>
    <div class="tasks-done">
      <Task v-for="task in tasksDoneList" 
          v-bind:id="task.id" 
          v-bind:date="task.date"
          v-bind:description="task.desc"
          v-bind:status="task.status"
          v-bind:key="task.id"
          @task-updated="updateTask" 
          @task-deleted="removeTask"> {{ task.desc }} </Task>
    </div>
  </div>
</template>


<script>
import Task from './Task.vue'

export default {
  name: 'Todo',
  components: {
    Task
  },
  props: {
  },
  data: function () {
    return {
      nextId: 4, // only for testing before API implementation
      newTaskDescription: "", // holder for input data
      tasksList: [],
      tasksCount: 0,
      tasksDoneCount: 0,
      errorMessage: "",
      isError: false,
      showInput: false,
      deadline: 5,      
    }
  },
  mounted() {

    //TODO Make GET request to retrieve data
  
    let date1 = new Date(); // only for testing
    let date2 = new Date(); // only for testing
    let date3 = new Date(); // only for testing
    let date4 = new Date(); // only for testing

    date1.setDate(date1.getDate() + 1);
    date2.setDate(date2.getDate() + 5);
    date3.setDate(date3.getDate() + 8);
    date4.setDate(date4.getDate() - 2);

    console.log(date1);

    this.tasksList = [
        {id: 1, desc: "Lorem ipsum dolor sic amet", status: false, date: date1},
        {id: 2, desc: "Another todo thing", status: false, date: date2},
        {id: 3, desc: "This is getting repetitive", status: true, date: date3},
        {id: 4, desc: "This should be expired", status: true, date: date4},
      ];

    // Initialize counters
    this.tasksCount = this.tasksList.length;
    // count every task with status true (=done)
    this.tasksDoneCount = this.tasksList.filter(function(task) {return task.status === true}).length; 
  },
  //Filtered lists methods
  computed: {
    /*                                                                    *
    *       Returns a list with the tasks with status == true             *
    *                                                                     */
    tasksDoneList() {
      return this.tasksList.filter(function(task) {
        return task.status === true
      });
    },
    /*                                                                    *
    *       Returns a list with the tasks with status == false            *
    *                                                                     */
    tasksTodoList() {
      return this.tasksList.filter(function(task) {
        return task.status !== true
      });
    }
  },
  methods: {
    /*                                                                    *
    *       Add a new Task to the list with date +5 days                  *
    *                                                                     */
    addNewTask() {
      //Check if input is empty
      if (this.newTaskDescription === "") {
        this.isError = true;
        this.errorMessage = "Your task cannot be empty!";
      } else {
        let date = new Date();
        date.setDate(date.getDate() + this.deadline); // Add 5 days to current date

        this.tasksList.push({
          id: this.nextId++,
          desc: this.newTaskDescription,
          status: false,
          date: date,
        })

        this.newTaskDescription = "";
        this.tasksCount++;
        this.isError = false;
      }
    },
    /*                                                                                  *
    *       Remove task from list by id (got via event) and decrement counters          *
    *                                                                                   */
    // TODO API
    removeTask(task) {
      this.tasksList.splice(this.tasksList.findIndex((task2) => task.id === task2.id), 1);
      this.tasksCount--;
      this.tasksDoneCount = this.tasksDoneList.length;
    },
    /*                                                                                  *
    *       Update task from list by id (got via event) and decrement counters          *
    *       or increment, based on status.                                              *
    *                                                                                   */
    // TODO API
    updateTask(task) {
      if (task.status === true) {
        this.tasksDoneCount++
      } else {
        this.tasksDoneCount--;
      }
      this.tasksList[this.tasksList.findIndex((task2) => task.id === task2.id)].status = task.status;
    },

    /*                                     *
    *           Toggle input form          *
    *                                      *
    *                                      */
    toggleInput() {
      this.showInput = !this.showInput;
    },
    /*                                     *
    *           Add Days to deadline       *
    *                                      *
    *                                      */
    addDays() {
      this.deadline++;
    },
    /*                                     *
    *       Subtract Days to deadline      *
    *                                      *
    *                                      */
    subtractDays() {
      if (this.deadline > 1) {
        this.deadline--;
      }
    }
  },

  
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
}

.error {
  margin-bottom: 10px;
  background-color: #e74c3c;
  color: white;
}

.no-content {
  padding-bottom: 50px;
}

.header {
  background-color: #3498db;
  padding-top: 20px;
  padding-bottom: 10px;
  margin-bottom: 35px;
  color: white;
}

.count {
  font-size: 30px;
}

/* Toggle input button */
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
/* ==================== */

/* Input Form */
.input-form {
  height: 0px;
  transition: height 0.5s ease-in;
  overflow: hidden;
}

.input-form.active {
  height: 150px;
  transition: height 0.5s ease-in;
  overflow: hidden;
}

.new-task-form input[type=text]:hover {
  background: #3498db;
}

.new-task-form input {
  width: 100%;
  height: 70px;
  background: #2980b9;
  color: #ecf0f1;
  font-size: 24px;
  text-align: center;
  font-family: 'Nova Flat', cursive;
  border-width: 0;
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

.select-deadline {
  margin-top: 15px;
  display: flex;
  position: relative;
  left: 37%;
}

.add {
  float: left;
  font-size: 40px;
  margin-left: 10px;
  padding-left: 5px;
  padding-right: 5px;
  height: 50px;
  border-radius: 10px;
  background-color: #3498db;
  color: white;
  cursor: pointer;
}

.subtract {
  margin-right: 10px;
  font-size: 40px;
  height: 50px;
  border-radius: 10px;
  background-color: #3498db;
  color: white;
  cursor: pointer;
  padding-left: 5px;
  padding-right: 5px;
}

.add:hover {
  background-color: #2980b9;
}

.subtract:hover {
  background-color: #2980b9;
}

.add:active {
  background-color: #2671a3;
}

.subtract:active {
  background-color: #2671a3;
}

.days-selection {
  font-size: 40px;
}

.selection-text {
  font-size: 20px;
}
/* ==================== */

.tasks-todo {
  margin-top: 25px;
  box-shadow: 0px 0px 14px 1px grey;
}
</style>
