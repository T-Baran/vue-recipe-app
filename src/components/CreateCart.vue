<script setup>
import { reactive } from "vue";
import { useRecipeStore } from "../stores/recipes";

const recipeStore = useRecipeStore();

const state = reactive({
  name: "",
});

function addList() {
  recipeStore.addToCart(state.name, []);
  state.name = "";
}
</script>
<template>
  <form autocomplete="off">
    <label for="title">List Name</label>
    <input v-model="state.name" id="title" type="text" />
    <button @click.prevent="addList()" type="submit">Add</button>
  </form>
</template>
<style scoped lang="scss">
@import "../assets/variables.scss";

form {
  @include flexCenter;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
}
label {
  font-size: 20px;
  color: $main-color;
  font-weight: 500;
}
input {
  border: 1px solid $main-color3;
  border-radius: 5px;
  height: 2rem;
  width: 300px;
  color: $main-color3;
  text-align: center;
}
button {
  font-size: 24px;
  background-color: $main-color;
  border: none;
  border-radius: 10px;
  padding: 0.3rem 1rem;
  color: #fff;
  font-weight: 500;
}
</style>
