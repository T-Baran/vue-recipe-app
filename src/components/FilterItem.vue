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
    <transition name="fade">
      <div class="selector-container" v-if="state.showMenu">
        <div
          v-for="diet in props.data"
          :key="recipeStore.randomKey()"
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
    </transition>
  </div>
</template>
<style scoped lang="scss">
@import "../assets/variables.scss";
.container {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;

  & > * {
    color: $main-color3;
  }
}
.title-container {
  @include flexCenter;
  grid-column: span 2;
  gap: 1rem;
  margin-bottom: 1rem;
  .title {
    grid-column: 1/3;
    justify-self: center;
    color: $main-color;
    font-size: 24px;
  }
  .icon {
    color: $main-color;
  }
}
.selector-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
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

//transitions
.fade-enter-active {
  transition: opacity 0.5s ease;
}
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
