<template>
  <div class="content-wrapper">
    <div class="money-input">
      <Icon name="money"/>
      <div class="input-value">
        {{ this.value }}
      </div>
    </div>
    <div class="numberPad">
      <button @click="addContent">
        <div>7</div>
      </button
      >
      <button @click="addContent">
        <div>8</div>
      </button
      >
      <button @click="addContent">
        <div>9</div>
      </button
      >
      <button @click="backspace">
        <div>
          <Icon name="backspace"/>
        </div>

      </button
      >
      <button @click="addContent">
        <div>4</div>
      </button
      >
      <button @click="addContent">
        <div>5</div>
      </button>
      <button @click="addContent">
        <div>6</div>
      </button
      >
      <button @click="addContent">
        <div>-</div>
      </button
      >
      <button @click="addContent">
        <div>1</div>
      </button
      >
      <button @click="addContent">
        <div>2</div>
      </button
      >
      <button @click="addContent">
        <div>3</div>
      </button
      >
      <button @click="addContent">
        <div>+</div>
      </button>
      <button @click="clear">
        <div>清空</div>
      </button
      >
      <button @click="addContent">
        <div>0</div>
      </button
      >
      <button @click="addContent">
        <div>.</div>
      </button
      >
      <button @click="action">
        <div>
          <Icon :name="iconName"/>
        </div>
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Dialog, Toast} from 'vant';
//使用第三方的组件导出库
import {Component, Prop} from 'vue-property-decorator';
//TS必须使用class语法导出
//首先写@Component
@Component
export default class NumberPad extends Vue {
  @Prop(Number) number!: number;
  value = this.number.toString();
  iconName = 'ok';
  isInputInit = true;
  stack: Array<number | string> = [];
  plusOrMinus = false;

  addContent(event: MouseEvent) {
    if (event.target) {
      //as断言，强制指定类型
      const Button = event.target as HTMLButtonElement;
      let s = Button.textContent as string;
      //输入加减号
      if ('+-'.indexOf(s) >= 0) {
        if (this.stack.length === 0) {
          this.stack.push(parseFloat(this.value), s);
          this.plusOrMinus = true;
          this.iconName = 'equal';
        }
      } else {
        if (this.value.length > 12) {
          Toast('最多输入12个字符（含小数点）哦！');
        } else {
          //输入其他字符
          //首先判断是否处在加减模式下
          if (this.plusOrMinus) {
            //如果是，第一个字符替换原来的字符串，解除加减模式
            if (s === '.') {
              this.value = '0' + s;
            } else {
              this.value = s;
            }
            this.plusOrMinus = false;
          } //不是加减模式之下
          else if (s === '0') {
            //输入0的情况
            if (this.value === '0') {
              void 0;
            } else {
              if (
                  this.value.indexOf('.') < 0 ||
                  this.value.length - this.value.lastIndexOf('.') < 3
              ) {
                this.value += s;
              } else {
                Toast('小数点后最多2位哦！');
              }
            }
            //输入其他字符的情况下
          } else {
            if (s === '.') {
              console.log();
              if (this.value.indexOf('.') < 0) {
                this.value += s;
              } else {
                Toast('小数点不能输太多次哦！');
              }
            } else {
              if (
                  this.value.indexOf('.') < 0 ||
                  this.value.length - this.value.lastIndexOf('.') < 3
              ) {
                if (this.value === '0') {
                  this.value = s;
                } else {
                  this.value += s;
                }
              } else {
                Toast('小数点后最多2位哦！');
              }
            }
          }
        }
      }
    }
  }

  backspace(event: MouseEvent) {
    if (event.target) {
      if (this.value.length === 1) {
        this.value = '0';
      } else {
        this.value = this.value.substr(0, this.value.length - 1);
      }
    }
  }

  clear(event: MouseEvent) {
    if (event.target) {
      this.value = '0';
      this.stack = [];
      this.iconName = 'ok';
    }
  }

  ok() {
    if (this.value === '0') {
      Dialog.confirm({
        title: '',
        message: '金额好像是0哦！你确定要录入吗？',
      })
          .then(() => {
            this.stack.push(parseFloat(this.value));
            this.$emit('update:number', this.value);
            this.$emit('ok');
            this.value = this.number.toString();
            this.plusOrMinus = false;
          })
          .catch(() => {
            // on cancel
          });
    } else {
      this.stack.push(parseFloat(this.value));
      this.$emit('update:number', this.value);
      this.$emit('ok');
      this.value = this.number.toString();
      this.plusOrMinus = false;
    }
  }

  action() {
    if (this.iconName === 'ok') {
      this.ok();
    }
    if (this.iconName === 'equal') {
      this.stack.push(parseFloat(this.value));
      console.log('stack:' + this.stack);
      this.value = (
          Math.floor(eval(this.stack.join('')) * 100) / 100
      ).toString();
      this.value.replace(/\.$/, '.00');
      this.stack.length = 0;
      this.iconName = 'ok';
    }
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/style/global.scss";
@import "~@/assets/style/helper.scss";

.content-wrapper {
  padding: 0 4px;

  .money-input {
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding: 12px 14px;
    border-radius: 6px;
    background-color: white;
    margin: 12px 12px;

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
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }

  .numberPad {
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    width: 100vw;
    font-family: $font-hei;
    padding: 8px 6px;

    button {
      width: calc(25% - 12.5px);
      flex-grow: 0;
      font-size: 1.33em;
      margin: 4px 5px 4px 5px;
      background-color: #fff;
      border-radius: 5px;
      border: 1px solid lightgray;

      div {
        padding: 10px;
        display: flex;
        justify-content: center;
        align-items: center;
        vertical-align: center;
      }
    }
  }
}
</style>