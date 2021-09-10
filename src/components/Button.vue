<template>
  <button class="btn"><slot /></button>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";

@Component
export default class Button extends Vue {
  name = "Button";
}
</script>

<style scoped lang="scss">
@import "@/assets/style/global.scss";
@import "@/assets/style/helper.scss";
.btn {
  background: $vue-green;
  border-radius: 4px;
  padding: 12px;
}
</style>