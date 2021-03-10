/**
 * @param {boolean} eyeCareMode 是否护眼模式
 * @param {number} ageGroup 1： 0-3岁 2： 3-6岁
 * @param {any} anthorConfig 对象集合
 * @param {number} id 索引
 */
interface settingsConfig {
  id?: number;
  eyeCareMode?: boolean;
  ageGroup?: number;
  anthorConfig?: any;
  [propsName: string]: any;
}
