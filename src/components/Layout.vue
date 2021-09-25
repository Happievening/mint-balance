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
  display: flex;
  flex-direction: column;
  min-height: 100%;
  max-height: 100%;
  .content {
    overflow: hidden;
    flex-grow: 1;
    display: flex;
    flex-direction: column;
  }
}
</style>