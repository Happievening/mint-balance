<template>
  <div>
    <ul class="funcSwicter">
      <li class="func selected">支出</li>
      <li class="func">收入</li>
    </ul>
  </div>
</template>

<script lang="ts">
export default {
  name: "FuncSwitcher",
};
</script>

<style scoped lang="scss">
@import "@/assets/style/global.scss";
@import "@/assets/style/helper.scss";

.funcSwicter {
  display: flex;
  justify-content: space-around;
  width: 100vw;
  .func {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .selected {
    border: 1px solid $vue-green;
    border-top: none;
  }
}
</style>