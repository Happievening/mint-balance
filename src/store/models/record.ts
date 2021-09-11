import clone from "@/lib/clone";

const localStorageKeyName = 'recordList';

const recordListModel: RecordListModel = {
  data: [] as RecordListItem[],
  retrieveRecord() {
    this.data = JSON.parse(
      localStorage.getItem(localStorageKeyName) || '[]'
    ) as RecordListItem[];
    return this.data;
  },
  clone() {
    return clone(this.data) as RecordListItem[];
  },
  createRecord(r: RecordListItem) {
    try {
      this.data = [...this.data, clone(r)];
      this.save(this.data);
      return {code: 0, message: 'success'};
    } catch (e) {
      return {code: 401, message: e as string};
    }
  },
  save(data: RecordListItem[]) {
    try {
      localStorage.setItem(localStorageKeyName, JSON.stringify(data));
      return {code: 0, message: 'success'};
    } catch (error) {
      return {code: 400, message: error as string};
    }
  },
};
//初始化
recordListModel.retrieveRecord()
export default recordListModel;
