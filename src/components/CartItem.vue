<script setup>
import { reactive } from "vue";
import { useRecipeStore } from "../stores/recipes";
import CartIngredient from "./CartIngredient.vue";
import CreateIngredient from "./CreateIngredient.vue";
import ModalDelete from "./ModalDelete.vue";

const recipeStore = useRecipeStore();

const state = reactive({
  showIngredients: false,
  edit: false,
  modalList: false,
});

const props = defineProps({
  name: String,
  ingredients: Array,
});

function removeFromCart() {
  recipeStore.removeFromCart(props.name);
  state.showIngredients = false;
}
</script>
<template>
  <ModalDelete
    v-if="state.modalList"
    @close="state.modalList = false"
    @delete="removeFromCart()"
    title="list"
  />
  <div class="container">
    <div
      @click="state.showIngredients = !state.showIngredients"
      class="title-container"
    >
      <fa v-if="state.showIngredients" class="icon" icon="angles-up" />
      <fa v-else class="icon" icon="angles-down" />
      <div class="title-center">
        <p class="title">
          {{ props.name }}
        </p>
      </div>
      <fa @click="state.modalList = true" icon="x" />
    </div>
    <Transition name="fade">
      <div v-if="state.showIngredients" class="ingredients-container">
        <div @click="state.edit = !state.edit" class="edit">
          <p v-if="!state.edit">Show edit options</p>
          <p v-else>Hide edit options</p>
        </div>
        <Transition name="fade">
          <CreateIngredient v-if="state.edit" :name="props.name" />
        </Transition>
        <ul>
          <CartIngredient
            v-for="item in ingredients"
            :name="props.name"
            :ingredient="item"
            :key="recipeStore.randomKey()"
            :edit="state.edit"
          />
        </ul>
      </div>
    </Transition>
  </div>
</template>
<style scoped lang="scss">
@import "../assets/variables.scss";
.container {
  padding: 2rem;
  color: $main-color3;
  width: Max(70%, 300px);
  @include mediaMid {
    padding: 0;
    width: 300px;
    margin-bottom: 2rem;
  }
}
.title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.8rem;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid $main-color;
  cursor: pointer;
}
.title-center {
  @include flexCenter;
  @include mediaMid {
    width: 100%;
    min-height: 80px;
  }
}
.title {
  font-size: 20px;
  text-align: center;

  overflow-wrap: anywhere;
}
.edit {
  @include flexCenter;
  gap: 1rem;
  color: $main-color;
  margin: 1rem 0;
  cursor: pointer;

  p {
    font-size: 20px;
  }
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
