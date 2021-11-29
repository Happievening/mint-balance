<template>
  <div class="content-wrapper">
    <ul>
      <li
          v-for="tag in dataSource"
          class="tag-item"
          :class="{ selected: selectedTag.indexOf(tag.name) >= 0 }"
          :key="tag.name"
          @click="toggleTag(tag.name)"
      >
        <div class="tag-item-icon">
          <Icon :name="tag.icon_name"/>
        </div>
        <div class="tag-item-name"> {{ tag.name }}</div>
      </li>
    </ul>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Prop, Watch} from 'vue-property-decorator';

@Component
export default class Tags extends Vue {

  @Prop(String) readonly type!: string;

  selectedTag: string[] = this.$store.state.selectedTag;
  local = this.type;

  get dataSource(): string[] {
    return this.$store.state.tagList.filter(
        (item: TagItem) => {
          return item.type === this.local;
        }
    );
  }

  @Watch('type')
  d() {
    console.log('Type changed');
    this.local = this.type;
  }

  toggleTag(tag: string): void {
    this.$store.commit('addSelectedTag', tag);
    this.$emit('update:tags');
    this.selectedTag = this.$store.state.selectedTag;
  }

  addTag(): void {
    this.$store.commit('addTag', this.local);
  }

  created(): void {
    this.$store.commit('retrieveTag');
  }

}
</script>

<style scoped lang="scss">
@import "~@/assets/style/global.scss";
@import "~@/assets/style/helper.scss";

.content-wrapper {
  flex-grow: 1;

  ul {
    display: flex;
    flex-wrap: wrap;
    overflow-y: scroll;

    > li {
      width: 25%;
      min-width: 25%;
      padding: 5px 16px;
      margin: 5px 8px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 14px;

      .tag-item-icon {
        background-color: lightgrey;
        border-radius: 50%;
        width: 48px;
        height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;

        svg {
          width: 100%;
          padding: 6px;
          height: 100%;
        }
      }

      &.selected .tag-item-icon {
        background-color: rgba($theme-color, 80%);
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