<template>
  <BaseContainer>
    <BaseHeader v-bind:title="'My ToDo List'">
      <p class="task-counter">
        <span class="count">{{tasksDoneCount}}</span> task(s) done out of <span class="count">{{tasksCount}}</span>
      </p>
      <div class="toggleButton">
        <ToggleButton @button-clicked="toggleInput" v-bind:toggled="showInput"> </ToggleButton>
      </div>
    </BaseHeader>
    <BaseError></BaseError>
    <div class="input-form" :class="{active: showInput}" >
    <form class="new-task-form" v-on:submit.prevent="addNewTask">
        <input id="description"
            type="text"
            v-model="newTaskDescription"
            autocomplete="off"
            placeholder="E.g. Complete the ToDo app">
        <div class="deadline-selection">
          <DeadlineSelector v-bind:deadline="deadline" @add="addDays" @subtract="subtractDays"> </DeadlineSelector>
        </div>
    </form>
    </div>
    <div class="no-content" v-if="tasksCount == 0">
      <h2> There are no tasks yet </h2>
      <span> Start by adding one </span>
    </div>
    <div v-if="tasksTodo.length > 0" class="tasks-todo">
      <BaseTask v-for="task in tasksTodo"
                v-bind:id="task._id"
                v-bind:key="task._id"
          > {{ task.desc }} </BaseTask>
    </div>
    <div class="tasks-done">
      <BaseTask v-for="task in tasksDone"
                v-bind:id="task._id"
                v-bind:key="task._id"
          > {{ task.desc }} </BaseTask>
    </div>
  </BaseContainer>
</template>


<script>
import BaseTask from '../ui/BaseTask.vue'
import BaseHeader from '../ui/BaseHeader.vue'
import BaseError from '../ui/BaseError.vue'
import BaseContainer from '../ui/BaseContainer.vue'
import ToggleButton from '../ui/ToggleButton.vue'
import DeadlineSelector from '../ui/DeadlineSelector.vue'
import moment from 'moment'
import {mapGetters, mapActions, mapMutations} from 'vuex'

export default {
  name: 'TodoView',
  components: {
    BaseTask,
    BaseHeader,
    BaseError,
    BaseContainer,
    ToggleButton,
    DeadlineSelector
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
  //Filtered lists methods
  computed: {
    ...mapGetters([
      "tasksDone",
      "tasksTodo",
      "tasksCount",
      "tasksDoneCount",
      "authToken"
    ]),
  },
  methods: {
    ...mapActions([
      "getTasks",
      "postNewTask"
    ]),
    ...mapMutations([
      "THROW_ERROR",
      "LOGOUT"
    ]),
    addNewTask() {
      //Check if input is empty
      if (this.newTaskDescription === "") {
        this.THROW_ERROR("Your task cannot be empty!");
      } else {
        let date = moment().add(this.deadline, "days").format("YYYY-MM-DD");
        let task = {
          description: this.newTaskDescription ,
          date: date,
        };
        this.postNewTask(task);
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
  mounted() {
    //Need a better solution here.
    let token = localStorage.getItem("token")
    if(token === "") {
        this.LOGOUT(token);
        this.$router.push({ name: "LoginView" });
    }
    else if(this.authToken) {
      this.getTasks();
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
  font-family: "Nova Flat", cursive;
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

.toggleButton {
  position: absolute;
  left: 48%;
  top: 8.8rem;
}

.deadline-selection {
  position: static;
  left: 0rem;
}
</style>
