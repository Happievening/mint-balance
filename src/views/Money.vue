<template>
  <Layout>
    <Types :value.sync="record.type"/>
    <Tags @update:tags="onUpdateTags"/>
    <FormInput
        class="input-block"
        title="备注（140字内）"
        :value.sync="record.notes"
    />
    <FormDate
        class="input-inline"
        title="输入日期"
        :value.sync="record.date"
        :placeholder="record.date"
    />
    <NumberPad :number.sync="record.amount" @ok="onSubmit"/>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import Types from "@/components/Types.vue";
import Tags from "@/components/Tags/Main.vue";
import Notes from "@/components/Notes.vue";
import NumberPad from "@/components/NumberPad.vue";
import FormDate from "@/components/FormDate.vue";
import FormInput from "@/components/FormInput.vue";
import {Component, Prop, Watch} from "vue-property-decorator";
//从JS引入模块请使用require加上default
// const model = require("@/model.js").default;
// const model = require("@/model.ts");
//TS引入模块用import-export default
// import recordListModel from "@/models/recordList";
// import tagListModel from "@/models/tagList";

@Component({
  components: {Types, Tags, NumberPad, Notes, FormInput, FormDate},
  computed: {
    recordList() {
      return this.$myVuex.recordListModel.retrieveRecord();
    },
    tags() {
      return this.$myVuex.tagListModel.retrieveTag();
    }
  }
})
export default class Money extends Vue {
  record: RecordListItem = {
    type: "-",
    notes: "",
    selectedTags: [],
    amount: 0,
    createdAt: "",
    date: "" || new Date().toLocaleDateString(),
  };

  onUpdateTags(value: string[]) {
    this.record.selectedTags = value;
  }

  onSubmit() {
    this.record.createdAt = new Date().toLocaleString();
    this.$myVuex.recordListModel.createRecord(this.record);
    console.log(this.$myVuex.recordListModel.retrieveRecord());
    this.record.amount = 0;
  }

}
</script>

<style scoped lang="scss">
@import "~@/assets/style/global.scss";
@import "~@/assets/style/helper.scss";

.input-block {
  ::v-deep input {
    min-width: 100%;
  }
}

.input-inline {
  ::v-deep label {
    display: flex;
    align-items: center;

    input {
      padding: 0 6px;
      display: flex;
      align-items: center;
      flex-grow: 1;
    }
  }
}
</style>