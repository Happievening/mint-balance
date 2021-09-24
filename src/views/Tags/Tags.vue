<template>
  <Layout>
    <Types :value.sync="type"/>
    <div class="content-wrapper">
      <ol>
        <li v-for="tag in tagList" :key="tag.name">
          <router-link :to="'/tags/edit/' + tag.name">
            <div class="a-tagname">{{ tag.name }}</div>
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
import Types from '@/components/Types.vue';

@Component({components: {Button, Title, Types}})
export default class Tags extends Vue {
  get tagList() {
    return this.$store.state.tagList.filter(
        (item) => {
          return item.type === this.type;
        }
    );
  }

  addTag(): void {
    this.$store.commit('addTag', this.type);
  }

  created(): void {
    this.$store.commit('retrieveTag');

  }


  type = '-';
}
</script>

<style scoped lang="scss">
@import "~@/assets/style/global.scss";
@import "~@/assets/style/helper.scss";

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
