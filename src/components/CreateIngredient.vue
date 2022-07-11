<script setup>
import { reactive } from "vue";
import { useRecipeStore } from "../stores/recipes";

const recipeStore = useRecipeStore();

const state = reactive({
  name: "",
});

const props = defineProps({
  name: String,
});

function addIngredient() {
  if (state.name === "") return;
  recipeStore.addIngredient(props.name, state.name);
  state.name = "";
  console.log("coś powinno sie pokazać");
}
</script>
<template>
  <form>
    <label for="title">Ingredient Name</label>
    <input v-model="state.name" id="title" type="text" />
    <button @click.prevent="addIngredient()" type="submit">Add</button>
  </form>
</template>
<style scoped lang="scss">
@import "../assets/variables.scss";

form {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 1rem;
  margin: 1.5rem 0;
}
label {
  font-size: 18px;
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
  font-size: 20px;
  background-color: $main-color;
  border: none;
  border-radius: 10px;
  padding: 0.3rem 1rem;
  color: #fff;
  font-weight: 500;
}
</style>
