<template>
  <div class="content-wrapper">
    <ul>
      <li
          v-for="tag in dataSource"
          :class="{ selected: selectedTag.indexOf(tag.name) >= 0 }"
          :key="tag.name"
          @click="toggleTag(tag.name)"
      >
        {{ tag.name }}
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
        (item) => {
          return item.type === this.local;
        }
    );
  }

  @Watch('type')
  d() {
    console.log("Type changed");
    this.local = this.type
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