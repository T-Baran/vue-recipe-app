<script setup>
import { reactive, onBeforeMount, onMounted } from "vue";
import { useRecipeStore } from "../stores/recipes";
import RecipeComponent from "./RecipeComponent.vue";

const recipeStore = useRecipeStore();

const state = reactive({
  startingMenu: {
    showAppetizers: false,
    showEntrees: true,
    showDesserts: false,
  },
  allowInfinite: true,
  query: "entrees",
});

const nameToQuery = {
  showAppetizers: "appetizer",
  showDesserts: "dessert",
  showEntrees: "entrees",
};

function chooseMenu(name) {
  state.startingMenu.showAppetizers = false;
  state.startingMenu.showEntrees = false;
  state.startingMenu.showDesserts = false;
  state.startingMenu[name] = true;
  state.query = nameToQuery[name];
  // console.log(state.query);
  // state.showRecipe = true;
}

onBeforeMount(() => {
  recipeStore.fetchRecipe("entrees", "new");
});

onMounted(() => {
  window.addEventListener("scroll", () => {
    if (!state.allowInfinite) return;
    state.allowInfinite = false;
    setTimeout(() => {
      if (
        window.scrollY + window.innerHeight >=
        document.body.scrollHeight - 200
      ) {
        // console.log("test");
        recipeStore.fetchRecipe(state.query);
      }

      state.allowInfinite = true;
    }, 1000);
  });
});

console.log(recipeStore.recipesData);
</script>
<template>
  <div class="basic-menu">
    <button
      :class="{ underline: state.startingMenu.showAppetizers }"
      @click="
        chooseMenu('showAppetizers'),
          recipeStore.fetchRecipe('appetizer', 'new')
      "
    >
      Appetizers
    </button>
    <button
      :class="{ underline: state.startingMenu.showEntrees }"
      @click="
        chooseMenu('showEntrees'), recipeStore.fetchRecipe('entrees', 'new')
      "
    >
      Entrees
    </button>
    <button
      :class="{ underline: state.startingMenu.showDesserts }"
      @click="
        chooseMenu('showDesserts'), recipeStore.fetchRecipe('dessert', 'new')
      "
    >
      Desserts
    </button>
  </div>
  <div class="container">
    <RecipeComponent
      v-for="item in recipeStore.recipesData"
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

  @include media {
    width: 70vw;

    margin: 1rem auto;
  }
  & > button {
    border: none;
    border-bottom: 2px solid inherit;
    background-color: inherit;
    color: $main-color3;

    @include media {
      font-size: 30px;
    }
  }
  .underline {
    color: $side-color;
    font-weight: 700;
    border-bottom: 2px solid $side-color;
  }
}
.container {
  display: grid;
  grid-template-columns: 1fr;
  justify-content: center;
  justify-items: center;
  column-gap: 1rem;

  @include media {
    grid-template-columns: repeat(3, 1fr);
    width: 70vw;
    margin-inline: auto;
  }
}
</style>
