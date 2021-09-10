<template>
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
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";

@Component
export default class FormInput extends Vue {
  @Prop(String) readonly title!: string;
  @Prop(String) readonly value!: string;
  @Prop(String) readonly placeholder!: string;
  local = this.value;
  @Watch("local")
  onLocalUpdate(value: string, oldValue: string) {
    this.$emit("update:value", value);
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/global.scss";
@import "@/assets/style/helper.scss";
.notes {
  box-shadow: 3px 0 3px rgb(0 0 0 / 25%);
  background-color: white;
  margin-top: 24px;
  font-size: 20px;
  display: flex;
  align-items: center;
  padding: 8px 6px;
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
</style>