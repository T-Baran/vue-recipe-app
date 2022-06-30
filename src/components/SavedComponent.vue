<script setup>
import { reactive, onBeforeMount } from "vue";
import RecipeComponent from "./RecipeComponent.vue";

const state = reactive({
  hidden: true,
  data: {},
});

const props = defineProps({
  recipe: Object,
});

async function fetchRecipe() {
  const res = await fetch(props.recipe.url);
  const data = await res.json();
  console.log(data);
  state.data = data;
  state.hidden = false;
}

console.log(props.recipe);
</script>
<template>
  <div v-if="state.hidden" class="container">
    <p class="title">{{ props.recipe.label }}</p>
    <p @click="fetchRecipe()" class="details">
      Load full recipe <fa icon="angles-down" />
    </p>
  </div>
  <div v-else class="full-recipe">
    <RecipeComponent :data="state.data" />
  </div>
</template>
<style scoped lang="scss">
@import "../assets/variables.scss";

.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-inline: auto;
  gap: 1rem;
  margin-bottom: 2rem;
}
.title {
  font-size: 20px;
  font-weight: 500;
  color: $main-color;
  text-align: center;
  width: 300px;
}
.details {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  color: $main-color3;
  cursor: pointer;
}
</style>
