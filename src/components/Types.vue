<template>
  <div>
    <ul class="type-list">
      <li :class="value === '-' && 'selected'" @click="switchType('-')">
        支出
      </li>
      <li :class="value === '+' && 'selected'" @click="switchType('+')">
        收入
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
//使用第三方的组件导出库
import { Component, Prop, Watch } from "vue-property-decorator";
//TS必须使用class语法导出

//首先写@Component
@Component
export default class Types extends Vue {
  //导入props
  //大写String->Vue校验； string|undefined->TS编译时校验
  @Prop(String) readonly value!: string;
  //函数参数必须指定类型
  switchType(type: string) {
    if (type !== "-" && type !== "+") {
      throw new Error("Type is unknown");
    } else {
      this.$emit("update:value", type);
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/style/global.scss";
@import "~@/assets/style/helper.scss";

.type-list {
  display: flex;
  justify-content: space-around;
  width: 100vw;
  min-width: 100vw;
  box-shadow: 0 0 3px rgb(0 0 0 / 25%);
  li {
    width: 50%;
    min-width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 0;
    font-size: 20px;
  }
  .selected {
    border-bottom: 2px solid $vue-green;
  }
}
</style>