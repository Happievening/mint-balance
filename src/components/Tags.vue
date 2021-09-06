<template>
  <div class="content-wrapper">
    <ul>
      <li
        v-for="tag in dataSource"
        :class="{ selected: selectedTags.indexOf(tag) >= 0 }"
        :key="tag"
        @click="toggleTag(tag)"
      >
        {{ tag }}
      </li>
    </ul>
    <button class="btn-add" @click="addTag">新增标签</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import tagListModel from "@/models/tagList";
@Component
export default class Tags extends Vue {
  dataSource = tagListModel.fetch();
  selectedTags: string[] = [];
  toggleTag(tag: string) {
    const index = this.selectedTags.indexOf(tag);
    index < 0
      ? this.selectedTags.push(tag)
      : this.selectedTags.splice(index, 1);
    this.$emit("update:tags", [...this.selectedTags]);
  }
  addTag() {
    const newTag = prompt("请输入新的tag名");
    if (newTag !== null) {
      if (newTag === "") {
        alert("标签名不能为空");
      } else if (this.dataSource) {
        // this.$emit("update:dataSource", [...this.dataSource, newTag]);
        tagListModel.create(newTag);
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/global.scss";
@import "@/assets/style/helper.scss";
.content-wrapper {
  flex-grow: 1;
  ul {
    display: flex;
    flex-wrap: wrap;
    overflow-y: scroll;
    > li {
      $h: 36px;
      $w: $h * 1.5;
      height: $h;
      border-radius: $h * 0.5;
      background-color: lightgrey;
      padding: 5px 16px;
      margin: 5px 8px;
      display: flex;
      justify-content: center;
      align-items: center;
      &.selected {
        background-color: $vue-green;
      }
    }
  }
  .btn-add {
    border-bottom: 1px solid;
    margin: 12px 8px;
    color: #d9d9d9;
  }
}
</style>