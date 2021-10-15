type RecordListItem = {
  type: string;
  notes: string;
  selectedTag: string;
  amount: number;
  date: string;
  createdAt: string;
};

type ResultObject = {
  code: number;
  message: string;
};

type TagItem = {
  type: '+' | '-'
  name: string
  icon: string
}

type TagListModel = {
  data: TagItem[];
  retrieveTag: () => string[];
  save: () => { code: 0 | 400; message: string };
  createTag: (tag: string) => { code: 0 | 401 | 407; message: string };
  deleteTag: (tag: string) => { code: 0 | 402 | 403; message: string };
};

type RecordListModel = {
  data: RecordListItem[];
  retrieveRecord: () => RecordListItem[];
  clone: () => RecordListItem[];
  createRecord: (r: RecordListItem) => { code: 0 | 401; message: string };
  save: (data: RecordListItem[]) => { code: 0 | 400; message: string };
};

type FilterOptionObject = {
  start: string,
  end: string,
  type: 'all' | '+' | '-',
  keyword: string,
  checkedTags: string[],
}
