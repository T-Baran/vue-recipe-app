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
  textAreaNew: props.ingredient.text,
  updateName: false,
  modalIngredient: false,
});

function updateCart() {
  recipeStore.updateCart(props.name, props.ingredient.text);
  state.done = !state.done;
}

function updateCartName() {
  if (state.updateName === false) {
    state.updateName = true;
  } else {
    state.updateName = false;
    state.textArea = state.textAreaNew;
    recipeStore.updateCartName(
      props.name,
      props.ingredient.text,
      state.textAreaNew
    );
  }
}
function removeIngredient() {
  recipeStore.removeIngredient(props.name, props.ingredient.text);
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
    <li @dblclick="updateCart()">
      <p
        class="editable"
        contenteditable="true"
        spellcheck="false"
        v-if="state.updateName"
        @input="state.textAreaNew = $event.target.innerText"
      >
        {{ state.textArea }}
      </p>
      <p :class="{ done: state.done }" v-else>{{ state.textArea }}</p>
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
    transition: 0.5s;
  }
  .editable {
    outline: 1px solid $main-color;
    outline-offset: 8px;
    border-radius: 5px;
    color: $main-color3;
    text-decoration: none;
  }
}
.done {
  color: $main-color;
  text-decoration: line-through;
}

.buttons {
  display: flex;
  align-items: center;
}
button {
  @include flexCenter;
  background-color: inherit;
  border: none;
  transition: transform 0.2s;

  & > * {
    width: 25px;
    height: 25px;
    padding: 5px;
    color: $side-color;
  }
  &:hover {
    transform: scale(1.2);
  }
}
.delete {
  color: $main-color;
}
</style>
