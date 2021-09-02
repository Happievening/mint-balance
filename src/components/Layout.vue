<template>
  <div class="nav-wrapper">
    <div class="content">
      <slot />
    </div>
    <Nav />
  </div>
</template>

<script lang="ts">
import Nav from "./Nav.vue";
export default {
  components: { Nav },
  name: "Layout",
};
</script>

<style scoped lang="scss">
.nav-wrapper {
  height: 100vh;
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