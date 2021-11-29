type RecordItem = {
  id: number;
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
  id: number;
  type: '+' | '-';
  name: string;
  icon_name: string;
}

type TagListModel = {
  data: TagItem[];
  retrieveTag: () => string[];
  save: () => { code: 0 | 400; message: string };
  createTag: (tag: string) => { code: 0 | 401 | 407; message: string };
  deleteTag: (tag: string) => { code: 0 | 402 | 403; message: string };
};

type RecordListModel = {
  data: Record[];
  retrieveRecord: () => Record[];
  clone: () => Record[];
  createRecord: (r: Record) => { code: 0 | 401; message: string };
  save: (data: Record[]) => { code: 0 | 400; message: string };
};

type FilterOptionObject = {
  start: string,
  end: string,
  type: 'all' | '+' | '-',
  keyword: string,
  checkedTags: string[],
}
