<script setup>
import { reactive } from "vue";
import { useRecipeStore } from "../stores/recipes";
import SearchBar from "../components/SearchBar.vue";
import BasicSearch from "../components/BasicSearch.vue";

const recipeStore = useRecipeStore();

const state = reactive({
  startingMenu: {
    showAppetizers: false,
    showEntrees: true,
    showDesserts: false,
    showSearch: false,
    showRecipe: false,
  },
});
</script>

<template>
  <header>
    <p></p>
    <p class="title">Search Recipe</p>
    <fa
      @click="(state.showSearch = !state.showSearch), recipeStore.clearSearch()"
      class="icon"
      icon="magnifying-glass"
    />
  </header>

  <main>
    <div v-if="state.showSearch" class="search-bar">
      <SearchBar />
    </div>
    <div v-else>
      <BasicSearch />
    </div>
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

  @include mediaBig {
    margin: 30px 0 0 0;
    width: 50vw;
    margin-inline: auto;
    justify-content: center;
    gap: 2rem;
  }
}

.search-bar {
  width: 80vw;
  margin-inline: auto;
}
.title {
  font-size: 30px;
  font-weight: 700;
  margin-left: 2rem;
  @include mediaBig {
    margin: 0;
  }
}
.icon {
  width: 30px;
  height: 30px;
  cursor: pointer;
  transition: transform 0.4s;
}
.icon:hover {
  transform: scale(1.4);
}
</style>
