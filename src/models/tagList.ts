const localStorageKeyName: string = 'tagList';
type TagList = {
	data: string[];
	fetch: () => string[];
	save: () => { code: 0 | 400; message: string };
	create: (tag: string) => { code: 0 | 401; message: string };
};
const tagList: TagList = {
	data: [],
	fetch() {
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
			return { code: 0, message: 'success' };
		} catch (error) {
			return { code: 400, message: error as string };
		}
	},
	create(tag: string) {
		if (this.data.indexOf(tag) >= 0) {
			return { code: 401, message: '标签已经存在' };
		} else {
			this.data.push(tag);
			this.save();
			return { code: 0, message: 'success' };
		}
	},
};
export default tagList;
