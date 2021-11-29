<template>
  <div class="title">
    <slot />
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';

@Component
export default class Title extends Vue {

}
</script>

<style scoped lang="scss">
@import "~@/assets/style/global.scss";
@import "~@/assets/style/helper.scss";
.title {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 1.5em;
  font-size: 24px;
  padding: 1em 0;
  box-shadow: 0 0 3px rgb(0 0 0 / 20%);
  background-color: $theme-color;
  color: white;
}

</style>
