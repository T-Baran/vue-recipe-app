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
  <fa class="menu-main" icon="bars" @click="sideBar()" />
  <div class="wrapper-main" :class="{ hideLeftMain: !state.showSideBar }">
    <fa class="close-main" icon="x" @click="sideBar()" />
    <nav class="nav-main">
      <RouterLink to="/">Recipe Search</RouterLink>
      <RouterLink to="/about">Saved Recipes</RouterLink>
      <router-link to="/about">Shopping List</router-link>
    </nav>
  </div>

  <RouterView />
</template>

<style lang="scss">
@import "./assets/variables.scss";

.wrapper-main {
  background-color: $main-color;
  width: 300px;
  height: 100vh;
  position: absolute;
  transition: 0.5s;

  @include media {
    width: 100vw;
    height: 75px;
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

  @include media {
    display: none;
  }
}
.nav-main {
  display: flex;
  flex-direction: column;
  height: 300px;
  width: 100%;

  justify-content: space-around;
  align-items: start;

  font-size: 2rem;
  padding: 1rem;

  & * {
    color: $main-color2;
    text-decoration: none;
    font-weight: 700;
  }

  @include media {
    flex-direction: row;
    align-items: center;
    height: 100%;
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
</style>
