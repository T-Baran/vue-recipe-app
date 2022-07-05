<script setup>
import { reactive, onMounted } from "vue";
import { useRecipeStore } from "../stores/recipes";

const recipeStore = useRecipeStore();

const props = defineProps({
  ingredient: Object,
  name: String,
});

const state = reactive({
  done: false,
});

function updateCart() {
  console.log(props.ingredient.text);
  recipeStore.updateCart(props.name, props.ingredient.text);
  state.done = !state.done;
}

onMounted(() => {
  const search = recipeStore.cart.cart
    .find((item) => item.label === props.name)
    .ingredients.find((item) => item.text === props.ingredient.text);
  console.log(search);
  if (search.hasOwnProperty("done")) {
    state.done = true;
  }
});
</script>
<template>
  <div class="ingredients-container">
    <li :class="{ done: state.done }" @dblclick="updateCart()">
      {{ props.ingredient.text }}
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
  background-color: inherit;
  border: none;
  & > * {
    width: 25px;
    height: 25px;
    padding: 5px;
    color: $side-color;
  }
}
</style>
