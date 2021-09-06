<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style lang="scss">
@import "@/assets/style/global.scss";
@import "@/assets/style/helper.scss";
#app {
  font-family: $font-hei;
  background-color: rgba(235, 237, 239, 0.28);
}
#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: $vue-green;
    }
  }
}
</style>
