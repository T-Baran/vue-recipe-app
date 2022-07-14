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
  showAlert: false,
});

const recipeStore = useRecipeStore();
function test() {
  console.log(recipeStore.calories);
}

function compareCalories() {
  // console.log("porównać");
  // console.log(recipeStore.calories[0]);
  // console.log(recipeStore.calories[1]);
  if (recipeStore.calories[0] >= recipeStore.calories[1]) {
    state.showAlert = true;
    recipeStore.stopSearch = true;
  } else {
    state.showAlert = false;
    recipeStore.stopSearch = false;
  }
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
        type="number"
        v-model="recipeStore.calories[0]"
        @keydown.enter.prevent
        @input="compareCalories()"
        min="0"
      />
      <input
        type="number"
        v-model="recipeStore.calories[1]"
        @keydown.enter.prevent
        @input="compareCalories()"
        min="0"
      />
    </div>
    <p v-if="state.showAlert" class="alert">
      Second value must be greater than first!
    </p>
  </div>
</template>
<style scoped lang="scss">
@import "../assets/variables.scss";
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px 1px;

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
  margin-bottom: 1rem;
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
  justify-content: space-around;
  align-items: center;
  gap: 1rem;
  grid-column: span 2;
  /* flex-grow: 1; */

  input {
    font-size: 16px;
    width: 100%;
    text-align: center;
    color: $main-color3;
    border: 1px solid $main-color;
    border-radius: 5px;
    padding: 0.2rem;
  }
}
.alert {
  grid-column: span 2;
  color: $main-color;
  font-size: 20px;
  text-align: center;
}

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
