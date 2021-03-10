/**
 * @param {number} id 热门搜索关键词
 * @param {string} title 标题显示
 * @param {number} type 类型：1视频专辑 2音频专辑 3视频 4音频
 */
interface historyConfig {
  id?: number;
  title?: string;
  type?: number;
  [propsName: string]: any;
}
