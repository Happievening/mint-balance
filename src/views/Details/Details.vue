<template>
  <Layout><Title>账目管理</Title>
    <div class="content-wrapper">
      <DataParser @transform="upd"/>
      <div class="info">
        {{ summaryOfFilteredData.length }} 天 | {{ numberOfRecordsFiltered }} 条记录 | {{ summaryOfFilteredData.total }}
      </div>
      <div class="result-panel">
        <div class="result result-date" v-for="(dateResultObj,date) in transformRecords " v-bind:key="date">
          <div class="date-wrapper">
            <div>{{ date }}</div>
            <div>{{ dateResultObj.totalAmount }}</div>
          </div>
          <div class="result result-type" v-for="(item1,tagInOneDay) in dateResultObj.data" v-bind:key="tagInOneDay">
            <div class="type-wrapper">
              <div>{{ tagInOneDay }}</div>
              <div>{{ item1.subToTalAmount }}</div>
            </div>

            <div class="result result-item" v-for="item2 in item1.data" :key="item2.createdAt">
              <div class="item-wrapper">
                <div>{{ item2.notes === '' ? '（没有备注）' : item2.notes }}</div>
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
import Vue from 'vue';
import {Component, Watch} from 'vue-property-decorator';
import Title from '@/components/Title.vue';
import doMath from '@/lib/doMath';
import DataParser from '@/components/DataParser.vue';

interface TransformRecords {
  [key: string]: any;
}

@Component({
  components: {DataParser, Title}
})
export default class Details extends Vue {


  transformRecords = {} as TransformRecords;
  numberOfRecordsFiltered = 0;

  get summaryOfFilteredData() {
    let o = {length: Object.keys(this.transformRecords).length, total: 0};
    for (let i in this.transformRecords) {
      o.total = doMath(this.transformRecords[i].totalAmount, o.total, '+');
    }
    return o;
  }

  upd(payload: { transformRecords: any, numberOfRecordsFiltered: number }) {
    this.transformRecords = payload.transformRecords;
    this.numberOfRecordsFiltered = payload.numberOfRecordsFiltered;
    console.log(123);
  }

}
</script>

<style scoped lang="scss">
@import "~@/assets/style/global.scss";
@import "~@/assets/style/helper.scss";

.content-wrapper {
  overflow-y: scroll;

  .info {
    display: flex;
    margin: 16px 16px;
    flex-basis: inherit;
    font-size: 16px;
    justify-content: center;
  }

  .result-panel {
    margin-top: 20px;

    .result-date {
      overflow: hidden;
      background-color: $vue-green;
      color: white;
      font-size: 18px;

      .date-wrapper {
        padding: 12px 6px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      .result-type {
        background-color: #F5F5F5;
        color: #333333;
        font-size: 16px;
        font-weight: 700;

        .type-wrapper {
          padding: 10px 6px;
          display: flex;
          justify-content: space-between;
        }

        .result-item {
          background-color: #fff;
          color: #333333;
          font-size: 16px;
          font-weight: 400;

          .item-wrapper {
            display: flex;
            justify-content: space-between;
            padding: 8px 0;

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