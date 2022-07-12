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
});

const recipeStore = useRecipeStore();
</script>
<template>
  <div class="container">
    <div @click="state.showMenu = !state.showMenu" class="title-container">
      <p class="title">{{ props.title }}</p>

      <fa v-if="state.showMenu" class="icon" icon="angles-up" />
      <fa v-else class="icon" icon="angles-down" />
    </div>

    <div
      v-if="state.showMenu"
      v-for="diet in props.data"
      :key="diet"
      class="filter-type"
    >
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

.filter-type {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.5rem;
}
.checkbox {
  appearance: none;
  -webkit-appearance: none;
  background-color: inherit;
  height: 20px;
  width: 20px;
  border: 2px solid $main-color;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;
}
.checkbox:checked {
  background-color: $main-color;
}
</style>
