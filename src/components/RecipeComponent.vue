<script setup>
import { reactive, onBeforeMount, onMounted } from "vue";
import { useRecipeStore } from "../stores/recipes";

const recipeStore = useRecipeStore();

const state = reactive({
  like: false,
});

const props = defineProps({
  data: Object,
});

function addToLiked() {
  if (state.like) {
    state.like = false;
    // recipeStore.removeFromLiked(props.data._links.self.href);
    recipeStore.removeFromLiked(props.data.recipe.label);
    // console.log("chce usunąć");
  } else {
    state.like = true;
    recipeStore.addToLiked(
      props.data.recipe.label,
      props.data._links.self.href
    );
  }
}
// console.log(props.data);
onMounted(() => {
  if (
    recipeStore.saved.saved.some((url) => {
      return url.label === props.data.recipe.label;
    })
  ) {
    state.like = true;
  }
});
</script>
<template>
  <div class="container">
    <button
      @click="addToLiked()"
      :class="{ liked: state.like }"
      class="like-button"
    >
      <fa icon="heart" />
    </button>
    <img
      class="recipe-image"
      :src="props.data.recipe.images.REGULAR.url"
      alt="food photo"
    />
    <div class="data-container">
      <p class="recipe-label">{{ props.data.recipe.label }}</p>
      <div class="time-calories">
        <div class="calories-item">
          <fa class="icon" icon="bowl-food" />
          <p>{{ Math.round(props.data.recipe.calories) }} kcal</p>
        </div>
        <div class="calories-item">
          <fa class="icon" icon="hourglass" />
          <p>{{ props.data.recipe.totalTime }} min</p>
        </div>
      </div>

      <p class="cuisine">Cuisine: {{ props.data.recipe.cuisineType[0] }}</p>
      <div class="ingredients-list">
        <p>Ingredients list:</p>
        <ul>
          <li v-for="ingredient in props.data.recipe.ingredientLines">
            {{ ingredient }}
          </li>
        </ul>
      </div>
      <button class="seeMore">
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
  min-height: 700px;
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

.liked {
  background-color: $main-color;
}
.data-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  padding: 2rem 1rem;
}
.recipe-image {
  width: 300px;
  height: 300px;
  font-size: 0px;
}
.recipe-label {
  text-align: center;
  color: $main-color;
  font-size: 20px;
  font-weight: 700;
}
.time-calories {
  display: flex;
  justify-content: space-around;
  width: 100%;
}
.calories-item {
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
    list-style: disc;
  }
  li,
  p {
    margin-bottom: 0.5rem;
    text-align: center;
  }
}
.seeMore {
  border: none;
  background-color: $main-color;
  padding: 0.5rem 1rem;
  border-radius: 10px;
  outline: none;

  a {
    color: #fff;
    text-decoration: none;
  }
}
</style>
