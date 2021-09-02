<template>
  <div>
    <Layout>
      <Types :value.sync="record.type" />
      <Tags :data-source.sync="tags" @update:tags="onUpdateTags" />
      <Notes :value.sync="record.notes" />
      <NumberPad :number.sync="record.amount" @xxx="onSubmit" />
    </Layout>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import Types from "@/components/Types.vue";
import Tags from "@/components/Tags.vue";
import Notes from "@/components/Notes.vue";
import NumberPad from "@/components/NumberPad.vue";
import { Component, Prop, Watch } from "vue-property-decorator";
type Record = {
  type: string;
  notes: string;
  tags: string[];
  amount: number;
};
@Component({
  components: { Types, Tags, NumberPad, Notes },
})
export default class Money extends Vue {
  tags: string[] = ["衣", "食", "住", "行", "彩票"];
  recordList: Record[] = [];
  record: Record = {
    type: "-",
    notes: "",
    tags: [],
    amount: 0,
  };
  onValueUpdate(value: any) {
    console.log("Money组件监听到Any " + value);
  }
  onUpdateTags(value: string[]) {
    console.log("Money组件监听到tags " + value);
    this.record.tags = value;
  }
  onUpdateNotes(value: string) {
    console.log("Money组件监听到notes " + value);
    this.record.notes = value;
  }
  onUpdateAmount(value: string) {
    console.log("Money组件监听到tags " + value);
    this.record.amount = parseFloat(value);
  }
  onUpdateTypes(value: string) {
    console.log("Money组件监听到types " + value);
    this.record.type = value;
  }
  onSubmit() {
    this.recordList.push(JSON.parse(JSON.stringify(this.record)));
    console.log(this.recordList);
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/style/global.scss";
@import "@/assets/style/helper.scss";
</style>