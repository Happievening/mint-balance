<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class App extends Vue {
  created(): void {
    this.$store.commit('retrieveRecord');
    this.$store.commit('retrieveTag');
  }

}
</script>

<style lang="scss">
@import "~@/assets/style/global.scss";
@import "~@/assets/style/helper.scss";

html, body, #app {
  height: 100%;
  min-height: 100%;
  max-height: 100%;
}

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
