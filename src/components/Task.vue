<template>
<div class="task" @mouseover="showRemove" @mouseout="hideRemove">
  <div class="done-box">
    <label class="custom-check-wrapper">
      <input type="checkbox"
           id="isDone" 
           v-model="status"
           @click="updateTask">
      <span class="custom-check"> </span>
    </label>
  </div>
  <div class="description">
    <div :class="{ 'line-through': status }">
      <slot></slot>
    </div>
  </div>
  <div class="date">
    <div class="days-left">
       <i class="far fa-clock clock" :class="isLate"> 
         <span class="date-info">{{date | readableDate}}</span> 
      </i> 
      {{date | daysleft}}
    </div>     
  </div>
  <div class="remove">
    <i class="fas fa-trash trash" 
       :class="{'hidden' : !toggleRemove}" 
       @click="removeTask">
    </i>
  </div>
</div>

</template>

<script>
export default {
  name: 'Task',
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
    // Return date
    readableDate: function(date) {
      return date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
    },
    daysleft: function(date) {
      let today = new Date();
      let diff = date - today;
      return "In " + Math.ceil(diff / (1000 * 60 * 60 * 24)) + " days";
    }
  },
  computed: {
    isLate() {
      let today = new Date();
      let diff = this.date - today;
      let daysLeft = Math.ceil(diff / (1000 * 60 * 60 * 24));
      if(daysLeft < 1) {
        return {'passed': true};
      } else if (daysLeft === 1) {
        return {'today': true}; 
      } else if (daysLeft > 1 && daysLeft <= 5) {
        return {'week': true};
      } else {
        return {'away': true};
      }
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
    },


  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
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

.description {
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

.trash {
  font-size: 24px;
  cursor: pointer;
}

.trash:hover {
  color: red;
}

.trash:active{
  color: #c0392b;
}

/* Special Properties */
.hidden {
  opacity: 0;
}

.line-through {
  text-decoration-line: line-through;
  color: grey;
}
/* Special Properties END */

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
