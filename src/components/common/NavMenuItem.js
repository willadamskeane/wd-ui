import React from "react";
import { MenuItem, MenuDivider, Popover, Position } from "@blueprintjs/core";
import { createStyleSheet } from "material-ui/styles";
import { withStyles } from "material-ui/styles";
import { NavMenu } from "./NavMenu";
import { observable, computed } from "mobx";
import { observer } from "mobx-react";
import UiState from "../../UiState";
import { NavMenuHeader } from "./NavMenuHeader";

const styleSheet = createStyleSheet(theme => ({
  popoverMenuItem: {
    display: "block"
  },
  menuHeader: {
    userSelect: "none",
    borderRadius: 0,
    fontWeight: "Semibold",
    lineHeight: "36px",
    height: "36",
    fontFamily: "Open Sans",
    fontSize: 12,
    cursor: "default !important",
    "&:active:not(.pt-active)": { background: "inherit !important" }
  },
  menuItem: {
    opacity: 1,
    paddingTop: 4,
    paddingBottom: 4,
    cursor: "default !important",
    "&:active:not(.pt-active)": { background: "inherit !important" },
    "&.hide": {
      opacity: "0 !important"
    }
  },
  shortCut: {
    fontFamily: "Source Sans Pro !important"
  },
  shortCutText: {
    textAlign: "center",
    minWidth: "10px",
    display: "inline-block",
    fontFamily: "Open Sans !important"
  }
}));

@withStyles(styleSheet)
@observer
export class NavMenuItem extends React.Component {
  state = { hide: false };

  renderShortcut = item => {
    var is_mac = true;
    var is_ios = false;
    var can_use_cmd_N = false;
    if (item && item.shortcut) {
      var shortcut = item.shortcut;
      var prefix = "";
      if (item.alt_shortcut)
        if (is_mac || is_ios) prefix += "⌥";
        else shortcut = "Alt+" + shortcut;
      if (item.shift_shortcut)
        if (is_mac || is_ios) prefix += "⇧";
        else shortcut = "Shift+" + shortcut;
      var control_key = "Ctrl+";
      if (is_mac || is_ios)
        control_key =
          (can_use_cmd_N || item.shortcut < "0" || item.shortcut > "9") &&
          !item.ctrl_shortcut
            ? "⌘"
            : "⌃";
      return (
        <span className={this.props.classes.shortCut}>
          {prefix + control_key}
          <span className={this.props.classes.shortCutText}>
            {shortcut}
          </span>
        </span>
      );
    }
    return;
  };

  renderNavMenuSubItems() {
    return this.props.item.children.map(menu => {
      return menu
        ? <NavMenuItem onMouseOver={this.handleMouseOver} item={menu} />
        : <MenuDivider />;
    });
  }

  handleClick = event => {
    if (this.isActive && UiState.navBar.lastClicked) {
      UiState.resetNavBar();
    } else {
      UiState.selectNavMenuItem(this.props.item, "click");
    }
    event.stopPropagation();
  };

  handleMouseOver = event => {
    if (!this.props.header || UiState.navBar.activeNavMenuItem)
      UiState.selectNavMenuItem(this.props.item);
  };

  handleMouseDown = event => {
    UiState.selectNavMenuItem(this.props.item, "mousedown");
    event.stopPropagation();
  };

  handleMouseUp = event => {
    if (this.props.header){
      UiState.navBar.mouseDown = false;
    }else{
      this.setState({ hide: true });
      setTimeout(() => {
        this.setState({ hide: false });
        setTimeout(() => {
          // this.setState({hide:true});
          UiState.resetNavBar();
        }, 100);
      }, 50);
    }
  };

  @computed
  get isActive() {
    if (!this.props.item) return false;
    var activeNavMenuItem = UiState.navBar.activeNavMenuItem;
    while (activeNavMenuItem) {
      if (activeNavMenuItem.id === this.props.item.id) return true;
      if (activeNavMenuItem.parent) {
        activeNavMenuItem = activeNavMenuItem.parent;
      } else {
        return false;
      }
    }
    return false;
  }

  renderMenuItem = () => {
    if (this.props.header) {
      return (
        <div
          onClick={this.handleClick}
          onMouseDown={this.handleMouseDown}
          onMouseOver={this.handleMouseOver}
          onMouseUp={this.handleMouseUp}
        >
        <a
        // onMouseOver={(e) => this.handleInteraction(e,UiState.navBar.activeNavMenu)}
        ref="anchor"
        className={
          (this.isActive ? "pt-active " : "") +
          "pt-button pt-minimal " + 
          this.props.classes.menuHeader
        }
      >
        {this.props.item.id}
      </a>
        </div>
      );
    } else {
      return (
        <div
          onMouseDown={this.handleMouseDown}
          onMouseOver={this.handleMouseOver}
          onMouseUp={this.handleMouseUp}
        >
          <MenuItem
            disabled={this.props.item.pro_only}
            shouldDismissPopover={false}
            className={
              this.props.classes.menuItem +
              (this.isActive ? " pt-active" : "") +
              (this.state.hide ? " hide" : "")
            }
            // iconName="new-text-box"
            label={this.renderShortcut(this.props.item)}
            text={
              <span
                dangerouslySetInnerHTML={{ __html: this.props.item.id }}
              />
            }
          />
        </div>
      );
    }
  };

  render() {
    // const { classes, children } = this.props;
    if (this.props.subItems) {
      return (
        <Popover
          className={this.props.classes.popoverMenuItem}
          transitionEnter={false}
          transitionLeave={false}
          hoverOpenDelay={0}
          hoverCloseDelay={0}
          transitionDuration={0}
          isOpen={this.isActive}
          position={(this.props.header?Position.BOTTOM_LEFT:Position.RIGHT_TOP)}
          popoverClassName={"pt-minimal " + this.props.classes.popover}
          useSmartArrowPositioning={false}
          tetherOptions={{
            constraints: [
              {
                pin: true,
                to: "window"
              }
            ]
          }}
          content={<NavMenu item={this.props.item} items={this.props.item.children} />}
        >
          {this.renderMenuItem()}
        </Popover>
      );
    } else {
      return this.renderMenuItem();
    }
  }
}
