<template>
  <div class="setting-panel">
    <div class="setting-title">
      <div class="placeholder"></div>
      <div class="setting-title-text">搜索条件</div>
      <div @click="toggleFold" class="setting-fold-icon" :class="{'reverse':!foldFlag}">
        <Icon name="fold"/>
      </div>
    </div>

    <div class="setting-main" v-show="foldFlag">
      <div class="setting-date">
        <div>开始日期</div>
        <FormDate :value.sync="filterOptions.start"/>
      </div>
      <div class="setting-date">
        <div>结束日期</div>
        <FormDate :value.sync="filterOptions.end"/>
      </div>

      <div class="setting-type">
        账目种类
        <select name="" id="" v-model="filterOptions.type">
          <option value="all">全部</option>
          <option value="+">收入</option>
          <option value="-">支出</option>
        </select>
      </div>
      <div class="setting-tag">
        <div class="setting-tag-item" v-for="(key,val) in tagOfRecords" :key="val">
          <label><input type="checkbox" :value="key" v-model="filterOptions.checkedTags">{{ key }}</label>
        </div>
      </div>
      <div class="setting-keyword">
        备注包含 <input type="text" v-model="filterOptions.keyword">
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import doMath from '@/lib/doMath';
import clone from '@/lib/clone';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import FormDate from '@/components/FormDate.vue';

dayjs.extend(isBetween);
@Component({components: {FormDate}})
export default class DataParser extends Vue {
  recordList: RecordListItem[] = [];
  tagOfRecords: string[] = [];
  filterOptions: FilterOptionObject = {
    start: '',
    end: '',
    type: 'all',
    keyword: '',
    checkedTags: [],
  };
  foldFlag = false;
  numberOfRecordsFiltered = 0;

  toggleFold(): void {
    this.foldFlag = !this.foldFlag;
  }

  get filteredRecords(): RecordListItem[] {
    console.log('Start Filter');
    return this.recordList.filter((item: RecordListItem) => {
      const dateFlag = dayjs(item.date).isBetween(dayjs(this.filterOptions.start), dayjs(this.filterOptions.end), null, '[]');
      let typesFlag;
      if (this.filterOptions.type === 'all') {
        typesFlag = true;
      } else {
        typesFlag = this.filterOptions.type === item.type;
      }
      const tagFlag = this.filterOptions.checkedTags.indexOf(item.selectedTag) >= 0;
      const keywordFlag = item.notes.indexOf(this.filterOptions.keyword) >= 0;
      return dateFlag && typesFlag && tagFlag && keywordFlag;
    });
  }

  fetchTagOfRecords(rl: RecordListItem[]): string[] {
    return Array.from(new Set(rl.map((item: RecordListItem) => {
      return item.selectedTag || '';
    })));
  }

  fetchDateOfRecords(rl: RecordListItem[]): string[] {
    //按记录从新到旧
    return Array.from(new Set(rl.map((item) => {
      return item.date;
    }).sort((a, b) => {
      return dayjs(a).isBefore(dayjs(b)) ? 1 : -1;
    })));
  }


  get transformRecords(): [] {
    console.log('transformRecords activated');
    this.numberOfRecordsFiltered = 0;
    let o = {} as any;
    let rl = this.filteredRecords;
    for (let d of this.fetchDateOfRecords(rl)) {
      o[d] = {totalAmount: 0, data: {}};
      for (let t of this.fetchTagOfRecords(rl)) {
        rl.forEach((item) => {
          if (item.date === d && item.selectedTag === t) {
            this.numberOfRecordsFiltered++;
            if (o[d]['data'][t]) {
              o[d]['data'][t]['data'].push({
                'amount': item.amount,
                'type': item.type,
                'notes': item.notes,
                'createdAt': item.createdAt
              });
            } else {
              o[d]['data'][t] = {
                subToTalAmount: 0,
                data: [{'amount': item.amount, 'type': item.type, 'notes': item.notes, 'createdAt': item.createdAt}]
              };
            }
            o[d]['data'][t].subToTalAmount = doMath(o[d]['data'][t].subToTalAmount, item.amount * (item.type === '+' ? 1 : -1), '+');
            o[d].totalAmount = doMath(o[d].totalAmount, item.amount * (item.type === '+' ? 1 : -1), '+');
          }
        });
      }
    }
    return o;
  }

  created() {
    this.recordList = clone(this.$store.state.recordList);
    this.filterOptions.start = this.fetchDateOfRecords(this.recordList)[this.fetchDateOfRecords(this.recordList).length - 1] || dayjs().format('YYYY-MM-DD');
    this.filterOptions.end = this.fetchDateOfRecords(this.recordList)[0] || dayjs().format('YYYY-MM-DD');
    this.filterOptions.checkedTags = this.fetchTagOfRecords(this.recordList);
    this.tagOfRecords = this.fetchTagOfRecords(this.recordList);
  }

  @Watch('transformRecords')
  xxx() {
    this.$emit('transform', {
      numberOfRecordsFiltered: this.numberOfRecordsFiltered,
      transformRecords: this.transformRecords
    });
  }


// beforeUpdate() {
//   this.ms = dayjs();
// }
//
// updated() {
//   this.me = dayjs();
//   this.tc2 = this.me.diff((this.ms), 'millisecond').toString();
// }
}
</script>

<style scoped lang="scss">
.setting-panel {
  display: flex;
  flex-direction: column;
  margin: 8px 16px;
  border-radius: 6px;
  box-shadow: 0 1px 3px rgb(0 0 0 / 25%);
  padding: 6px 8px;

  .setting-title {
    display: flex;
    justify-content: space-between;

    .placeholder {
      width: 32px;
    }

    .setting-title-text {
      font-size: 16px
    }

    .setting-fold-icon {
      transform: rotate(0deg);
      transition: 0.3s;
    }

    .reverse {
      transform: rotate(180deg);
      transition: 0.3s;
    }

    .icon {
      width: 24px;
      font-size: 24px;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  .setting-main {
    > * {
      margin: 12px 8px
    }

    .setting-date {
      display: flex;
      justify-content: space-between;
      align-items: center;

      ::v-deep .content-wrapper {
        flex-grow: 1;
      }

      ::v-deep .notes {
        padding: 0;
      }
    }

    .setting-type {
      display: flex;
      justify-content: space-between;
      align-items: center;

      select {
        border: 1px solid lightgray;
        background-color: white;
        margin-left: 0.75em;
        padding: 0.5em 0.5em;
        flex-grow: 1;
        font-size: 1em;
      }
    }

    .setting-tag {
      display: flex;
      flex-flow: row wrap;
      justify-content: flex-start;

      &-item {
        display: inline-block;
        margin-right: 12px;
        padding: 0.5em;
      }
    }

    .setting-keyword {
      display: flex;
      justify-content: space-between;
      align-items: center;

      input {
        border: 1px solid lightgrey;
        font-size: 1em;
        flex-grow: 1;
        padding: 0.5em 0.5em;
        margin-left: 0.75em;
      }
    }
  }

}
</style>