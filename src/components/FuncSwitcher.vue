<template>
  <div>
    <ul class="funcSwicter">
      <li :class="type === '-' && 'selected'" @click="switchType('-')">支出</li>
      <li :class="type === '+' && 'selected'" @click="switchType('+')">收入</li>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
//使用第三方的组件导出库
import { Component, Prop } from "vue-property-decorator";
//TS必须使用class语法导出
//首先写@Component
@Component
export default class FuncSwitcher extends Vue {
  type: string | undefined = "-";
  //导入props
  //大写String->Vue校验； string|undefined->TS编译时校验
  @Prop(String) readonly init: string | undefined;
  //函数参数必须指定类型
  switchType(type: string) {
    if (type !== "-" && type !== "+") {
      throw new Error("Type is unknown");
    }
    this.type = type;
  }
  mounted() {
    console.log(this.init);
    this.type = this.init;
  }
}
// JS写法
// export default {
//   name: "FuncSwitcher",
//   props: ["init"],
//   data(){
//     return {
//       type:""
//     }
//   },
//   mounted(){
//    this.type = this.init
//   },
//   methods: {
//     switchType(type){
//       if(type!=="-" && type!=="+")
//       {
//         throw new Error("Type is unknown")
//       }
//       this.type=type
//     }
//     }
// };
</script>

<style scoped lang="scss">
@import "@/assets/style/global.scss";
@import "@/assets/style/helper.scss";

.funcSwicter {
  display: flex;
  justify-content: space-around;
  width: 100vw;
  li {
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