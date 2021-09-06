<template>
  <Layout>
    <div class="content-wrapper">
      <ol>
        <li v-for="tag in tagList" :key="tag">
          <router-link :to="'/labels/edit/' + tag">
            <span>{{ tag }}</span
            ><Icon name="right" />
          </router-link>
        </li>
      </ol>
      <div class="btn-add-wrapper">
        <button class="btn-add" @click="addTag">新建标签</button>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import model from "@/models/tagList";

@Component
export default class Labels extends Vue {
  name = "Labels";
  tagList = model.fetch();
  addTag() {
    const tag = window.prompt("请输入新的标签");
    if (tag !== null) {
      if (tag === "") {
        alert("标签不可为空");
      } else {
        const result = model.create(tag);
        if (result.code === 0) {
          window.alert("创建成功！");
        } else {
          window.alert("创建失败！原因: " + result.message);
        }
      }
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/global.scss";
@import "@/assets/style/helper.scss";

.content-wrapper {
  overflow-y: scroll;
  ol {
    padding: 0 16px;
    background-color: white;
    li {
      a {
        text-decoration: none;
        color: inherit;
        min-width: 100%;
        display: flex;
        min-height: 44px;
        align-items: center;
        justify-content: space-between;
        border-bottom: 1px solid #d9d9d9;
      }
    }
    .icon {
      width: 18px;
      height: 18px;
    }
  }
  .btn-add {
    background: $vue-green;
    border-radius: 4px;
    padding: 16px;
    &-wrapper {
      padding: 5px 16px;
      display: flex;
      justify-content: center;
      margin-top: 28px;
    }
  }
}
</style>