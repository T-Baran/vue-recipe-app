<script setup>
import { reactive } from "vue";
import { useRecipeStore } from "../stores/recipes";
import CartIngredient from "./CartIngredient.vue";

const recipeStore = useRecipeStore();

const state = reactive({
  showIngredients: false,
});

const props = defineProps({
  name: String,
  ingredients: Array,
});

function removeFromCart() {
  recipeStore.removeFromCart(props.name);
  state.showIngredients = false;
}
</script>
<template>
  <div class="container">
    <div class="title-container">
      <fa v-if="state.showIngredients" class="icon" icon="angles-up" />
      <fa v-else class="icon" icon="angles-down" />
      <p @click="state.showIngredients = !state.showIngredients" class="title">
        {{ props.name }}
      </p>
      <fa @click="removeFromCart()" icon="x" />
    </div>
    <div class="ingredients-container">
      <ul v-if="state.showIngredients">
        <CartIngredient
          v-for="item in ingredients"
          :name="name"
          :ingredient="item"
          :key="item"
        />
      </ul>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "../assets/variables.scss";
.container {
  padding: 2rem;
  color: $main-color3;
}
.title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.8rem;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid $main-color;
  cursor: pointer;
}
.title {
  font-size: 20px;
  text-align: center;
  width: fit-content;
}
ul {
  /* display: flex; */
  /* flex-direction: column; */
  /* gap: 1rem; */
}
/* li {
  list-style-type: disc;
  margin-left: 1.2rem;
  padding: 0.5rem 0 0.5rem 0.3rem;
} */
.done {
  background-color: $main-color;
  color: #fff;
}
</style>
