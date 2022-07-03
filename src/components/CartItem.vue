<script setup>
import { reactive } from "vue";

const state = reactive({
  showIngredients: false,
});

const props = defineProps({
  name: String,
  ingredients: Array,
});
</script>
<template>
  <div class="container">
    <div class="title-container">
      <fa v-if="state.showIngredients" class="icon" icon="angles-up" />
      <fa v-else class="icon" icon="angles-down" />
      <p class="title">{{ props.name }}</p>
    </div>
    <div class="ingredients-container">
      <ul>
        <li v-for="item in props.ingredients">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "../assets/variables.scss";
.container {
  padding: 2rem;
  color: $main-color3;
}
.title-container {
  display: flex;
  justify-content: left;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.8rem;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid $main-color;
  cursor: pointer;
}
.title {
  font-size: 20px;
  text-align: left;
  width: fit-content;
}
ul {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
li {
  list-style-type: disc;
  margin-left: 1.2rem;
}
</style>
