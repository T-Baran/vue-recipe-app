<script setup>
import { useRecipeStore } from "../stores/recipes";
import FilterItem from "./FilterItem.vue";
import CaloriesItem from "./CaloriesItem.vue";
import ExcludeItem from "./ExcludeItem.vue";

const recipeStore = useRecipeStore();

const dietType = [
  "Balanced",
  "High-fiber",
  "High-protein",
  "Low-carb",
  "Low-fat",
  "Low-sodium",
];
const cuisineType = [
  "American",
  "Asian",
  "Chinese",
  "Indian",
  "Italian",
  "Japanese",
  "Mexican",
  "Caribbean",
];
const mealType = ["Breakfast", "Dinner", "Lunch", "Snack"];
const healthType = [
  "gluten-free",
  "keto-friendly",
  "kidney-friendly",
  "low-sugar",
  "peanut-free",
  "vegan",
  "vegetarian",
  "wheat-free",
];
</script>
<template>
  <div>
    <FilterItem title="Diet Type" :data="dietType" route="dietType" />

    <FilterItem title="Cuisine Type" :data="cuisineType" route="cuisineType" />

    <FilterItem title="Meal Type" :data="mealType" route="mealType" />

    <FilterItem
      title="Health Restriction"
      :data="healthType"
      route="healthType"
    />
    <CaloriesItem title="Calories per serving" route="calories" />
    <ExcludeItem title="Exclude ingredients" />
    <button @click.prevent="recipeStore.clearAll()">Clear all</button>
  </div>
</template>
<style scoped lang="scss">
@import "../assets/variables.scss";

button {
  border: none;
  background-color: $main-color;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  padding: 0.5rem 0.75rem;
  border-radius: 10px;
  letter-spacing: 2px;
  display: block;
  margin-inline: auto;
}
</style>
