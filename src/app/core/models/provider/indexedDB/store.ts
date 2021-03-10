export const storeConfig = [
  {
    name: 'system',
    key: 'id',
    cursorIndex: [{ name: 'systemTypeIndex', unique: false }]
  },
  {
    name: 'author',
    key: 'id',
    cursorIndex: [{ name: 'authorNum', unique: false }]
  },
  {
    name: 'video',
    key: 'id',
    cursorIndex: [{ name: 'videoNum', unique: false }]
  },
  {
    name: 'audio',
    key: 'id',
    cursorIndex: [{ name: 'audioNum', unique: false }]
  },
  {
    name: 'history',
    key: 'id',
    cursorIndex: [{ name: 'historyIndex', unique: false }]
  }
];
