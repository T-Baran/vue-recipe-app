import { defineStore } from "pinia";

export const useRecipeStore = defineStore({
  id: "recipes",
  state: () => ({
    counter: 0,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    async fetchRecipe() {
      const id = "5203a72b";
      const key = "83eb0b5b0b385cfaa6f37343d2dcece5";
      const res = await fetch(
        "https://api.edamam.com/api/recipes/v2?type=public&q=chicken-soup&app_id=5203a72b&app_key=83eb0b5b0b385cfaa6f37343d2dcece5"
      );
      const data = await res.json();
      console.log(data);
    },
  },
});
