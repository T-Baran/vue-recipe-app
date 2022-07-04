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
</script>
<template>
  <div class="container">
    <div
      @click="state.showIngredients = !state.showIngredients"
      class="title-container"
    >
      <fa v-if="state.showIngredients" class="icon" icon="angles-up" />
      <fa v-else class="icon" icon="angles-down" />
      <p class="title">{{ props.name }}</p>
    </div>
    <div class="ingredients-container">
      <ul v-if="state.showIngredients">
        <CartIngredient
          v-for="item in ingredients"
          :name="name"
          :ingredient="item"
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
  justify-content: left;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.8rem;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid $main-color;
  cursor: pointer;
}
.title {
  font-size: 20px;
  text-align: left;
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
