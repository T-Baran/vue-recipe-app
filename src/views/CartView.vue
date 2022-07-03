<script setup>
import SavedComponent from "../components/SavedComponent.vue";
import { useRecipeStore } from "../stores/recipes";
import CartItem from "../components/CartItem.vue";

const recipeStore = useRecipeStore();

console.log(recipeStore.cart.cart[0].ingredients);
</script>

<template>
  <header>
    <p>Shopping List</p>
  </header>
  <div v-for="item in recipeStore.cart.cart" key="item.label">
    <CartItem :name="item.label" :ingredients="item.ingredients" />
  </div>
</template>

<style scoped lang="scss">
@import "../assets/variables.scss";

header {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70px;
  padding-inline: 2rem;
  color: $main-color;
  margin-bottom: 3rem;
  & > * {
    font-size: 30px;
    font-weight: 700;
  }
}
</style>
