import { isMouseOver } from "../utils/Helpers";
import { WorkingAreaData } from "../WorkingAreaData";
import { IWidget } from "./IWidget";
import { Menu } from "./menu/Menu";
import { ItemType, MenuItem } from "./menu/MenuItem";
import { MouseEventType } from "./MouseEventType";
import { Theme } from "./theme/Theme";

export class BitButton implements IWidget {
  private hovered: boolean = false;
  private pressed: boolean = false;
  private menu: Menu;
  
  private readonly width: number = 32;
  private readonly height: number = 32;

  public visible: boolean = false;
  public enabled: boolean = false;

  constructor(public left: number, public top: number, public readonly bit: number, public name: string, public readonly isInput: boolean = true) {
    this.menu = new Menu();
    this.menu.addItem(new MenuItem("Rename", () => {
      this.menu.hide();
    }, ItemType.NORMAL));
  }

  private handleMouseMove(e: MouseEvent) {
    this.hovered = isMouseOver(e, this.width, this.height, this.left, this.top);
  }

  private handleMouseUp(_e: MouseEvent) {
    if (this.isInput && this.pressed) {
      this.enabled = !this.enabled;
      WorkingAreaData.rs.update(WorkingAreaData.ls);
    }
    this.pressed = false;
  }

  private handleMouseDown(e: MouseEvent) {
    this.menu.hide();
    this.pressed = this.hovered && e.button === 0;
  }

  private handleMouseContextMenu(e: MouseEvent) {
    if (isMouseOver(e, this.width, this.height, this.left, this.top)) {
      this.menu.show(e.clientX, e.clientY);
    }
  }

  destroyMenu() {
    this.menu.destroy();
  }

  handleEvent(type: MouseEventType, event: MouseEvent): void {
    if (this.visible) {
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
          this.handleMouseContextMenu(event);
          break;
      }
    }
  }

  render(ctx: CanvasRenderingContext2D): void {
    if (this.visible) {
      const r = 4;
      ctx.beginPath();
      ctx.strokeStyle = Theme.fgColour;
      if (this.enabled) {
        ctx.fillStyle = Theme.enabledBgColour;
      } else {
        ctx.fillStyle = Theme.bgColour;
      }
      ctx.moveTo(this.left + r, this.top);
      ctx.lineTo(this.left + this.width - r, this.top);
      ctx.arcTo(this.left + this.width, this.top, this.left + this.width, this.top + r, r);
      ctx.lineTo(this.left + this.width, this.top + this.height - r);
      ctx.arcTo(this.left + this.width, this.top + this.height, this.left + this.height - r, this.top + this.height, r);
      ctx.lineTo(this.left + r, this.top + this.height);
      ctx.arcTo(this.left, this.top + this.height, this.left, this.top + this.height - r, r);
      ctx.lineTo(this.left, this.top + r);
      ctx.arcTo(this.left, this.top, this.left + r, this.top, r);
      ctx.stroke();
      ctx.fill();
  
      ctx.fillStyle = Theme.fgColour;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = "normal 1.4rem 'Lato', sans-serif";
      ctx.fillText(this.bit.toString(), this.left + this.width / 2, this.top + this.height / 2);
    }
  }
}