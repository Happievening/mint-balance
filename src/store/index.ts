import Vue from 'vue';
import Vuex from 'vuex';
import clone from '@/lib/clone';

let data: RecordListItem[] = [];
try {
  data = require('../../parsedData.json');
} catch (e) {
  data = [];
}

Array.prototype.getItemsByKey = function (key: 'string') {
  const result: string[] = [];
  if (this !== undefined) {
    this.forEach((item) => {result.push(item[key]);});
  }
  return result;
};

const a = [{'a': 1}, {'a': 2}];
console.log(a.getItemsByKey('a'));

Vue.use(Vuex);

type VuexStoreState = {
  recordList: RecordListItem[]
  tagList: TagItem[]
  result: ResultObject
  selectedTag: string
}

const store = new Vuex.Store({
  state: {
    recordList: [],
    tagList: [],
    result: {code: 1000, message: 'Waiting For Initialization'},
    selectedTag: ''
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
    retrieveRecord(state) {
      state.recordList = JSON.parse(
        localStorage.getItem('recordList') || JSON.stringify(data)
      ) as RecordListItem[];
    },
    createRecord(state, r: RecordListItem) {
      try {
        state.recordList = [...state.recordList, clone(r)];
        store.commit('save', {key: 'recordList', data: state.recordList});
        console.log(localStorage.getItem('recordList'));
        state.result = {code: 0, message: 'success'};
      } catch (e) {
        state.result = {code: 401, message: e as string};
      }
    },
    retrieveTag(state) {
      state.tagList = JSON.parse(
        localStorage.getItem('tagList') ||
        JSON.stringify([
          {id: 0, name: '衣服', type: '-'},
          {id: 1, name: '饮食', type: '-'},
          {id: 2, name: '工资', type: '+'},
          {id: 3, name: '收租', type: '+'}
        ])
      );
    },
    deleteTag(state, tagName: string) {
      const id: number = state.tagList.getItemsByKey('name').indexOf(tagName);
      if (id >= 0) {
        try {
          state.tagList.splice(id, 1);
          store.commit('save', {key: 'tagList', data: state.tagList});
          state.result = {code: 0, message: 'success'};
        } catch (e) {
          state.result = {code: 402, message: e as string};
        }
      } else {
        state.result = {code: 403, message: '不存在这个tag'};
      }
    },
    createTag(state, payload: TagItem) {
      const id: number = state.tagList.getItemsByKey('name').indexOf(payload.name);
      if (id >= 0) {
        state.result = {code: 401, message: '标签已经存在'};
      } else if (payload.name.length > 8) {
        state.result = {code: 407, message: '标签的长度不能大于8个字符'};
      } else {
        state.tagList.push(payload);
        store.commit('save', {key: 'tagList', data: state.tagList});
        state.result = {code: 0, message: 'success'};
      }
    },
    addTag(state, payload: '+' | '-') {
      const t: TagItem = {id: 0, name: '', type: payload};
      const name = window.prompt(`为 ${payload === '+' ? '收入' : '支出'} 输入新的标签：`);
      if (name !== null) {
        if (name === '') {
          alert('标签不能为空哦！');
        } else {
          t.name = name;
          store.commit('createTag', t);
          if (state.result.code === 0) {
            window.alert('创建成功！');
          } else {
            window.alert('创建失败！原因: ' + state.result.message);
          }
        }
      }
    },
    addSelectedTag(state, tag: string) {
      state.selectedTag = tag;
      //
      // const index = state.selectedTags.indexOf(tag);
      // index < 0
      //   ? state.selectedTags.push(tag)
      //   : state.selectedTags.splice(index, 1);
    }
  }
});

export default store;