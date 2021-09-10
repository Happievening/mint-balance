<template>
  <nav>
    <router-link to="/money" class="container" active-class="selected">
      <Icon name="money" />
      <div class="description">记账</div>
    </router-link>
    <router-link to="/details" class="container" active-class="selected">
      <Icon name="details" />
      <div class="description">明细</div>
    </router-link>
    <router-link to="/tags" class="container" active-class="selected">
      <Icon name="labels" />
      <div class="description">标签</div>
    </router-link>
    <router-link to="/statistics" class="container" active-class="selected">
      <Icon name="stats" />
      <div class="description">统计</div>
    </router-link>
  </nav>
</template>

<script lang="ts">
export default {
  name: "Nav",
};
</script>

<style scoped lang="scss">
@import "@/assets/style/global.scss";
@import "@/assets/style/helper.scss";

nav {
  display: flex;
  justify-content: space-around;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.25);
  padding: 3px 0;
  > .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 33.33333%;
    svg {
      width: 32px;
      height: 32px;
    }
    .description {
      font-size: 12px;
    }
  }
  a,
  a:visited {
    text-decoration: none;
    color: inherit;
  }
  .selected .description,
  .selected .icon {
    color: $vue-green;
  }
}
</style>