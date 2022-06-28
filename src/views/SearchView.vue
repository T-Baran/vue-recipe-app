<script setup>
import { reactive, onBeforeMount } from "vue";
import { useRecipeStore } from "../stores/recipes";
import RecipeComponent from "../components/RecipeComponent.vue";
import SearchBar from "../components/SearchBar.vue";

const recipeStore = useRecipeStore();

const state = reactive({
  startingMenu: {
    showAppetizers: false,
    showEntrees: true,
    showDesserts: false,
    showSearch: false,
  },
});

function chooseMenu(name) {
  state.startingMenu.showAppetizers = false;
  state.startingMenu.showEntrees = false;
  state.startingMenu.showDesserts = false;
  state.startingMenu[name] = true;
}

onBeforeMount(() => {
  recipeStore.fetchRecipe("entrees");
});

console.log(recipeStore.recipesData);
</script>

<template>
  <header>
    <p></p>
    <p class="title">Search Recipe</p>
    <fa
      @click="state.showSearch = !state.showSearch"
      class="icon"
      icon="magnifying-glass"
    />
  </header>

  <main>
    <div v-if="state.showSearch" class="search-bar">
      <SearchBar />
    </div>
    <div v-if="!state.showSearch" class="basic-menu">
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
    <RecipeComponent
      v-if="!state.showSearch"
      v-for="item in recipeStore.recipesData.hits"
      :data="item"
    />
  </main>
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
}
.search-bar {
  width: 80vw;
  margin-inline: auto;
}
.title {
  font-size: 30px;
  font-weight: 700;
  margin-left: 2rem;
}
.icon {
  width: 30px;
  height: 30px;
}
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
