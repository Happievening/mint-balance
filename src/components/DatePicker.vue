<template>
  <el-date-picker>

  </el-date-picker>

</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import dayjs from "dayjs";

@Component
export default class DatePicker extends Vue {



}
</script>

<style scoped lang="scss">
@import "~@/assets/style/global.scss";
@import "~@/assets/style/helper.scss";

.content-wrapper {
  display: flex;
  justify-content: center;

  .notes {
    border-radius: 6px;
    margin: 12px 16px;
    flex-grow: 1;
    background-color: white;
    font-size: 20px;
    display: flex;
    align-items: center;
    padding: 2px 6px;

    label {
      flex-grow: 1;
      padding: 8px;

      input {
        background-color: inherit;
        color: darken(white, 50%);
        font-size: 18px;
        font-family: inherit;
      }
    }
  }
}

</style>