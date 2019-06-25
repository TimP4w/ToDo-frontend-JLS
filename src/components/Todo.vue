<template>
<div class="task" @mouseover="showRemove" @mouseout="hideRemove">
  <div class="done-box">
    <label class="check">
      <input type="checkbox"
           id="isDone" 
           v-model="status"
           @click="updateTask">
      <span class="task-check"> </span>
    </label>
  </div>
  <div class="description">
    <div :class="{ 'done': status }">
      <slot></slot>
    </div>
  </div>
  <div class="date">
    <div>
       {{date | readable}}
    </div>
    <div class="days-left">
       {{date | daysleft}}
    </div>     
  </div>
  <div class="remove">
    <div :class="{'hidden' : !toggleRemove}" @click="removeTask">
      <i class="fas fa-trash"></i>
    </div>
  </div>
</div>

</template>

<script>
export default {
  name: 'ToDo',
  props: {
    id: Number,
    description: String,
    date: Date,
    status: Boolean,
    index: Number
  },
  data: function () {
    return {
      toggleRemove: false, 
    }
  },
  filters: {
    readable: function(value) {
      return value.getDay() + "/" + value.getMonth() + "/" + value.getFullYear();
    },
    daysleft: function(value) {
      let today = new Date();
      let diff = Math.abs(today - value);
      return Math.ceil(diff / (1000 * 60 * 60 * 24)) + " days left";
    }
  },
  methods: {
    showRemove() {
      this.toggleRemove = true;
    },
    hideRemove() {
      this.toggleRemove = false;
    },
    updateTask() {
      this.$emit("task-updated", {id: this.id, status: !this.status});
    },
    removeTask() {
      this.$emit("task-deleted", {id: this.id});
    }

  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

/* https://www.w3schools.com/howto/howto_css_custom_checkbox.asp */
.check {
  display: block;
  position: relative;
  cursor: pointer;
  border-radius: 10px;
  top: 10px;
}

.check input {
  opacity: 0;
}

.task-check {
  position: absolute;
  top: 20%;
  left: 20px;
  height: 25px;
  width: 25px;
  border-radius: 10px;
  border-style: solid;
}

.check:hover input ~ .task-check {
  background: rgb(17, 219, 10);
}

.task-check:after {
  content: "";
  position: absolute;
  display: none;
}

.check input:checked ~ .task-check:after {
  display: block;
}

.check .task-check:after {
  left: 9px;
  top: 5px;
  width: 5px;
  height: 10px;
  border: solid green;
  border-width: 0 3px 3px 0;
  -webkit-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
}

.task {
  display: flex;
  padding-top: 10px;
  padding-bottom: 10px;
  margin: auto;
  border-width: 1px 1px 1px 1px;
  border-color: black;
  border-style: solid;
  width: 50%;
  height: 35px;
  content: "";
  clear: both;
  display: table;
}

.done-box {
  width: 10%;
  float: left;
}

.description {
  width: 60%;
  float: left;
  content: "";
  clear: both;
  display: table;
}

.date {
  width: 20%;
  float: left;
}

.days-left {
  font-weight: bold;
}

.remove {
  width: 10%;
  float: right;
}

.done{
  text-decoration-line: line-through;
  color: grey;
}

.hidden {
  opacity: 0;
}

.fa-trash {
  font-size: 24px;
  cursor: pointer;
}

.fa-trash:hover {
  color: red;
}
</style>
