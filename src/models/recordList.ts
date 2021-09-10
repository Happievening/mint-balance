const localStorageKeyName: string = 'recordList';
type RecordList = {
	data: RecordListItem[];
	fetch: () => RecordListItem[];
	clone: () => RecordListItem[];
	create: (r: RecordListItem) => { code: 0 | 401; message: string };
	save: (data: RecordListItem[]) => { code: 0 | 400; message: string };
};
const recordList: RecordList = {
	data: [],
	fetch() {
		this.data = JSON.parse(
			localStorage.getItem(localStorageKeyName) || '[]'
		) as RecordListItem[];
		return this.data;
	},
	clone() {
		return JSON.parse(JSON.stringify(this.data)) as RecordListItem[];
	},
	create(r: RecordListItem) {
		try {
			this.data = [...this.data, JSON.parse(JSON.stringify(r))];
			this.save(this.data);
			return { code: 0, message: 'success' };
		} catch (e) {
			return { code: 401, message: e as string };
		}
	},
	save(data: RecordListItem[]) {
		try {
			localStorage.setItem(localStorageKeyName, JSON.stringify(data));
			return { code: 0, message: 'success' };
		} catch (error) {
			return { code: 400, message: error as string };
		}
	},
};
export default recordList;
