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
        title="选择日期"
        :value.sync="record.date"
        :placeholder="record.date"
    />
    <NumberPad :number.sync="record.amount" @ok="onSubmit"/>
  </Layout>
</template>

<script lang="ts">
import Vue from 'vue';
import Types from '@/components/Types.vue';
import Tags from '@/components/Tags/Main.vue';
import NumberPad from '@/components/NumberPad.vue';
import FormDate from '@/components/FormDate.vue';
import FormInput from '@/components/FormInput.vue';
import {Component} from 'vue-property-decorator';

@Component({
  components: {Types, Tags, NumberPad, FormInput, FormDate},
})
export default class Money extends Vue {
  record: RecordListItem = {
    type: '-',
    notes: '',
    selectedTags: [],
    amount: 0,
    createdAt: '',
    date: '',
  };

  created(): void {
    this.record.date = new Date().toLocaleDateString();
    if (this.$route.path === '/') {
      this.$router.replace('/money');
    }
  }

  onUpdateTags(): void {
    this.record.selectedTags = this.$store.state.selectedTags;
  }

  onSubmit(): void {
    this.record.createdAt = new Date().toLocaleString();
    this.$store.commit('createRecord', this.record);
    // console.log( localStorage.getItem("recordList"))
    // console.log( this.$store.state.recordList);
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