<script setup>
import FilterOptions from "./FilterOptions.vue";
import RecipeComponent from "./RecipeComponent.vue";
import { reactive, onMounted } from "vue";
import { useRecipeStore } from "../stores/recipes";

const recipeStore = useRecipeStore();

const state = reactive({
  showFilter: false,
  searchValue: "",
  showRecipes: false,
  allowInfinite: true,
});

function searchRecipe() {
  recipeStore.fetchRecipe(state.searchValue, "new");
  state.searchValue = "";
  state.showRecipes = true;
  state.showFilter = false;
}

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
        recipeStore.fetchRecipe(state.searchValue);
      }

      state.allowInfinite = true;
    }, 1000);
  });
});
</script>
<template>
  <form>
    <input
      type="text"
      v-model="state.searchValue"
      @keydown.enter.prevent="searchRecipe()"
    />
    <p
      @click="state.showFilter = !state.showFilter"
      v-if="!state.showFilter"
      class="filters"
    >
      Show filters
      <fa icon="angles-down" />
    </p>
    <p @click="state.showFilter = !state.showFilter" v-else class="filters">
      Hide filters
      <fa icon="angles-up" />
    </p>
    <FilterOptions v-if="state.showFilter" />

    <button
      :disabled="recipeStore.stopSearch"
      @click.prevent="searchRecipe()"
      class="submit"
      type="submit"
    >
      Search
    </button>
  </form>
  <div v-if="state.showRecipes" class="recipes">
    <RecipeComponent v-for="item in recipeStore.recipesData" :data="item" />
  </div>
</template>
<style scoped lang="scss">
@import "../assets/variables.scss";

form {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 2rem;
  margin-top: 2rem;

  @include media {
    width: Clamp(600px, 50vw, 800px);
    margin-inline: auto;
  }
}

input {
  border: 1px solid $main-color;
  border-radius: 5px;
  padding: 0.45rem;
  color: $side-color;
  text-align: center;
  font-size: 20px;
}
.filters {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 7px;
  width: fit-content;
  margin-inline: auto;
  color: $main-color;
  cursor: pointer;
}
.submit {
  border: none;
  background-color: $main-color;
  color: #fff;
  font-size: 24px;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  letter-spacing: 2px;
  margin-bottom: 2rem;
}
.recipes {
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
