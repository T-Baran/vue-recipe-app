<script setup>
import { reactive } from "vue";
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
  state.data = data;
  state.hidden = false;
}
</script>
<template>
  <div v-if="state.hidden" class="container">
    <div class="title-center">
      <p class="title">{{ props.recipe.label }}</p>
    </div>
    <p @click="fetchRecipe()" class="details">
      Load full recipe <fa icon="angles-down" />
    </p>
  </div>
  <div v-else>
    <RecipeComponent :data="state.data" :shorten="false" />
  </div>
</template>
<style scoped lang="scss">
@import "../assets/variables.scss";

.container {
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  align-items: center;
  margin-inline: auto;
  gap: 1rem;
  margin-bottom: 2rem;
  align-self: start;
}
.title-center {
  @include flexCenter;
  @include mediaMid {
    width: 100%;
    min-height: 80px;
  }
}
.title {
  font-size: 20px;
  font-weight: 500;
  color: $main-color;
  text-align: center;
  width: 300px;
}
.details {
  @include flexCenter;
  gap: 10px;
  color: $main-color3;
  cursor: pointer;
}
</style>
