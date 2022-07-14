<script setup>
import { reactive } from "vue";
import { useRecipeStore } from "../stores/recipes";

const props = defineProps({
  data: Array,
  title: String,
  route: String,
});

const state = reactive({
  showMenu: false,
  excludedIngredient: "",
});

const recipeStore = useRecipeStore();

function addExcludedIngredient() {
  recipeStore.addExcludedIngredient(state.excludedIngredient);
  state.excludedIngredient = "";
}
</script>
<template>
  <div class="container">
    <div @click="state.showMenu = !state.showMenu" class="title-container">
      <p class="title">
        {{ props.title }}
      </p>

      <fa v-if="state.showMenu" class="icon" icon="angles-up" />
      <fa v-else class="icon" icon="angles-down" />
    </div>
    <div v-if="state.showMenu" class="inputs">
      <input
        type="text"
        v-model="state.excludedIngredient"
        @keydown.enter.prevent="addExcludedIngredient()"
      />
      <button @click.prevent="addExcludedIngredient()">Add</button>
    </div>
    <div class="list">
      <div
        class="list-item"
        v-for="item in recipeStore.excludedIngredient"
        key="item"
      >
        <p>
          {{ item }}
        </p>
        <button @click.prevent="recipeStore.deleteExcludedIngredient(item)">
          <fa icon="xmark" />
        </button>
      </div>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "../assets/variables.scss";

.container {
  /* display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 1px; */

  & > * {
    color: $main-color3;
  }
}
.title-container {
  display: flex;
  justify-content: center;
  align-items: center;
  grid-column: span 2;
  gap: 1rem;
  margin-bottom: 1.5rem;
  .title {
    grid-column: 1/3;
    justify-self: center;
    color: $main-color;
    font-size: 24px;
    /* margin-bottom: 1rem; */
  }
  .icon {
    color: $main-color;
  }
}
.inputs {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  gap: 1rem;
  grid-column: span 2;

  input {
    font-size: 16px;
    width: 100%;
    text-align: center;
    color: $main-color3;
    border: 1px solid $main-color;
    border-radius: 5px;
    padding: 0.2rem;
  }
  button {
    border: none;
    background-color: $main-color;
    color: #fff;
    /* font-size: 24px; */
    font-weight: 500;
    padding: 0.5rem 1rem;
    border-radius: 10px;
    letter-spacing: 2px;
    margin-bottom: 2rem;
  }
}
.list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1rem;

  .list-item {
    display: flex;
    justify-content: space-around;
    gap: 0.7rem;
    background-color: $main-color;
    color: #fff;
    padding: 0.5rem 1rem;
    border-radius: 15px;
    width: 100%;
    overflow-wrap: anywhere;

    button {
      background-color: transparent;
      border: none;
      color: #fff;
    }
  }
}
</style>
