<template>
  <div class="nav-wrapper">
    <div class="content">
      <slot/>
    </div>
    <Nav/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Nav from './Nav.vue';
import {Component} from 'vue-property-decorator';

@Component({components: {Nav}})
export default class Layout extends Vue {

}
</script>

<style scoped lang="scss">
.nav-wrapper {
  height: 100vh !important;
  max-height: 100vh !important;
  display: flex;
  flex-direction: column;

  .content {
    overflow: hidden;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
}
</style>