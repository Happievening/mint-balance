<template>
  <Layout><Title>账目管理</Title>
    <div class="content-wrapper">
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
          <!--          From <input type="date" v-model="filterOptions.start"></div>-->
          <!--          <div class="setting-date">To <input type="date" v-model="filterOptions.end"></div>-->

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
      <div class="info">
        共找到 {{ summaryOfFilteredData.length }} 天的 {{ numberOfRecordsFiltered }} 条记录<br>
        总金额为 {{ summaryOfFilteredData.total }}。
      </div>
      <div class="result-panel">
        <div class="result result-date" v-for="(dateResultObj,date) in transformRecords " v-bind:key="date">
          <div class="date-wrapper">
            <div>{{ date }}</div>
            <div>合计：{{ dateResultObj.totalAmount }}</div>
          </div>
          <div class="result result-type" v-for="(item1,tagInOneDay) in dateResultObj.data" v-bind:key="tagInOneDay">
            <div class="type-wrapper">
              <div>{{ tagInOneDay }}</div>
              <div>小计：{{ item1.subToTalAmount }}</div>
            </div>

            <div class="result result-item" v-for="item2 in item1.data" :key="item2.createdAt">
              <div class="item-wrapper">
                <div>{{ item2.notes === "" ? "（没有备注）" : item2.notes }}</div>
                <div>{{ item2.type }}{{ item2.amount }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script lang="ts">
import Vue from "vue";
import {Component, Watch} from "vue-property-decorator";
import Title from '@/components/Title.vue';
import clone from "@/lib/clone";
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import doMath from "@/lib/doMath";
import FormDate from "@/components/FormDate.vue";


dayjs.extend(isBetween)
@Component({
  components: {FormDate, Title}
})
export default class Details extends Vue {
  recordList: RecordListItem[] = []
  filterOptions: FilterOptionObject = {
    start: "",
    end: "",
    type: "all",
    keyword: "",
    checkedTags: [],
  }
  foldFlag = true
  ms = dayjs()
  me = dayjs()
  tc2 = ""
  numberOfRecordsFiltered = 0

  toggleFold() {
    this.foldFlag = !this.foldFlag
    console.log(this.foldFlag)
  }

  get filteredRecords(): RecordListItem[] {
    return this.recordList.filter((item: RecordListItem) => {
      const dateFlag = dayjs(item.date).isBetween(dayjs(this.filterOptions.start), dayjs(this.filterOptions.end), null, "[]")
      // const typesFlag = item.selectedTags.indexOf()
      let typesFlag;
      if (this.filterOptions.type === "all") {
        typesFlag = true
      } else {
        typesFlag = this.filterOptions.type === item.type
      }
      const tagFlag = this.filterOptions.checkedTags.indexOf(item.selectedTag) >= 0;
      const keywordFlag = item.notes.indexOf(this.filterOptions.keyword) >= 0;
      return dateFlag && typesFlag && tagFlag && keywordFlag
    })
  }

  get tagOfRecords() {
    return this.fetchTagOfRecords(this.recordList)
  }

  get dateOfRecords() {
    return this.fetchDateOfRecords(this.recordList)
  }

  fetchTagOfRecords(rl: RecordListItem[]) {
    return Array.from(new Set(rl.map((item: RecordListItem) => {
      return item.selectedTag || ""
    })))
  }

  fetchDateOfRecords(rl: RecordListItem[]) {
    //按记录从新到旧
    return Array.from(new Set(rl.map((item) => {
      return item.date
    }).sort((a, b) => {
      return dayjs(a).isBefore(dayjs(b)) ? 1 : -1
    })))
  }

  get transformRecords() {
    this.numberOfRecordsFiltered = 0
    let o = {} as any
    let rl = this.filteredRecords
    for (let d of this.fetchDateOfRecords(rl)) {
      o[d] = {totalAmount: 0, data: {}}
      for (let t of this.fetchTagOfRecords(rl)) {
        rl.forEach((item) => {
          if (item.date === d && item.selectedTag === t) {
            this.numberOfRecordsFiltered++
            if (o[d]["data"][t]) {
              o[d]["data"][t]["data"].push({
                "amount": item.amount,
                "type": item.type,
                "notes": item.notes,
                "createdAt": item.createdAt
              })
            } else {
              o[d]["data"][t] = {
                subToTalAmount: 0,
                data: [{"amount": item.amount, "type": item.type, "notes": item.notes, "createdAt": item.createdAt}]
              }
            }
            o[d]["data"][t].subToTalAmount = doMath(o[d]["data"][t].subToTalAmount, item.amount * (item.type === "+" ? 1 : -1), "+")
            o[d].totalAmount = doMath(o[d].totalAmount, item.amount * (item.type === "+" ? 1 : -1), "+")
          }
        })
      }
    }
    return o
  }

  get summaryOfFilteredData() {
    let o = {length: Object.keys(this.transformRecords).length, total: 0}
    for (let i in this.transformRecords) {
      o.total = doMath(this.transformRecords[i].totalAmount, o.total, "+")
    }
    return o
  }

  created() {
    this.recordList = clone(this.$store.state.recordList)
    this.filterOptions.start = this.fetchDateOfRecords(this.recordList)[this.fetchDateOfRecords(this.recordList).length - 1] || dayjs().format("YYYY-MM-DD")
    this.filterOptions.end = this.fetchDateOfRecords(this.recordList)[0] || dayjs().format("YYYY-MM-DD")
    this.filterOptions.checkedTags = this.fetchTagOfRecords(this.recordList)
  }

  beforeUpdate() {
    this.ms = dayjs()
  }

  updated() {
    this.me = dayjs()
    this.tc2 = this.me.diff((this.ms), "millisecond").toString()
  }
}
</script>

<style scoped lang="scss">
@import "~@/assets/style/global.scss";
@import "~@/assets/style/helper.scss";

.content-wrapper {
  overflow-y: scroll;

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
        font-size: 22px
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
        width: 32px;
        font-size: 32px;
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

  .info {
    display: flex;
    margin: 16px 16px
  }

  .result-panel {
    margin-top: 20px;

    .result-date {
      border-radius: 6px;
      overflow: hidden;
      margin: 24px 16px;
      background-color: $vue-green;
      box-shadow: 0 1px 3px rgb(0 0 0 / 25%);
      color: white;
      font-size: 18px;

      .date-wrapper {
        padding: 6px 6px;
        display: flex;
        justify-content: space-between;
      }

      .result-type {
        background-color: #F5F5F5;
        color: #333333;
        font-size: 16px;
        font-weight: 700;

        .type-wrapper {
          display: flex;
          justify-content: space-between;
          padding: 5px 6px;
        }

        .result-item {
          background-color: #fff;
          color: #333333;
          font-size: 16px;
          font-weight: 400;

          .item-wrapper {
            display: flex;
            justify-content: space-between;
            padding: 4px 0;

            :nth-child(1) {
              margin-left: 2em
            }

            :nth-child(2) {
              margin-right: 6px;
            }
          }

          &-notes {
            flex-grow: 1;
            text-overflow: ellipsis;
          }
        }
      }
    }
  }
}
</style>