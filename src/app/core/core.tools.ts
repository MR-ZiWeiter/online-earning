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


}
