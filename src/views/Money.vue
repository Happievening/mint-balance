<template>
  <Layout>
    <Types :value.sync="record.type" />
    <Tags @update:tags="onUpdateTags" />
    <Notes :value.sync="record.notes" />
    <NumberPad :number.sync="record.amount" @ok="onSubmit" />
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Types from "@/components/Types.vue";
import Tags from "@/components/Tags.vue";
import Notes from "@/components/Notes.vue";
import NumberPad from "@/components/NumberPad.vue";
import { Component, Prop, Watch } from "vue-property-decorator";
import { mount } from "@vue/test-utils";
//从JS引入模块请使用require加上default
// const model = require("@/model.js").default;
// const model = require("@/model.ts");
//TS引入模块用import-export default
import recordListModel from "@/models/recordList";
import tagListModel from "@/models/tagList";

const recordList = recordListModel.fetch();
@Component({
  components: { Types, Tags, NumberPad, Notes },
})
export default class Money extends Vue {
  tags: string[] = tagListModel.fetch();
  recordList = recordList;
  record: RecordListItem = {
    type: "-",
    notes: "",
    selectedtags: [],
    amount: 0,
    createdAt: "",
    date: "",
  };
  onUpdateTags(value: string[]) {
    this.record.selectedtags = value;
  }
  onSubmit() {
    this.recordList = [
      ...recordListModel.fetch(),
      JSON.parse(JSON.stringify(this.record)),
    ];
    recordListModel.save(this.recordList);
    console.log(recordListModel.fetch());
    this.record.amount = 0;
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/global.scss";
@import "@/assets/style/helper.scss";
</style>