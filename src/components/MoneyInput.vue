<template>
  <div class="money-input">
    <Icon name="money" />
    <input
      type="number"
      placeholder="0.00"
      name="money-value"
      id=""
      class="input-holder"
    />
  </div>
</template>

<script lang="ts">
export default {
  name: "MoneyInput",
};
</script>

<style scoped lang="scss">
@import "@/assets/style/global.scss";
@import "@/assets/style/helper.scss";
.money-input {
  .input-holder {
    font-family: $font-coding;
  }
}
</style>