const localStorageKeyName = 'tagList';

const tagListModel: TagListModel = {
  data: [],
  retrieveTag() {
    this.data = JSON.parse(
      localStorage.getItem(localStorageKeyName) ||
      JSON.stringify('衣食住行'.split(''))
    );
    return this.data;
  },
  save() {
    try {
      localStorage.setItem(
        localStorageKeyName,
        JSON.stringify(this.data)
      );
      return {code: 0, message: 'success'};
    } catch (error) {
      return {code: 400, message: error as string};
    }
  },
  createTag(tag: string) {
    if (this.data.indexOf(tag) >= 0) {
      return {code: 401, message: '标签已经存在'};
    } else if (tag.length > 8) {
      return {code: 407, message: '标签的长度不能大于8个字符'};
    } else {
      this.data.push(tag);
      this.save();
      return {code: 0, message: 'success'};
    }
  },
  deleteTag(tag: string) {
    if (this.data.indexOf(tag) >= 0) {
      try {
        this.data.splice(this.data.indexOf(tag), 1);
        this.save();
        return {code: 0, message: 'success'};
      } catch (e) {
        return {code: 402, message: e as string};
      }
    } else {
      return {code: 403, message: '不存在这个tag'};
    }
  },
};
tagListModel.data = tagListModel.retrieveTag()
export default tagListModel;
