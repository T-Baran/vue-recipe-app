<script setup>
import { reactive } from "vue";
import { useRecipeStore } from "../stores/recipes";

const recipeStore = useRecipeStore();

const dietType = [
  "balanced",
  "high-fiber",
  "high-protein",
  "low-carb",
  "low-fat",
  "low-sodium",
];

function print() {
  console.log(recipeStore.calculateFilter);
}
// const state = reactive({
//   checkbox: [],
// });
</script>
<template>
  <div class="container">
    <p class="title">Diet type</p>
    <div v-for="diet in dietType" class="diet-type">
      <label :for="diet">{{ diet }}</label>
      <input
        class="checkbox"
        :value="diet"
        v-model="recipeStore.dietType"
        type="checkbox"
        :id="diet"
      />
    </div>

    <p @click="print()">
      <!-- {{ recipeStore.dietType }} -->
    </p>
  </div>
</template>
<style scoped lang="scss">
@import "../assets/variables.scss";
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;

  & > * {
    color: $main-color3;
  }
}
.title {
  grid-column: 1/3;
  justify-self: center;
  color: $main-color;
  font-size: 24px;
  margin-bottom: 1rem;
}

.diet-type {
  display: flex;
  justify-content: space-between;
  padding: 0.5rem 1rem;
}
/* .checkbox { */
/* appearance: none;
  -webkit-appearance: none;
  background-color: inherit;
  height: 40px;
  width: 40px;
  background-color: $main-color;
  border-radius: 5px;
  cursor: pointer;
} */
</style>
