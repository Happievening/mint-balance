<template>
  <div class="content-wrapper">
    <div class="notes">
      <label
      >{{ title }}
        <input
            type="text"
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

@Component
export default class FormInput extends Vue {
  @Prop(String) readonly title!: string;
  @Prop(String) readonly value!: string;
  @Prop(String) readonly placeholder!: string;
  local = this.value;

  @Watch('local')
  onLocalUpdate(value: string, oldValue: string) {
    if (this.local.length <= 140) {
      this.$emit('update:value', value);
    } else {
      window.alert('备注超过了140字！');
      this.local = this.local.slice(0, 140);
    }
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
    box-shadow: 0 1px 3px rgb(0 0 0 / 25%);
    border-radius: 6px;
    background-color: white;
    margin: 12px 16px;
    font-size: 20px;
    display: flex;
    align-items: center;
    padding: 2px 6px;
    flex-grow: 1;

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