<template>
  <div class="page-footer">
    <div class="container">
      <a href="#/money">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-money"></use></svg
        >记账
      </a>
    </div>
    <div class="container">
      <a href="#/labels">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-labels"></use></svg
        >标签
      </a>
    </div>
    <div class="container">
      <a href="#/statistics">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-stats"></use></svg
        >统计
      </a>
    </div>
  </div>
</template>
s
<script lang="ts">
</script>
<script src="@/assets/script/icon.js"></script>

<style scoped lang="scss">
.page-footer {
  height: 42px;
  width: 100%;
  position: fixed;
  bottom: 0;
  border-top: 1px solid lightgrey;
  background-color: rgba(255, 255, 255, 0.97);
  overflow: hidden;
  z-index: 1;
  a {
    text-decoration: none;
  }
  position: fixed;
  bottom: 20px;
  display: flex;
  justify-content: space-around;
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
    .icon {
      width: 1em;
      height: 1em;
      vertical-align: -0.15em;
      fill: currentColor;
      overflow: hidden;
    }
  }
}
</style>