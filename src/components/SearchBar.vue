<script setup>
import FilterOptions from "./FilterOptions.vue";
</script>
<template>
  <form>
    <input type="text" />
    <p class="filters">
      Show filters
      <fa icon="angles-down" />
    </p>
    <FilterOptions />
    <button class="submit" type="submit">Search</button>
  </form>
</template>
<style scoped lang="scss">
@import "../assets/variables.scss";

form {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 2rem;
  margin-top: 2rem;
}

input {
  border: 1px solid $main-color;
  border-radius: 5px;
  padding: 0.45rem;
  color: $side-color;
  text-align: center;
}
.filters {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;
  width: fit-content;
  margin-inline: auto;
  color: $main-color;
  cursor: pointer;
}
.submit {
  border: none;
  background-color: $main-color;
  color: #fff;
  font-size: 24px;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  letter-spacing: 2px;
}
</style>
