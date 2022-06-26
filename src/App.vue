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
  <header>
    <fa class="menu" icon="bars" @click="sideBar()" />
    <div class="wrapper" :class="{ hideLeft: !state.showSideBar }">
      <fa class="close" icon="x" @click="sideBar()" />
      <nav class="nav">
        <RouterLink to="/">Recipe Search</RouterLink>
        <RouterLink to="/about">Saved Recipes</RouterLink>
        <router-link to="/about">Shopping list</router-link>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped lang="scss">
.wrapper {
  background-color: rgb(200, 50, 50);
  width: 300px;
  height: 100vh;
  position: relative;
  transition: 0.5s;
}
.hideLeft {
  transform: translateX(-350px);
}
.menu {
  position: absolute;
  left: 15px;
  top: 15px;
  width: 40px;
  height: 40px;
}
.nav {
  display: flex;
  flex-direction: column;
  height: 300px;
  width: 100%;

  justify-content: space-around;
  align-items: start;

  font-size: 2rem;
  padding: 1rem;

  & * {
    color: rgb(230, 219, 219);
    text-decoration: none;
    font-weight: 700;
  }
}
.close {
  color: rgb(230, 219, 219);
  position: absolute;
  right: 15px;
  top: 15px;
  width: 30px;
  height: 30px;
}
</style>
