<script setup></script>
<template>
  <form>
    <input type="text" />
    <button type="submit">Search</button>
  </form>
  <p>Show filters</p>
</template>
<style scoped lang="scss">
@import "../assets/variables.scss";
input {
  border: 1px solid $main-color;
  border-radius: 5px;
  padding: 3px;
  color: $side-color;
}
button {
  border: none;
  background-color: $main-color;
  color: #fff;
  font-weight: 500;
}
</style>
