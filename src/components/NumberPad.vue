<template>
  <div class="content-wrapper">
    <div class="money-input">
      <Icon name="money" />
      <div class="input-value">{{ this.value }}</div>
    </div>
    <div class="numberPad">
      <button @click="addContent">7</button
      ><button @click="addContent">8</button
      ><button @click="addContent">9</button
      ><button @click="backspace"><Icon name="backspace" /></button
      ><button @click="addContent">4</button
      ><button @click="addContent">5</button>
      <button @click="addContent">6</button><button>-</button
      ><button @click="addContent">1</button
      ><button @click="addContent">2</button
      ><button @click="addContent">3</button><button>+</button
      ><button @click="clear">清空</button><button @click="addContent">0</button
      ><button @click="addContent">.</button
      ><button @click="ok"><Icon name="ok" /></button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
//使用第三方的组件导出库
import { Component, Prop } from "vue-property-decorator";
//TS必须使用class语法导出
//首先写@Component
@Component
export default class NumberPad extends Vue {
  @Prop(Number) number!: number;
  value = this.number.toString();
  addContent(event: MouseEvent) {
    if (event.target) {
      //as断言，强制指定类型
      const Button = event.target as HTMLButtonElement;
      let s = Button.textContent as string;
      //小数点后最多2位
      if (
        this.value.indexOf(".") === -1 ||
        this.value.length - this.value.indexOf(".") !== 3
      ) {
        //输入0时
        if (s === "0") {
          if (this.value === "0") {
            void 0;
          } else {
            this.value += s;
          }
        } else {
          if (s === ".") {
            if (this.value.indexOf(".") < 0) {
              this.value += s;
            }
          } else {
            if (this.value === "0") {
              this.value = s;
            } else {
              this.value += s;
            }
          }
        }
      }
    }
  }
  backspace(event: MouseEvent) {
    if (event.target) {
      if (this.value.length === 1) {
        this.value = "0";
      } else {
        this.value = this.value.substr(0, this.value.length - 1);
      }
    }
  }
  clear(event: MouseEvent) {
    if (event.target) {
      this.value = "0";
    }
  }
  ok() {
    this.$emit("update:number", parseFloat(this.value));
    this.$emit("ok");
    this.value = this.number.toString();
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/global.scss";
@import "@/assets/style/helper.scss";
.content-wrapper {
  padding: 0 4px;
  .money-input {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 12px 14px;
    .icon {
      width: 2em;
      height: 2em;
      display: flex;
      align-items: center;
    }
    .input-value {
      flex-grow: 1;
      font-family: $font-coding;
      font-size: 36px;
      text-align: right;
    }
  }
  .numberPad {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    width: 100vw;
    font-family: $font-hei;
    padding: 8px 10px;
    button {
      width: 25%;
      flex-grow: 1;
      font-size: 1.33em;
      padding: 16px 0;
    }
  }
}
</style>