<template>
  <Container>
    <Header v-bind:title="'My ToDo List'">
      <p class="task-counter"> 
        <span class="count">{{$store.getters.tasksDoneCount}}</span> task(s) done out of <span class="count">{{$store.getters.tasksCount}}</span> 
      </p>
      <ToggleOpenCloseButton @button-clicked="toggleInput" v-bind:toggled="showInput"> </ToggleOpenCloseButton>
      <Logout></Logout>
    </Header>
    <Error></Error>
    <div class="input-form" :class="{active: showInput}" >
    <form class="new-task-form" v-on:submit.prevent="addNewTask">
        <input id="description" 
            type="text" 
            v-model="newTaskDescription"
            autocomplete="off"
            placeholder="E.g. Complete the ToDo app">
        <Selectdeadline v-bind:deadline="deadline" @add="addDays" @subtract="subtractDays"> </Selectdeadline>
    </form>
    </div>
    <div class="no-content" v-if="$store.getters.tasksCount == 0"> 
      <h2> There are no tasks yet </h2>
      <span> Start by adding one </span>
    </div>
    <div class="tasks-todo">
      <Task v-for="task in $store.getters.tasksTodo"
          v-bind:id="task.id" 
          v-bind:key="task.id"
      > {{ task.desc }} </Task>
    </div>
    <div class="tasks-done">
      <Task v-for="task in $store.getters.tasksDone" 
          v-bind:id="task.id" 
          v-bind:key="task.id"
          > {{ task.desc }} </Task>
    </div>
  </Container>
</template>


<script>
import Task from '../ui/Task.vue'
import Header from '../ui/Header.vue'
import Error from '../ui/Error.vue'
import Logout from '../ui/Logout.vue'
import Container from '../ui/Container.vue'
import ToggleOpenCloseButton from '../ui/ToggleOpenCloseButton.vue'
import Selectdeadline from '../ui/Selectdeadline.vue'
import moment from 'moment'

export default {
  name: 'Todo',
  components: {
    Task,
    Header,
    Error,
    Container,
    ToggleOpenCloseButton,
    Logout,
    Selectdeadline
  },
  props: {
  },
  data: function () {
    return {
      newTaskDescription: "", // holder for input data
      showInput: false,
      deadline: 5,      
    }
  },
  mounted() {
    if(this.$store.getters.authToken) {
      this.$store.dispatch("getTasks");
    }

  },
  //Filtered lists methods
  computed: {
    tasksDoneList() {
      return this.$store.getters.tasksDone;
    },
    tasksTodoList() {
      return this.tasksList.filter(function(task) {
        return task.status !== true
      });
    }
  },
  methods: {
    addNewTask() {
      //Check if input is empty
      if (this.newTaskDescription === "") {
        this.$store.commit("THROW_ERROR", "Your task cannot be empty!");
      } else {
        let date = new Date();
        date.setDate(date.getDate() + this.deadline);
        let formattedDate = moment(date).format("YYYY-MM-DD");
      
        let task = {
          description: this.newTaskDescription ,
          date: formattedDate,
        };

        this.$store.dispatch("postNewTask", task)
        .catch(e => {
          this.$store.commit("THROW_ERROR", "Something went wrong");
        });

        this.newTaskDescription = ""

      }
    },
    toggleInput() {
      this.showInput = !this.showInput;
    },
    addDays() {
      this.deadline++;
    },
    subtractDays() {
      if (this.deadline > 1) {
        this.deadline--;
      }
    }
  },

  
}
</script>

<style scoped>
.no-content {
  padding-bottom: 50px;
}

.count {
  font-size: 30px;
}

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

.tasks-todo {
  margin-top: 25px;
  box-shadow: 0px 0px 14px 1px grey;
}
</style>
