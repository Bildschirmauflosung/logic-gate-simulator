import { ConnectionPoint } from "../render/ConnectionPoint";
import { IOAddButton } from "../render/IOAddButton";
import { WorkingAreaData } from "../WorkingAreaData";

export function isMouseOver(e: MouseEvent, width: number, height: number, left: number, top: number): boolean {
  return e.offsetX > left && e.offsetX < left + width && e.offsetY > top && e.offsetY < top + height;
}

/**
 * Function returning a {@link number} guaranteed to satisfy `min <= num <= max`
 * @param num the number to clamp
 * @param min the minimal value to return
 * @param max the max value to return
 */
export function clamp(num: number, min: number, max: number): number {
  return Math.min(Math.max(num, min), max);
}

export function updateConnectionData(points: ConnectionPoint[]) {
  const removing: number[] = [];
  WorkingAreaData.rs.connectionData.forEach((v, i) => {
    for (const p of points) {
      if (v.pointFrom === p || v.pointTo === p) {
        removing.push(i);
      }
    }
  });

  removing.sort((a, b) => b - a);

  for (const i of removing) {
    WorkingAreaData.rs.connectionData.splice(i, 1);
  }
}

export function getNumberFromBits(bits: boolean[], signed: boolean): number {
  let num = 0;
  if (signed) {
    for (let n = bits.length - 1; n >= 0; n--) {
      if (n === bits.length - 1 && bits[n]) {
        num += -Math.pow(2, n);
      } else {
        num += (bits[n] ? 1 : 0) * Math.pow(2, n);
      }
    }
  } else {
    for (let n = bits.length - 1; n >= 0; n--) {
      num += (bits[n] ? 1 : 0) * Math.pow(2, n);
    }
  }

  return num;
}

export function buildWorkArea() {
  WorkingAreaData.rs.widgets.push(new IOAddButton(true));
  WorkingAreaData.rs.widgets.push(new IOAddButton(false));
}

/**
 * Function that takes an object and a callback, calls {@link fn} with the argument being the object
 * @returns obj
 * @param obj any object
 * @param {(unknown) => unknown} fn the function to be called
 */
export function tap<T>(obj: T, fn: (obj: T) => unknown): T {
  fn(obj);
  return obj;
}
