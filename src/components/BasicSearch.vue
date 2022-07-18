<script setup>
import { reactive, onBeforeMount, onMounted, onBeforeUnmount } from "vue";
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

function infiniteScrollFetch() {
  if (!state.allowInfinite) return;
  state.allowInfinite = false;
  setTimeout(() => {
    if (
      window.scrollY + window.innerHeight >=
      document.body.scrollHeight - 200
    ) {
      // console.log("testbasicview");
      recipeStore.fetchRecipe(state.query);
    }

    state.allowInfinite = true;
  }, 1000);
}

onBeforeMount(() => {
  recipeStore.fetchRecipe("entrees", "new");
});

onMounted(() => {
  window.addEventListener("scroll", infiniteScrollFetch);
  console.log("mounted");
});
onBeforeUnmount(() => {
  window.removeEventListener("scroll", infiniteScrollFetch);
  console.log("unmounted");
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
      Appetizer
    </button>
    <button
      :class="{ underline: state.startingMenu.showEntrees }"
      @click="
        chooseMenu('showEntrees'), recipeStore.fetchRecipe('main dish', 'new')
      "
    >
      Main Dish
    </button>
    <button
      :class="{ underline: state.startingMenu.showDesserts }"
      @click="
        chooseMenu('showDesserts'), recipeStore.fetchRecipe('dessert', 'new')
      "
    >
      Dessert
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
    width: Min(70vw, 1500px);
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
    width: Min(70vw, 1500px);
    margin-inline: auto;
  }
}
</style>
