<template>
  <Layout>
    <Types :value.sync="record.type"/>
    <Tags @update:tags="onUpdateTags" :type="record.type"/>
    <FormInput
        class="input-block"
        title=""
        :value.sync="record.notes"
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
import {Component, Watch} from 'vue-property-decorator';
import dayjs from 'dayjs';
import {Toast} from 'vant';

@Component({
  components: {Types, Tags, NumberPad, FormInput, FormDate},
})
export default class Money extends Vue {
  record: Record = {
    type: '-',
    notes: '',
    selectedTag: '未分类',
    amount: 0,
    createdAt: '',
    date: '',
  };

  created(): void {
    this.record.date = dayjs().format('YYYY-MM-DD');
    if (this.$route.path === '/') {
      this.$router.replace('/money');
    }
  }

  onUpdateTags(): void {
    this.record.selectedTag = this.$store.state.selectedTag;
  }

  onSubmit(): void {
    this.record.createdAt = new Date().toLocaleString();
    this.record.date = this.record.date.replace(/\//g, '-');
    this.$store.commit('createRecord', this.record);
    // console.log( localStorage.getItem("recordList"))
    // console.log( this.$store.state.recordList);
    this.record.amount = 0;
    Toast('添加成功！');
  }

}
</script>

<style scoped lang="scss">
@import "~@/assets/style/global.scss";
@import "~@/assets/style/helper.scss";

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