import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export const useRecipeStore = defineStore({
  id: "recipes",
  state: () => ({
    saved: useLocalStorage("saved", {
      saved: [],
    }),
    cart: useLocalStorage("cart", {
      cart: [],
    }),
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
    removeFromLiked(name) {
      this.saved.saved = this.saved.saved.filter((item) => item.label !== name);
    },
    addToCart(name, ingredients) {
      if (this.cart.cart.find((item) => item.label === name)) return;
      let cart = {
        label: name,
        ingredients: ingredients,
      };
      console.log(cart);
      this.cart.cart.push(cart);
    },
    removeFromCart(name) {
      this.cart.cart = this.cart.cart.filter((item) => item.label !== name);
    },
    updateCart(name, ingredient) {
      const search = this.cart.cart
        .find((item) => item.label === name)
        .ingredients.find((item) => item.text === ingredient);

      console.log(search);
      if (!search.hasOwnProperty("done")) {
        search.done = true;
        console.log("powinno być true");
      } else {
        delete search.done;
      }
    },
    updateCartName(name, ingredient, newIngredient) {
      const search = this.cart.cart
        .find((item) => item.label === name)
        .ingredients.find((item) => item.text === ingredient);
      console.log(search);
      search.text = newIngredient;
    },
    addIngredient(name, newIngredient) {
      const search = this.cart.cart.find((item) => item.label === name);
      let item = {
        text: newIngredient,
      };
      console.log(search);
      search.ingredients = [...search.ingredients, item];
    },
    removeIngredient(name, ingredient) {
      this.cart.cart.find((item) => item.label === name).ingredients =
        this.cart.cart
          .find((item) => item.label === name)
          .ingredients.filter((item) => item.text !== ingredient);
    },
  },
});
