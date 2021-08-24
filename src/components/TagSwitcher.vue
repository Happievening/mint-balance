<template>
  <div>
    <ul>
      <li>衣</li>
      <li>食</li>
      <li>住</li>
      <li>行</li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: "TagSwitcher",
};
</script>

<style scoped lang="scss">
@import "@/assets/style/global.scss";
@import "@/assets/style/helper.scss";
ul {
  display: flex;
  > li {
    $height: 24px;
    $width: $height * 1.5;
    height: $height;
    width: $width;
    background-color: lightgrey;
    margin-right: $width * 0.5;
    text-align: center;
    border-radius: $width * 0.5;
  }
}
</style>