import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export const useRecipeStore = defineStore({
  id: "recipes",
  state: () => ({
    saved: useLocalStorage("saved", {
      saved: [],
    }),
    // liked: [],
    recipesData: {},
    dietType: [],
    cuisineType: [],
    mealType: [],
    showRecipes: false,
  }),
  getters: {
    calculateFilterDiet: (state) => {
      return state.dietType.map((item) => {
        return "&diet=" + item.toLowerCase();
      });
    },
    calculateFilterCuisine: (state) => {
      return state.cuisineType.map((item) => {
        return "&cuisineType=" + item;
      });
    },
    calculateFilterMeal: (state) => {
      return state.mealType.map((item) => {
        return "&mealType=" + item;
      });
    },
  },
  actions: {
    async fetchRecipe(query) {
      this.showRecipes = false;
      const id = "5203a72b";
      const key = "83eb0b5b0b385cfaa6f37343d2dcece5";
      const res = await fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&beta=true&q=${query}&app_id=${id}&app_key=${key}&random=true${this.calculateFilterDiet.join(
          ""
        )}${this.calculateFilterCuisine.join(
          ""
        )}${this.calculateFilterMeal.join("")}`
      );

      const data = await res.json();
      this.recipesData = data;
      this.showRecipes = true;
    },
    clearAll() {
      this.dietType = [];
      this.cuisineType = [];
      this.mealType = [];
    },
    clearSearch() {
      this.clearAll();
      this.recipesData = [];
    },
    addToLiked(name, url) {
      let recipe = {
        label: name,
        url: url,
      };
      this.saved.saved.push(recipe);
    },
    removeFromLiked(label) {
      // console.log(this.saved.saved.filter((item) => item.label !== url));
      this.saved.saved = this.saved.saved.filter(
        (item) => item.label !== label
      );
    },
  },
});
