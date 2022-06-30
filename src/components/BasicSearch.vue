<script setup>
import { reactive, onBeforeMount } from "vue";
import { useRecipeStore } from "../stores/recipes";
import RecipeComponent from "./RecipeComponent.vue";

const recipeStore = useRecipeStore();

const state = reactive({
  startingMenu: {
    showAppetizers: false,
    showEntrees: true,
    showDesserts: false,
  },
  showRecipe: false,
});

function chooseMenu(name) {
  state.startingMenu.showAppetizers = false;
  state.startingMenu.showEntrees = false;
  state.startingMenu.showDesserts = false;
  state.startingMenu[name] = true;
  // state.showRecipe = true;
}

onBeforeMount(() => {
  recipeStore.fetchRecipe("entrees");
});
</script>
<template>
  <div class="basic-menu">
    <button
      :class="{ underline: state.startingMenu.showAppetizers }"
      @click="
        chooseMenu('showAppetizers'), recipeStore.fetchRecipe('appetizer')
      "
    >
      Appetizers
    </button>
    <button
      :class="{ underline: state.startingMenu.showEntrees }"
      @click="chooseMenu('showEntrees'), recipeStore.fetchRecipe('entrees')"
    >
      Entrees
    </button>
    <button
      :class="{ underline: state.startingMenu.showDesserts }"
      @click="chooseMenu('showDesserts'), recipeStore.fetchRecipe('dessert')"
    >
      Desserts
    </button>
  </div>
  <div v-if="recipeStore.showRecipes">
    <RecipeComponent
      v-for="item in recipeStore.recipesData.hits"
      :data="item"
      :key="item.label"
    />
  </div>
</template>
<style scoped lang="scss">
@import "../assets/variables.scss";
.basic-menu {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-inline: auto;
  height: 60px;
  width: 80vw;
  color: $main-color3;
  & > button {
    border: none;
    border-bottom: 2px solid inherit;
    background-color: inherit;
    color: $main-color3;
  }
  .underline {
    color: $side-color;
    font-weight: 700;
    border-bottom: 2px solid $side-color;
  }
}
</style>
