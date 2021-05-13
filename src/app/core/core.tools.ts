export class CoreToolsFunction {
  constructor() { }

  // 判断是安卓还是iOS
  public isAndroid_ios() {
    const u = navigator.userAgent/* , app = navigator.appVersion */;
    const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; // android终端或者uc浏览器
    /* const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); // ios终端 */
    return isAndroid === true ? true : false;
  }
  // 判断是否是微信
  public isWeiXin() {
    if (/MicroMessenger/gi.test(navigator.userAgent)) {
      return true;
    } else {
      return false;
    }
  }
  // 单位转换
  public pxToVw(px: number): string {
    return (px / 750) * 100 + 'vw';
  }
  // 适配转换
  public pxToPx(px: number): string {
    return (px / 750) * window.screen.width + 'px';
  }
  public formatPx(px: number): number {
    return (px / 750) * window.screen.width;
  }
  /* 深度融合对象数据 */
  public deepFusinObject(firstFusion: {[x: string]: any}, cloneFusion: {[x: string]: any}): {[x: string]: any} {
    for(const key in cloneFusion) {
      if (firstFusion[key]) {
        if (Object.prototype.toString.call(firstFusion[key]) === Object.prototype.toString.call(cloneFusion[key])) {
          if (Object.prototype.toString.call(firstFusion[key]) === "[object Array]") {
            firstFusion[key] = firstFusion[key].concat(cloneFusion[key]);
          } else if (Object.prototype.toString.call(firstFusion[key]) === "[object Object]") {
            firstFusion[key] = this.deepFusinObject(firstFusion[key], cloneFusion[key]);
          } else {
            firstFusion[key] = cloneFusion[key];
          }
        } else {
          firstFusion[key] = cloneFusion[key];
        }
      } else {
        firstFusion[key] = cloneFusion[key];
      }
    }
    return firstFusion;
  }

  /**
   * @description 递归数据获取
   * @param val 任意值
   * @param renderArray 被查询数组对象
   * @param key 被查询字段
   * @param childrenKey 子元素数组对象Key
   * @returns [{children: []}] 得到树形数据
   */
   public deepSearchFilterHandler(val: any, renderArray: Array<any>, key: string = 'value', childrenKey: string = 'children') {
    const cloneRenderArray = JSON.parse(JSON.stringify(renderArray));
    return cloneRenderArray.map(item => {
      if (item[childrenKey]) {
        const childRender = this.deepSearchFilterHandler(val, item[childrenKey]).filter(fs => fs);
        if (childRender.length > 0) {
          item[childrenKey] = childRender;
          return item;
        }
      }
      if ((val + '') === item[key].toString()) {
        return item;
      }
    }).filter(fs => fs);
  }
  public flatDeepTreeHandler(renderArr: Array<any>, childrenKey: string = 'children'): Array<any> {
    let flatArray = [];
    renderArr.map(item => {
      if (item[childrenKey]) {
        flatArray.push(item);
        flatArray = [...flatArray, ...this.flatDeepTreeHandler(item[childrenKey], childrenKey)];
        // this.flatDeepTreeHandler(item[childrenKey], childrenKey);
      } else {
        flatArray.push(item);
      }
    });
    return flatArray;
  }
  // tslint:disable-next-line: max-line-length
  public deepFlatTreeFilterHandler(val: any, renderArray: Array<any>, key: string = 'value', childrenKey: string = 'children', deep: number = 0) {
    let flatArray = [];
    const flatTree = this.flatDeepTreeHandler(this.deepSearchFilterHandler(val, renderArray));
    renderArray.map(item => {
      if (flatTree[deep][key] === item[key]) {
        flatArray.push(item);
      } else if (item[childrenKey]) {
        flatArray = [...flatArray, this.deepFlatTreeFilterHandler];
      }
    });
    return flatArray;
  }
  public dataURLtoFile(dataurl: string, filename: string): File {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  }

  public getDeepTreeValue(renderArray: any, key: string = 'value', childrenKey: string = 'children') {
    return renderArray.map(item => {
      if (item[childrenKey]) {
        return this.getDeepTreeValue(item[childrenKey], key).filter(fs => fs).flat(Infinity);
        // if (childRender.length > 0) {
        //   item[childrenKey] = childRender;
        //   return item;
        // }
      } else if (item[key]) {
        return item[key];
      }
    }).filter(fs => fs).flat(Infinity);
  }


}
