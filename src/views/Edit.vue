<template>
  <Layout>
    <div class="content-wrapper">
      <div class="title">
        <router-link to="/labels"><Icon name="arrow-left" /></router-link
        >编辑标签
      </div>
    </div>

    <div>{{ tagname }}</div>
    <button class="btn-delete">删除标签</button>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import tagListModel from "@/models/tagList";

@Component
export default class Edit extends Vue {
  name = "Edit";
  tagname = "";
  created() {
    if (tagListModel.fetch().indexOf(this.$route.params.tagname) >= 0) {
      this.tagname = this.$route.params.tagname;
    } else {
      this.$router.replace("/404");
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/global.scss";
@import "@/assets/style/helper.scss";

.content-wrapper {
  display: flex;
  flex-direction: column;
  .title {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 1.5em;
    font-size: 24px;
    padding: 1em 0;
    background-color: white;
  }
}
</style>