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
  windowWidth: window.innerWidth,
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

// console.log(recipeStore.recipesData[0].label);
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
      :key="recipeStore.randomKey()"
      :shorten="true"
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

  @include mediaBig {
    width: Min(70vw, 1500px);
    margin: 1rem auto;
  }
  & > button {
    border: none;
    border-bottom: 2px solid inherit;
    background-color: inherit;
    color: $main-color3;
    transition: 0.1s;

    @include mediaBig {
      border-bottom: 2px solid #fff;
      font-size: 30px;
      &:hover {
        color: $side-color;
        /* font-weight: 700; */
        border-bottom: 2px solid $side-color;
      }
    }
  }
  .underline {
    color: $side-color;
    font-weight: 700;
    border-bottom: 2px solid $side-color;
  }
}
.container {
  @include recipeStyle;
}
</style>
