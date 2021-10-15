<template>
  <div class="content-wrapper">
    <div class="notes">
      <label
      >{{ title }}
        <input
            type="date"
            :placeholder="placeholder"
            name="notes-value"
            v-model="local"
        />
      </label>
    </div>
  </div>

</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';
import dayjs from "dayjs";

@Component
export default class FormInput extends Vue {
  @Prop(String) readonly title!: string;
  @Prop(String) readonly value!: string;
  @Prop(String) readonly placeholder!: string;

  local = this.value;

  @Watch('local')
  onLocalUpdate(value: string, oldValue: string) {
    this.$emit('update:value', value);
  }
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