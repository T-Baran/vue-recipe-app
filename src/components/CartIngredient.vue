<script setup>
import { reactive, onMounted } from "vue";
import { useRecipeStore } from "../stores/recipes";
import ModalDelete from "./ModalDelete.vue";

const recipeStore = useRecipeStore();

const props = defineProps({
  ingredient: Object,
  name: String,
  edit: Boolean,
});

const state = reactive({
  done: false,
  textArea: props.ingredient.text,
  updateName: false,
  modalIngredient: false,
});

function updateCart() {
  console.log(props.ingredient.text);
  recipeStore.updateCart(props.name, props.ingredient.text);
  state.done = !state.done;
}

function updateCartName() {
  if (state.updateName === false) {
    state.updateName = true;
  } else {
    state.updateName = false;
    recipeStore.updateCartName(
      props.name,
      props.ingredient.text,
      state.textArea
    );
  }

  // console.log(state.updateName);
}
function removeIngredient() {
  recipeStore.removeIngredient(props.name, props.ingredient.text);
  console.log("wykonano");
}

onMounted(() => {
  const search = recipeStore.cart.cart
    .find((item) => item.label === props.name)
    .ingredients.find((item) => item.text === props.ingredient.text);
  console.log(search);
  if (search.hasOwnProperty("done")) {
    state.done = true;
  }
});
</script>
<template>
  <ModalDelete
    v-if="state.modalIngredient"
    @delete="removeIngredient()"
    @close="state.modalIngredient = false"
    title="ingredient"
  />
  <div class="ingredients-container">
    <li :class="{ done: state.done }" @dblclick="updateCart()">
      <textarea v-if="state.updateName" v-model="state.textArea"></textarea>
      <p v-else>{{ state.textArea }}</p>
    </li>
    <div class="buttons">
      <div class="buttons" v-if="props.edit">
        <button @click="state.modalIngredient = true">
          <fa class="delete" icon="xmark" />
        </button>
        <button @click="updateCartName()">
          <fa icon="pen-to-square" />
        </button>
      </div>
      <button v-else @click="updateCart()">
        <fa icon="shopping-cart" />
      </button>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "../assets/variables.scss";

.ingredients-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

li {
  list-style-type: disc;
  margin-left: 1.2rem;
  padding: 0.7rem 0 0.7rem 0.3rem;
  p {
    overflow-wrap: anywhere;
  }
  textarea {
    background-color: #fff;
    color: $side-color;
    /* padding: 1rem; */
    border-radius: 10px;
    border: 2px solid transparent;
    outline: 1px solid $main-color;
    outline-offset: 4px;
    line-height: 1.3;
    /* font-weight: 500; */
    transition: 0.2s;
    resize: none;

    &:focus {
      background-color: $main-color2;
      /* color: $main-color2; */
      /* outline: 1px solid $main-color; */
      /* outline-offset: 4px; */
      /* border-color: $main-color2; */
    }
    /* padding: 4px; */
    /* border: none; */
    /* box-shadow: 0 0 0px 5px $main-color; */
    /* outline: 1px solid $main-color; */
    /* outline-offset: 3px; */
    /* height: fit-content; */

    /* &:active { */
    /* outline: 1px solid $main-color; */
    /* outline-offset: 3px; */
    /* } */
  }
}
.done {
  /* background-color: $main-color; */
  color: $main-color;
  text-decoration: line-through;
}
.buttons {
  display: flex;
  align-items: center;
}
button {
  /* width: 35px; */
  /* height: 35px; */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: inherit;
  border: none;
  & > * {
    width: 25px;
    height: 25px;
    padding: 5px;
    color: $side-color;
  }
}
.delete {
  color: $main-color;
}
</style>
