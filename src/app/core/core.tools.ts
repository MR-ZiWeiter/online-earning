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
}
