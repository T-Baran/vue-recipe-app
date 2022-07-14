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
      <p class="title">
        {{ props.name }}
      </p>
      <fa @click="state.modalList = true" icon="x" />
    </div>
    <div v-if="state.showIngredients" class="ingredients-container">
      <div @click="state.edit = !state.edit" class="edit">
        <p v-if="!state.edit">Show edit options</p>
        <p v-else>Hide edit options</p>
      </div>
      <CreateIngredient v-if="state.edit" :name="props.name" />
      <ul>
        <CartIngredient
          v-for="item in ingredients"
          :name="props.name"
          :ingredient="item"
          :key="item.text"
          :edit="state.edit"
        />
      </ul>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "../assets/variables.scss";
.container {
  padding: 2rem;
  color: $main-color3;
  width: Max(70%, 300px);
  @include media {
    padding: 0;
    width: 300px;
    margin-bottom: 2rem;
  }
}
.title-container {
  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 1rem;
  margin-bottom: 0.8rem;
  padding-bottom: 0.5rem;
  border-bottom: 3px solid $main-color;
  cursor: pointer;
  /* width: 100%; */
}
.title {
  font-size: 20px;
  text-align: center;
  /* width: fit-content; */
  overflow-wrap: anywhere;

  @include media {
    width: 20vw;
  }
}
.edit {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  color: $main-color;
  margin: 1rem 0;
  cursor: pointer;

  p {
    font-size: 20px;
  }
}
</style>
