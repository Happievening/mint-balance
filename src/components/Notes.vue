<template>
  <div class="notes">
    <Icon name="notes"/>
    <label
    >备注
      <input
          type="text"
          placeholder="输入备注（140字内）"
          name="notes-value"
          v-model="local"
      />
    </label>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';

@Component
export default class Notes extends Vue {
  @Prop(String) readonly value!: string;
  local = this.value;

  @Watch('local')
  onLocalChanged(value: string, oldValue: string) {
    this.$emit('update:value', value);
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/style/global.scss";
@import "~@/assets/style/helper.scss";

.notes {
  box-shadow: 3px 0 3px rgb(0 0 0 / 25%);
  display: flex;
  align-items: center;
  padding: 2px 6px;

  label {
    flex-grow: 1;

    input {
      background-color: inherit;
    }
  }
}
</style>