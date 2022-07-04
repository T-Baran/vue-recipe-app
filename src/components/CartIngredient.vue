<script setup>
import { reactive } from "vue";
import { useRecipeStore } from "../stores/recipes";

const recipeStore = useRecipeStore();

const props = defineProps({
  ingredient: String,
  name: String,
});

const state = reactive({
  done: false,
});

function updateCart() {
  console.log("wykonać");
  recipeStore.updateCart(props.name, props.ingredient);
  state.done = !state.done;
}
</script>
<template>
  <div class="ingredients-container">
    <li :class="{ done: state.done }" @dblclick="updateCart()">
      {{ props.ingredient }}
    </li>
    <button @click="updateCart()">
      <fa icon="shopping-cart" />
    </button>
  </div>
</template>
<style scoped lang="scss">
@import "../assets/variables.scss";

.ingredients-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

li {
  list-style-type: disc;
  margin-left: 1.2rem;
  padding: 0.7rem 0 0.7rem 0.3rem;
}
.done {
  /* background-color: $main-color; */
  color: $main-color;
  text-decoration: line-through;
}
button {
  /* width: 35px; */
  /* height: 35px; */
  display: flex;
  justify-content: center;
  align-items: center;

  & > * {
    width: 20px;
    height: 20px;
    padding: 5px;
  }
}
</style>
