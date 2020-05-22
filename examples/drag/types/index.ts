/*
 * @Author: Peanut
 * @Description: drag resize options
 * @Date: 2020-04-17 13:02:23
 * @Last Modified by: Peanut
 * @Last Modified time: 2020-05-22 14:38:27
 */
export default interface DrOpt {
  container: null | HTMLElement;
  elem: null | HTMLElement;
  dHandle: null | HTMLElement;
  rHandle: null | HTMLElement;
  isPixel: boolean;
  dFn: Function;
  rFn: Function;
}
