<template>
<div class="field">
  <input :type="type"
        :placeholder="placeholder"
        @input="$emit('input', $event.target.value)">
</div>
</template>


<script>

export default {
  name: "BaseInput",
  props: {
      type: String,
      placeholder: String
  }
}
</script>

<style scoped>

input:hover {
  background: #3498db;
}

input {
  width: 40%;
  height: 2rem;
  background: #2980b9;
  color: #ecf0f1;
  font-size: 24px;
  text-align: center;
  font-family: 'Nova Flat', cursive;
  border-width: 0;
  border-radius: 10px;
  box-shadow: 3px 4px 8px 0px grey;

}

::placeholder { /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: #ecf0f183;
  opacity: 1; /* Firefox */
}

.field {
  padding-bottom: 1rem;
}

</style>
