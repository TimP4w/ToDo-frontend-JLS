<template>
<div class="task" @mouseover="showRemove" @mouseout="hideRemove">
  <div class="done-box">
    <label class="custom-check-wrapper">
      <input type="checkbox"
           id="isDone"
           v-model="isDone"
           @click="update">
      <span class="custom-check"> </span>
    </label>
  </div>
  <div class="title">
    <div :class="{ 'line-through': isDone }">
      {{ currentTask.title }}
    </div>
  </div>
  <div class="date">
    <div class="days-left">
       <i class="far fa-clock clock" :class="isLate" >
         <span class="date-info">{{ currentTask.date | readableDate }}</span>
      </i>
      {{ currentTask.date | daysleft }}
    </div>
  </div>
  <div class="remove">
    <TrashIcon @button-clicked="removeTask"></TrashIcon>
  </div>
</div>
</template>
<script>

import moment from "moment"
import TrashIcon from "./TrashIcon.vue"
import { mapGetters, mapActions } from "vuex"


export default {
  name: "BaseTask",
  components: {
    TrashIcon
  },
  props: {
    id: Number,
  },
  data: function () {
    return {
      toggleRemove: false,
      currentTask: Object,
      isDone: Boolean,
      isShowDate: false
    }
  },
  mounted() {
    this.currentTask = this.task(this.id);
    this.isDone = this.currentTask.done;
  },
  filters: {
    // Return date
    readableDate: function(date) {
      return moment(date).format("DD/MM/YYYY");
    },
    daysleft: function(date) {
      return moment(date).endOf("day").fromNow();
    }
  },
  computed: {
    ...mapGetters([
      "task",
    ]),

    isLate() {
      let myDate = moment(this.currentTask.date, "YYYY-MM-DD").toDate();
      let today = new Date();
      let diff = myDate - today;
      let daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24)) + 1;
      if(daysLeft < 1 && daysLeft !== 0) {
        return {"passed": true};
      } else if (daysLeft === 0) {
        return {"today": true};
      } else if (daysLeft > 1 && daysLeft <= 7) {
        return {"week": true};
      } else {
        return {"away": true};
      }
    }
  },
  methods: {
    ...mapActions([
      "updateTask",
      "deleteTask"
    ]),
    showRemove() {
      this.toggleRemove = true;
    },
    hideRemove() {
      this.toggleRemove = false;
    },
    update() {
      let newTask = this.currentTask;
      newTask.done = !this.currentTask.done;
      let data = {
        oldTask: this.currentTask,
        newTask: newTask
      }
      this.updateTask(data).then(updatedTask => {
        this.currentTask = updatedTask;
        this.isDone = updatedTask.done;
      });
    },
    removeTask() {
      this.deleteTask(this.currentTask);
    },
    showDate() {
      this.isShowDate = true;
    },
    hideDate() {
      this.isShowDate = false;
    }
  }
}
</script>

<style scoped>
/* Special Properties */
.hidden {
  opacity: 0;
}

.line-through {
  text-decoration-line: line-through;
  color: grey;
}
/* Special Properties END */

.task {
  display: flex;
  padding-top: 10px;
  padding-bottom: 10px;
  margin: auto;
  border-width: 0px 0px 1px 0px;
  border-color: #2c3e50;
  border-style: solid;
  width: 100%;
  height: 35px;
  display: table;
}

.task:last-child {
  border-width: 0px;
}

.title {
  width: 60%;
  float: left;
  clear: both;
  word-break: break-all;
}

.date {
  width: 30%;
  float: left;
}

.days-left {
  font-weight: bold;
}

.clock {
  position: relative;
  top: 10px;
}
.clock.today {
  color: #f1c40f;
}
.clock.week {
  color: #3498db;
}
.clock.away {
  color: #2ecc71;
}
.clock.passed {
  color: #e74c3c;
}

.date-info {
  position: relative;
  top: -22px;
  left: -40px;
  background-color: #2c3e50;
  border-radius: 10px;
  padding-right: 5px;
  padding-left: 5px;
  color: white;
  font-weight: bold;
}

.remove {
  width: 10%;
  float: right;
  position: relative;
  bottom: 8px;
}

/* https://www.w3schools.com/howto/howto_css_custom_checkbox.asp */
.custom-check-wrapper {
  display: block;
  position: relative;
  cursor: pointer;
  border-radius: 10px;
  top: 7px;
}

.custom-check {
  position: absolute;
  top: 20%;
  left: 20px;
  height: 25px;
  width: 25px;
  border-radius: 20px;
  border-style: solid;
  border-width: 1;
  border-color: #2c3e50;
}

.custom-check:after {
  content: "";
  position: absolute;
  display: none;
}

/* Hide normal checkbox */
.custom-check-wrapper input {
  opacity: 0;
}

/* When hovering custom-check-wrapper is checked then apply this to custom-check */
.custom-check-wrapper:hover input ~ .custom-check {
  background: #ecf0f1;
}

/* When input of custom-check-wrapper is checked then apply this to custom-check:after*/
.custom-check-wrapper input:checked ~ .custom-check:after {
  display: block;
}

/* Generate symbol */
.custom-check-wrapper .custom-check:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid green;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
}

.done-box {
  width: 10%;
  float: left;
}



</style>
