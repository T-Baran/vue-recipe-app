<script setup>
import { useRecipeStore } from "../stores/recipes";

const props = defineProps({
  data: Array,
  title: String,
  route: String,
});

const recipeStore = useRecipeStore();
</script>
<template>
  <div class="container">
    <p class="title">{{ props.title }}</p>
    <div v-for="diet in props.data" class="filter-type">
      <label :for="diet">{{ diet }}</label>
      <input
        class="checkbox"
        :value="diet"
        v-model="recipeStore[props.route]"
        type="checkbox"
        :id="diet"
      />
    </div>
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

.filter-type {
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
