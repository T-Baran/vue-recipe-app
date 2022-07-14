<script setup>
import { reactive } from "vue";
import { useRecipeStore } from "../stores/recipes";
import CartItem from "../components/CartItem.vue";
import CreateCart from "../components/CreateCart.vue";

const recipeStore = useRecipeStore();

const state = reactive({
  showCreate: false,
});
</script>

<template>
  <header>
    <p></p>
    <p class="title">Shopping List</p>
    <fa @click="state.showCreate = !state.showCreate" icon="pen-to-square" />
  </header>
  <div class="cart-container">
    <CreateCart class="add-cart" v-if="state.showCreate" />
    <CartItem
      v-for="item in recipeStore.cart.cart"
      key="item.label"
      :name="item.label"
      :ingredients="item.ingredients"
    />
  </div>
</template>

<style scoped lang="scss">
@import "../assets/variables.scss";

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 70px;
  padding-inline: 2rem;
  color: $main-color;
  margin-bottom: 3rem;

  @include media {
    padding: 120px 0 20px 0;
    width: 50vw;
    margin-inline: auto;
    justify-content: center;
    gap: 2rem;
  }

  & > * {
    font-size: 30px;
    font-weight: 700;
  }
  .title {
    margin-left: 1rem;
  }
}

.cart-container {
  @include recipeStyle;
}

.add-cart {
  grid-column: 1/-1;
}
</style>
