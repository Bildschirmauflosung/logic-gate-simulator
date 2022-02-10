import { gates } from "../main";
import { isMouseOver } from "../utils/Helpers";
import { IRenderable } from "./IRenderable";

export class Gate implements IRenderable, EventListenerObject {
  private menu: HTMLDivElement = document.querySelector("#gate-menu")!;

  private _grabbed: boolean = false;

  width: number;
  height: number;
  top: number;
  left: number;
  id: number;
  name: string;

  constructor(width: number, height: number, left: number, top: number, id: number, name: string) {
    this.width = width;
    this.height = height;
    this.left = left;
    this.top = top;
    this.id = id;
    this.name = name;
  }

  handleEvent(object: MouseEvent): void {
    switch (object.type) {
      case "mousemove":
        if (this._grabbed) {
          let max = 0;
          for (const i of gates) {
            if (i._grabbed) {
              if (i.id > max) {
                max = i.id;
              }
            }
          }
          if (this.id == max) {
            this.left += object.movementX;
            this.top += object.movementY;
          }
        }
        break;
      case "mousedown":
        if (object.button == 0) {
          if (this.menu.style.display == "inline-flex") {
            this.menu.style.display = "none";
          }
          this._grabbed = isMouseOver(object, this.width, this.height, this.left, this.top);
        }
        break;
      case "mouseup":
        this._grabbed = false;
        break;
      case "contextmenu":
        if (isMouseOver(object, this.width, this.height, this.left, this.top)) {
          this.menu.style.display = "inline-flex";
          this.menu.style.left = object.clientX + "px";
          this.menu.style.top = object.clientY + "px";
        }
      default:
        break;
    } 
  }

  render(ctx: CanvasRenderingContext2D): void {
    const rad: number = 8;
    ctx.beginPath();
    ctx.strokeStyle = "#000";
    ctx.moveTo(this.left + rad, this.top);
    ctx.lineTo(this.left + this.width - rad, this.top);
    ctx.arcTo(this.left + this.width, this.top, this.left + this.width, this.top + rad, rad);
    ctx.lineTo(this.left + this.width, this.top + this.height - rad);
    ctx.arcTo(this.left + this.width, this.top + this.height, this.left + this.width - rad, this.top + this.height, rad);
    ctx.lineTo(this.left + rad, this.top + this.height);
    ctx.arcTo(this.left, this.top + this.height, this.left, this.top + this.height - rad, rad);
    ctx.lineTo(this.left, this.top + rad);
    ctx.arcTo(this.left, this.top, this.left + rad, this.top, rad);
    ctx.stroke();
    ctx.fillStyle = "#000";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = "normal 16px 'Lato', sans-serif";
    ctx.fillText(this.name, this.left + this.width / 2, this.top + this.height / 2);
  }
}