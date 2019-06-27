<template>
    <div class="select-deadline">
        <div class="subtract" @click="subtractDays">
            <i class="fas fa-minus"></i>
        </div>
        <div class="days-selection">
            <span class="selection-text">in </span> {{deadline}} <span class="selection-text"> days </span>
        </div>
        <div class="add" @click="addDays">
            <i class="fas fa-plus"></i>
        </div>
    </div>
</template>


<script>
export default {
  name: 'Selectdeadline',
  components: {
    
  },
  props: {
      deadline: Number,
  },
  data: function () {
    return {
         
    }
  },
 
  computed: {
  
  },
  methods: {
      addDays() {
          this.$emit("add");
      },
      subtractDays() {
          this.$emit("subtract");
      }
      
  },

  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.select-deadline {
  margin-top: 15px;
  display: flex;
  position: relative;
  left: 38%;
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
</style>
