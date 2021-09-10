type RecordListItem = {
	type: string;
	notes: string;
	selectedtags: string[];
	amount: number;
	date: string;
	createdAt: string;
};

type ResultObject = {
	code: number;
	message: string;
};

type TagList = {
	data: string[];
	fetch: () => string[];
	save: () => { code: 0 | 400; message: string };
	create: (tag: string) => { code: 0 | 401 | 407; message: string };
	delete: (tag: string) => { code: 0 | 402 | 403; message: string };
};

type RecordList = {
	data: RecordListItem[];
	fetch: () => RecordListItem[];
	clone: () => RecordListItem[];
	create: (r: RecordListItem) => { code: 0 | 401; message: string };
	save: (data: RecordListItem[]) => { code: 0 | 400; message: string };
};
