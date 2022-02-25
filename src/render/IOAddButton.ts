import { LogicGate } from "../logic/LogicGate";
import { cv, gates, widgets } from "../main";
import { isMouseOver } from "../utils/Helpers";
import { BitsNumber } from "./BitsNumber";
import { Gate } from "./Gate";
import { GateType } from "./GateType";
import { IWidget } from "./IWidget";
import { Menu } from "./menu/Menu";
import { ItemType, MenuItem } from "./menu/MenuItem";
import { MouseEventType } from "./MouseEventType";
import { Theme } from "./theme/Theme";

export class IOAddButton implements IWidget {
  private left: number;
  private top: number;
  private hovered: boolean = false;
  private pressed: boolean = false;
  private menu: Menu;

  public width: number = 48;
  public height: number = 48;

  private createGate(bits: BitsNumber) {
    this.menu.hide();
    const lg = new LogicGate([], [], this.isInput ? 0 : 1, this.isInput ? 1 : 0, ([]) => []);
    const io = new Gate(this.isInput ? 4 : cv.width - this.width - 4, 4, gates.length, "X", this.isInput ? GateType.INPUT : GateType.OUTPUT, lg, bits);
    gates.push(io);
    widgets.push(io);
  }
  
  constructor(public readonly isInput: boolean) {    
    this.menu = new Menu();
    this.menu.addItem(new MenuItem("1", () => {
      this.createGate(BitsNumber.ONE);
    }, ItemType.NORMAL));
    this.menu.addItem(new MenuItem("2", () => {
      this.createGate(BitsNumber.TWO);
    }, ItemType.NORMAL));
    this.menu.addItem(new MenuItem("4", () => {
      this.createGate(BitsNumber.FOUR);
    }, ItemType.NORMAL));
    this.menu.addItem(new MenuItem("8", () => {
      this.createGate(BitsNumber.EIGHT);
    }, ItemType.NORMAL));

    if (isInput) {
      this.left = 8;
      this.top = cv.height - this.height - 8;
    } else {
      this.left = cv.width - this.width - 8;
      this.top = cv.height - this.height - 8;
    }
  }

  private handleMouseMove(e: MouseEvent): void {
    this.hovered = (isMouseOver(e, this.width, this.height, this.left, this.top));
  }

  private handleMouseDown(e: MouseEvent): void {
    this.menu.hide();

    if (e.button == 0) {
      if (isMouseOver(e, this.width, this.height, this.left, this.top)) {
        this.pressed = true;
      }
    }
  }

  private handleMouseUp(e: MouseEvent): void {
    if (this.hovered && this.pressed && e.button == 0) {
      this.menu.show(e.x, e.y);
    }
    this.hovered = false;
    this.pressed = false;
  }

  align(): void {
    if (!this.isInput) {
      this.left = cv.width - this.width - 8;
    }
    this.top = cv.height - this.height - 8;
  }

  handleEvent(type: MouseEventType, event: MouseEvent): void {
    switch (type) {
      case MouseEventType.MOVE:
        this.handleMouseMove(event);
        break;
      case MouseEventType.UP:
        this.handleMouseUp(event);
        break;
      case MouseEventType.DOWN:
        this.handleMouseDown(event);
        break;
      case MouseEventType.CONTEXTMENU:
        break;
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    ctx.strokeStyle = Theme.fgColour;
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(this.left + this.width / 2, this.top);
    ctx.arcTo(this.left + this.width, this.top, this.left + this.width, this.top + this.width / 2, this.width / 2);
    ctx.arcTo(this.left + this.width, this.top + this.height, this.left + this.width - this.width / 2, this.top + this.height, this.width / 2);
    ctx.arcTo(this.left, this.top + this.height, this.left, this.top + this.height - this.width / 2, this.width / 2);
    ctx.arcTo(this.left, this.top, this.left + this.width / 2, this.top, this.width / 2);
    ctx.stroke();
    if (this.pressed) {
      ctx.fillStyle = Theme.activeBgColour;
    } else if (this.hovered) {
      ctx.fillStyle = Theme.hoverBgColour;
    } else {
      ctx.fillStyle = Theme.bgColour;
    }
    ctx.fill();
    ctx.beginPath();
    ctx.lineWidth = 2;
    ctx.moveTo(this.left + this.width / 4, this.top + this.height / 2);
    ctx.lineTo(this.left + this.width / 2 + this.width / 4, this.top + this.height / 2);
    ctx.moveTo(this.left + this.width / 2, this.top + this.height / 4);
    ctx.lineTo(this.left + this.width / 2, this.top + this.height / 2 + this.height / 4);
    ctx.stroke();
    ctx.lineWidth = 1;
  }
}