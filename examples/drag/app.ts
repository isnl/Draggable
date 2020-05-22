/*
 * @Author: Peanut
 * @Description:  drag拖拽缩放类
 * @Date: 2020-04-17 13:00:57
 * @Last Modified by: Peanut
 * @Last Modified time: 2020-05-22 14:47:20
 */
import DrOpt from "./types";
function getStyle(obj: null | HTMLElement, attr: string): string {
  const style: string = getComputedStyle(
    obj as HTMLElement,
    null
  ).getPropertyValue(attr);
  if (!style || style === "static") {
    return "";
  }
  return style;
}

class Draggable {
  public opt: DrOpt;
  private dMinWidth: number;
  private dMinHeight: number;
  private lock: boolean;
  public constructor(opt: DrOpt) {
    this.opt = opt;
    this.dMinWidth = 50; //最小宽度
    this.dMinHeight = 50; //最大宽度
    this.lock = false; //是否锁定
    this.initElement();
    this.drag();
    this.resize();
  }
  public initElement(): void {
    const { container, elem,dHandle } = this.opt;
    if (getStyle(container, "position") === "") {
      (container as HTMLElement).style.position = "relative";
    }
    if (getStyle(elem, "position") === "") {
      (elem as HTMLElement).style.position = "absolute";
    }
  }
  drag() {
    let container = <HTMLElement>this.opt.container;
    let elem = <HTMLElement>this.opt.elem;
    let { dHandle, isPixel, dFn } = this.opt;
    // let elem = <HTMLElement>this.opt.elem;
    let disX = 0;
    let disY = 0;
    let realL = "";
    let realT = "";
    if (!dHandle) {
      dHandle = elem;
      if (dHandle) {
        dHandle.style.cursor = "move";
      }
    }
    if (dHandle)
      dHandle.onmousedown = event => {
        var event = event || window.event;
        disX = event.clientX - elem.offsetLeft;
        disY = event.clientY - elem.offsetTop;

        document.onmousemove = event => {
          var event = event || window.event;
          let iL = event.clientX - disX;
          let iT = event.clientY - disY;
          let maxL = container.clientWidth - elem.offsetWidth;
          let maxT = container.clientHeight - elem.offsetHeight;

          iL <= 0 && (iL = 0);
          iT <= 0 && (iT = 0);
          iL >= maxL && (iL = maxL);
          iT >= maxT && (iT = maxT);
          // elem.style.left = iL + "px";
          // elem.style.top = iT + "px";
          if (isPixel) {
            //按像素
            realL = iL + "px";
            realT = iT + "px";
          } else {
            //按百分比
            realL = (iL / container.clientWidth) * 100 + "%";
            realT = (iT / container.clientHeight) * 100 + "%";
          }

          elem.style.left = realL;
          elem.style.top = realT;

          return false;
        };

        document.onmouseup = () => {
          document.onmousemove = null;
          document.onmouseup = null;
          if (dFn) {
            dFn({
              left: realL,
              top: realT,
            });
          }
        };
        return false;
      };
  }
  resize() {
    let rHandle = <HTMLElement>this.opt.rHandle;
    let container = <HTMLElement>this.opt.container;
    let elem = <HTMLElement>this.opt.elem;
    const { isPixel, rFn } = this.opt;
    rHandle.onmousedown = event => {
      var event = event || window.event;
      let disX = event.clientX - rHandle.offsetLeft;
      let disY = event.clientY - rHandle.offsetTop;
      let iW = 0;
      let iH = 0;
      let realW = "";
      let realH = "";
      document.onmousemove = event => {
        var event = event || window.event;

        let iL = event.clientX - disX;
        let iT = event.clientY - disY;
        let maxW = container.clientWidth - elem.offsetLeft - 2;
        let maxH = container.clientHeight - elem.offsetTop - 2;
        iW = rHandle.offsetWidth + iL;
        iH = rHandle.offsetHeight + iT;

        // 宽
        iW < this.dMinWidth && (iW = this.dMinWidth);
        iW > maxW && (iW = maxW);
        // lockX || (elem.style.width = iW + "px");
        if (isPixel) {
          realW = iW + "px";
        } else {
          realW = (iW / container.clientWidth) * 100 + "%";
        }
        elem.style.width = realW;

        // 高
        iH < this.dMinHeight && (iH = this.dMinHeight);
        iH > maxH && (iH = maxH);
        // lockY || (elem.style.height = iH + "px");
        if (isPixel) {
          realH = iH + "px";
        } else {
          realH = (iH / container.clientHeight) * 100 + "%";
        }
        elem.style.height = realH;
        if (iW == this.dMinWidth || iH == this.dMinHeight)
          document.onmousemove = null;
        return false;
      };
      document.onmouseup = () => {
        document.onmousemove = null;
        document.onmouseup = null;
        if (rFn) {
          rFn({
            width: realW,
            height: realH,
          });
        }
      };
      return false;
    };
  }
  /**
   * 碰撞到此widget 高亮显示
   */
  // addHoverClass(widget) {
  //   if (this.timer) {
  //     window.clearInterval(this.timer);
  //   }
  //   widget.elem.classList.add('mw-widget-hover');
  // }
  /**
   * 不碰撞 取消高亮
   */
  // removeHoverClass(widget) {
  //   this.timer = setTimeout(() => {
  //     widget.elem.classList.remove('mw-widget-hover');
  //   }, 1000);
  // }
}
let container = <HTMLElement>document.querySelector(".container");
let elem = <HTMLElement>document.querySelector(".box");
let dHandle = <HTMLElement>document.querySelector(".dragHandle");
let rHandle = <HTMLElement>document.querySelector(".resizeHandle");

new Draggable({
  container,
  elem,
  dHandle:elem,
  rHandle,
  isPixel: true,
  dFn: (dStyle: any) => {
    console.log("dFn", dStyle);
  },
  rFn: (rStyle: any) => {
    console.log("rFn", rStyle);
  },
});
