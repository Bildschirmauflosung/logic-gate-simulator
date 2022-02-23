import * as DarkTheme from "./DarkTheme";
import * as LightTheme from "./LightTheme";

export class Theme {
  static bgColour: string;
  static hoverBgColour: string;
  static activeBgColour: string;
  static fgColour: string;
  static enabledBgColour: string;

  static setDarkTheme() {
    Theme.bgColour = DarkTheme.bgColour;
    Theme.hoverBgColour = DarkTheme.hoverBgColour;
    Theme.activeBgColour = DarkTheme.activeBgColour;
    Theme.fgColour = DarkTheme.fgColour;
    Theme.enabledBgColour = DarkTheme.enabledBgColour;
  }

  static setLightTheme() {
    Theme.bgColour = LightTheme.bgColour;
    Theme.hoverBgColour = LightTheme.hoverBgColour;
    Theme.activeBgColour = LightTheme.activeBgColour;
    Theme.fgColour = LightTheme.fgColour;
    Theme.enabledBgColour = LightTheme.enabledBgColour;
  }

  static setSystemTheme() {
    if (window.matchMedia("(prefers-color-scheme: dark)")) {
      Theme.setDarkTheme();
    } else {
      Theme.setLightTheme();
    }
  }
}