import { defineStore } from "pinia";

export const useRecipeStore = defineStore({
  id: "recipes",
  state: () => ({
    recipesData: {},
  }),
  getters: {
    // doubleCount: (state) => state.counter * 2,
  },
  actions: {
    async fetchRecipe(query) {
      const id = "5203a72b";
      const key = "83eb0b5b0b385cfaa6f37343d2dcece5";
      const res = await fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${id}&app_key=${key}&random=true`
      );
      const data = await res.json();
      this.recipesData = data;
      console.log(this.recipesData);
    },
  },
});
