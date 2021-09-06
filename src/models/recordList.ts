const localStorageKeyName: string = 'recordList';
type RecordList = {
	data: RecordListItem[];
	fetch: () => RecordListItem[];
	clone: () => RecordListItem[];
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
