import { observer } from "mobx-react";
import { observable, computed, action } from "mobx";

class UiState {
  @observable
  navBar = {
    activeNavMenuItem: null,
    mouseDown: false,
    lastClicked: null
  };
  @action
  resetNavBar() {
    this.navBar = {
      activeNavMenuItem: null,
      mouseDown: false,
      lastClicked: null
    };
  }
  @action
  selectNavMenuItem(item, event) {
    if (item) {
      this.navBar.activeNavMenuItem = item;
      switch (event) {
        case "click":
          this.navBar.lastClicked = item;
          break;
        case "mousedown":
          this.navBar.mouseDown = true;
          break;
      }
    }
  }
}

var singleton = new UiState();
export default singleton;
