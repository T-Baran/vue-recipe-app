<script setup>
import SavedComponent from "../components/SavedComponent.vue";
import { useRecipeStore } from "../stores/recipes";

const recipeStore = useRecipeStore();
</script>

<template>
  <header>
    <p>Saved Recipes</p>
  </header>
  <div class="saved-container">
    <SavedComponent
      v-for="recipe in recipeStore.saved.saved"
      :key="recipe.label"
      :recipe="recipe"
    />
  </div>
</template>

<style scoped lang="scss">
@import "../assets/variables.scss";

header {
  @include flexCenter;
  height: 70px;
  padding-inline: 2rem;
  color: $main-color;
  margin-bottom: 3rem;
  & > * {
    font-size: 30px;
    font-weight: 700;
  }

  @include mediaBig {
    margin: 30px auto 30px;
    width: 50vw;
  }
}
.saved-container {
  @include recipeStyle;
}
</style>
