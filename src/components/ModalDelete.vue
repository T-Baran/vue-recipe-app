<script setup>
const props = defineProps({
  title: String,
});
</script>
<template>
  <div @click="$emit('close')" class="modal-container">
    <div class="box">
      <h2>Delete {{ props.title }}</h2>
      <p>
        Are you sure you want to delete this {{ props.title }}? This will remove
        the {{ props.title }}
        and can't be undone.
      </p>
      <div class="button-selection">
        <button @click="$emit('delete')">yes, delete</button>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
@import "../assets/variables.scss";
.modal-container {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
}
.box {
  width: min(90vw, 400px);
  background-color: #fff;
  color: $main-color3;
  padding: 2rem;
  border-radius: 10px;
  h2 {
    margin-bottom: 1rem;
    text-align: center;
    font-size: 20px;
  }
  p {
    line-height: 1.5rem;
    margin-bottom: 1rem;
  }
}
.button-selection {
  width: 100%;
  display: flex;
  justify-content: center;
  align-content: center;
  button {
    padding: 0.75rem 0.75rem;
    font-size: 18px;
    color: white;
    border-radius: 10px;
    background-color: $main-color;
    border: none;
    text-transform: uppercase;
  }
}
</style>
