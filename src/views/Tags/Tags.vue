<template>
  <Layout>
    <Title>标签管理</Title>
    <div class="content-wrapper">
      <ol>
        <li v-for="tag in tagList" :key="tag">
          <router-link :to="'/tags/edit/' + tag">
            <div class="a-tagname">{{ tag }}</div>
            <div class="a-edit">编辑
              <Icon name="right"/>
            </div>
          </router-link>
        </li>
      </ol>
      <div class="btn-wrapper">
        <Button @click.native="addTag">新建标签</Button>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component} from 'vue-property-decorator';
import Button from '@/components/Button.vue';
import Title from '@/components/Title.vue';

@Component({components: {Button, Title}})
export default class Tags extends Vue {
  tagList: string[] = [];

  created(): void {
    this.$store.commit('retrieveTag');
    this.tagList = this.$store.state.tagList;
    console.log(this.$store.state);
  }

  addTag(): void {
    this.$store.commit('addTag');
  }

}
</script>

<style scoped lang="scss">
@import "~@/assets/style/global.scss";
@import "~@/assets/style/helper.scss";

.content-wrapper {
  overflow-y: scroll;
  margin-top: 24px;

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

        .a-tagname {
          font-size: 18px;
        }

        .a-edit {
          color: darken($color: #fff, $amount: 50%);
        }
      }
    }

    .icon {
      width: 18px;
      height: 18px;
    }
  }

  .btn-wrapper {
    padding: 5px 16px;
    display: flex;
    justify-content: center;
    margin-top: 28px;

    .btn {
      color: white;
    }
  }
}
</style>
