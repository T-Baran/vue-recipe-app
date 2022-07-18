<script setup>
import { RouterLink, RouterView } from "vue-router";
import { reactive } from "vue";

const state = reactive({
  showSideBar: false,
});

function sideBar() {
  state.showSideBar = !state.showSideBar;
  console.log(state.showSideBar);
}
</script>

<template>
  <div class="app">
    <fa class="menu-main" icon="bars" @click="sideBar()" />
    <div class="wrapper-main" :class="{ hideLeftMain: !state.showSideBar }">
      <fa class="close-main" icon="x" @click="sideBar()" />
      <nav class="nav-main">
        <p class="title">Recipe App</p>
        <RouterLink to="/" @click="sideBar()">Recipe Search</RouterLink>
        <RouterLink to="/saved" @click="sideBar()">Saved Recipes</RouterLink>
        <Router-link to="/cart" @click="sideBar()">Shopping List</Router-link>
        <div class="edamam" id="edamam-badge" data-color="white"></div>
      </nav>
    </div>

    <RouterView />
  </div>
</template>

<style scoped lang="scss">
@import "./assets/variables.scss";

.app {
  overflow: hidden;
}
.wrapper-main {
  background-color: $main-color;
  width: 300px;
  height: 100vh;
  position: absolute;
  transition: 0.5s;
  z-index: 3;

  @include media {
    width: 100%;
    height: 75px;
    position: static;
  }
}
.hideLeftMain {
  transform: translateX(-350px);

  @include media {
    transform: translateX(0px);
  }
}
.menu-main {
  position: absolute;
  left: 15px;
  top: 15px;
  width: 40px;
  height: 40px;
  color: $main-color;
  cursor: pointer;
  @include media {
    display: none;
  }
}
.nav-main {
  display: grid;
  grid-template-columns: 1fr;
  height: 100vh;
  width: 100%;
  align-content: start;
  row-gap: 2rem;

  font-size: 1.5rem;
  padding: 1rem;

  & * {
    color: $main-color2;
    text-decoration: none;
    font-weight: 700;
  }
  & *:focus {
    outline: none;
  }

  @include media {
    grid-template-columns: 2fr 1fr 1fr 1fr 2fr;
    /* flex-direction: row; */
    /* align-items: center; */
    justify-items: center;
    align-content: center;
    align-items: center;
    height: 100%;
    gap: 3rem;
  }
}
.close-main {
  color: $main-color2;
  position: absolute;
  right: 15px;
  top: 15px;
  width: 30px;
  height: 30px;

  @include media {
    display: none;
  }
}
.title {
  margin-bottom: 2rem;
  @include media {
    margin: 0;
    font-size: 32px;
  }
}
.edamam {
  position: absolute;
  bottom: 1rem;
  @include media {
    position: static;
    justify-self: right;
    margin-right: 10px;
  }
}
</style>
