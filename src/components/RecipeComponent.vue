<script setup>
import { reactive, onMounted } from "vue";
import { useRecipeStore } from "../stores/recipes";
import ModalDelete from "./ModalDelete.vue";

const recipeStore = useRecipeStore();

const state = reactive({
  like: false,
  modalLike: false,
  modalCart: false,
  cart: false,
  shortened: false,
  newIngredientList: [],
  showFullIngredients: false,
  windowWidth: window.innerWidth > 650,
});

const props = defineProps({
  data: Object,
  shorten: Boolean,
  token: String,
});

function addToLiked() {
  if (state.like) {
    state.modalLike = true;
  } else {
    state.like = true;
    recipeStore.addToLiked(
      props.data.recipe.label,
      props.data._links.self.href
    );
  }
}
function afterModalDeleteLike() {
  state.like = false;
  recipeStore.removeFromLiked(props.data.recipe.label);
}
function addToCart() {
  if (state.cart) {
    state.modalCart = true;
  } else {
    recipeStore.addToCart(
      props.data.recipe.label,
      props.data.recipe.ingredients
    );
    state.cart = true;
  }

  if (state.like === false) addToLiked();
}
function afterModalDeleteCart() {
  state.cart = false;
  recipeStore.removeFromCart(props.data.recipe.label);
}

onMounted(() => {
  if (
    recipeStore.saved.saved.some((item) => {
      return item.label === props.data.recipe.label;
    })
  ) {
    state.like = true;
  }
  if (
    recipeStore.cart.cart.some((item) => {
      return item.label === props.data.recipe.label;
    })
  ) {
    state.cart = true;
  }
  if (props.shorten && state.windowWidth) {
    if (props.data.recipe.ingredientLines.length > 4) {
      state.newIngredientList = props.data.recipe.ingredientLines.slice(0, 4);
      state.shortened = true;
    } else {
      state.newIngredientList = [...props.data.recipe.ingredientLines];
    }
  } else {
    state.showFullIngredients = true;
  }
});
</script>
<template>
  <ModalDelete
    @delete="afterModalDeleteLike()"
    @close="state.modalLike = false"
    v-if="state.modalLike"
    title="recipe"
  />
  <ModalDelete
    @delete="afterModalDeleteCart()"
    @close="state.modalCart = false"
    v-if="state.modalCart"
    title="list"
  />
  <div class="container">
    <button
      @click="addToLiked()"
      :class="{ liked: state.like }"
      class="like-button"
    >
      <fa icon="heart" />
    </button>

    <button
      @click="addToCart()"
      :class="{ liked: state.cart }"
      class="like-button cart"
    >
      <fa icon="cart-shopping" />
    </button>
    <img
      class="recipe-image"
      :src="props.data.recipe.images.REGULAR.url"
      alt="food photo"
    />
    <div class="data-container">
      <div class="flex-center">
        <p class="recipe-label">{{ props.data.recipe.label }}</p>
      </div>
      <div class="parameters-container">
        <div class="parameters-item">
          <fa class="icon" icon="bowl-food" />
          <p>{{ Math.round(props.data.recipe.calories) }} kcal</p>
        </div>
        <div class="parameters-item">
          <fa class="icon" icon="users" />
          <p>{{ props.data.recipe.yield }}</p>
        </div>
        <div class="parameters-item">
          <fa class="icon" icon="hourglass" />
          <p>{{ props.data.recipe.totalTime }} min</p>
        </div>
      </div>

      <p class="cuisine">Cuisine: {{ props.data.recipe.cuisineType[0] }}</p>
      <div class="ingredients-list">
        <p class="ingredients-header">Ingredients list:</p>
        <div
          @dblclick="state.showFullIngredients = !state.showFullIngredients"
          v-if="props.shorten"
        >
          <ul v-if="!state.showFullIngredients">
            <li v-for="ingredient in state.newIngredientList" :key="ingredient">
              {{ ingredient }}
            </li>
          </ul>
          <ul v-else>
            <li
              v-for="ingredient in props.data.recipe.ingredientLines"
              :key="ingredient"
            >
              {{ ingredient }}
            </li>
          </ul>
        </div>
        <div v-else>
          <ul>
            <li
              v-for="ingredient in props.data.recipe.ingredientLines"
              :key="ingredient"
            >
              {{ ingredient }}
            </li>
          </ul>
        </div>
      </div>
      <div :class="{ ingredientsButtonHidden: !state.shortened }">
        <button
          v-if="!state.showFullIngredients"
          @click="state.showFullIngredients = !state.showFullIngredients"
          class="ingredients-button"
        >
          Show full list of ingredients
        </button>
        <button
          v-else
          @click="state.showFullIngredients = !state.showFullIngredients"
          class="ingredients-button"
        >
          Hide full list of ingredients
        </button>
      </div>
      <button class="button">
        <a target="_blank" :href="props.data.recipe.url"
          >Click for detailed instructions</a
        >
      </button>
    </div>
  </div>
</template>
<style scoped lang="scss">
@import "../assets/variables.scss";
.container {
  width: 300px;
  min-height: fit-content;
  margin-inline: auto;
  box-shadow: 0 0 30px -15px $side-color2;
  border-radius: 25px;
  margin-bottom: 2rem;
  overflow: hidden;
  position: relative;
}
.like-button {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 50px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background-color: transparent;
  border: 2px solid #fff;
  color: #fff;
  transition: 0.3s;
  & > * {
    width: 60%;
    height: 60%;
  }
}
.like-button:hover {
  background-color: $main-color;
}
.cart {
  top: 80px;
}

.liked {
  background-color: $main-color;
}
.data-container {
  @include flexCenter;
  flex-direction: column;
  gap: 1.5rem;
  padding: 2rem 1rem;
}
.recipe-image {
  width: 300px;
  height: 300px;
  font-size: 0px;
}
.flex-center {
  min-height: 60px;
  @include flexCenter;
}
.recipe-label {
  text-align: center;
  color: $main-color;
  font-size: 20px;
  font-weight: 700;
}
.parameters-container {
  display: flex;
  justify-content: space-around;
  width: 100%;
}
.parameters-item {
  display: flex;
  gap: 0.5rem;
  & > * {
    color: $main-color3;
  }
}
.cuisine {
  color: $main-color3;
  font-weight: 500;
}
.ingredients-list {
  color: $main-color3;

  ul {
    min-height: 205px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 15px;
  }
  li,
  p {
    margin-bottom: 0.5rem;
    text-align: center;
  }
}
.ingredients-header {
  font-size: 20px;
  font-weight: 500;
  padding-bottom: 0.5rem;
}
.button {
  border: none;
  background-color: $main-color;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  outline: none;

  a,
  p {
    color: #fff;
    text-decoration: none;
  }
}
.ingredients-button {
  border: none;
  background-color: inherit;
  color: $main-color;
}
.ingredientsButtonHidden {
  visibility: hidden;
}
</style>
