import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';

const data = require("../../parsedData.json")
Vue.use(Vuex);

type VuexStoreState = {
  recordList: RecordListItem[]
  tagList: string[]
  result: ResultObject
  selectedTag: string
}

const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    result: {code: 1000, message: 'Waiting For Initialization'},
    selectedTag: ""
  } as VuexStoreState,
  mutations: {
    save(state, obj: { key: string, data: RecordListItem[] | string[] }) {
      try {
        localStorage.setItem(
          obj.key,
          JSON.stringify(obj.data)
        );
        state.result = {code: 0, message: 'success'};
      } catch (error) {
        state.result = {code: 400, message: error as string};
      }
    },
    retrieveTag(state) {
      state.tagList = JSON.parse(
        localStorage.getItem('tagList') ||
        JSON.stringify('衣食住行'.split(''))
      );
    },
    deleteTag(state, tag: string) {
      if (state.tagList.indexOf(tag) >= 0) {
        try {
          state.tagList.splice(state.tagList.indexOf(tag), 1);
          store.commit('save', {key: 'tagList', data: state.tagList});
          state.result = {code: 0, message: 'success'};
        } catch (e) {
          state.result = {code: 402, message: e as string};
        }
      } else {
        state.result = {code: 403, message: '不存在这个tag'};
      }
    },
    createTag(state, tag: string) {
      if (state.tagList.indexOf(tag) >= 0) {
        state.result = {code: 401, message: '标签已经存在'};
      } else if (tag.length > 8) {
        state.result = {code: 407, message: '标签的长度不能大于8个字符'};
      } else {
        state.tagList.push(tag);
        store.commit('save', {key: 'tagList', data: state.tagList});
        state.result = {code: 0, message: 'success'};
      }
    },
    retrieveRecord(state) {
      state.recordList = JSON.parse(
        localStorage.getItem('recordList') || JSON.stringify(data)
      ) as RecordListItem[];
    },
    createRecord(state, r: RecordListItem) {
      try {
        state.recordList = [...state.recordList, clone(r)];
        store.commit('save', {key: 'recordList', data: state.recordList});
        console.log(localStorage.getItem("recordList"))
        state.result = {code: 0, message: 'success'};
      } catch (e) {
        state.result = {code: 401, message: e as string};
      }
    },
    addTag(state) {
      const tag = window.prompt('请输入新的标签：');
      if (tag !== null) {
        if (tag === '') {
          alert('标签不能为空哦！');
        } else {
          store.commit('createTag', tag);
          if (state.result.code === 0) {
            window.alert('创建成功！');
          } else {
            window.alert('创建失败！原因: ' + state.result.message);
          }
        }
      }
    },
    addSelectedTag(state, tag: string) {
      state.selectedTag = tag
      // const index = state.selectedTags.indexOf(tag);
      // index < 0
      //   ? state.selectedTags.push(tag)
      //   : state.selectedTags.splice(index, 1);
    }
  }
});

export default store;