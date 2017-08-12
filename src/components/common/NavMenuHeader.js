import React from "react";
import {
  Popover,
  PopoverInteractionKind,
  AnchorButton,
  Position
} from "@blueprintjs/core";
import { createStyleSheet } from "material-ui/styles";
import { withStyles } from "material-ui/styles";
import { NavMenu } from "./NavMenu";
import { observable, computed } from "mobx";
import { observer } from "mobx-react";
import UiState from "../../UiState";

const styleSheet = createStyleSheet(theme => ({
  popover: {
    opacity: "1 !important",
    boxShadow:
      "0 2px 4px rgba(16, 22, 26, 0.4), 0 8px 24px rgba(16, 22, 26, 0.4) !important"
  },
  button: {
    userSelect: "none",
    borderRadius: 0,
    fontWeight: "Semibold",
    lineHeight: "36px",
    height: "36",
    fontFamily: "Open Sans",
    fontSize: 12,
    cursor: "default !important",
    "&:active:not(.pt-active)": { background: "inherit !important" }
  }
}));

@withStyles(styleSheet)
export class NavMenuHeader extends React.Component {
  // handleClick = event => {
  //   if (this.isActive && UiState.navBar.lastClicked) {
  //     UiState.resetNavBar();
  //   } else {
  //     UiState.selectNavMenuItem(this.props.item, "click");
  //   }
  //   event.stopPropagation();
  // };

  // handleMouseOver = event => {
  //   if (UiState.navBar.activeNavMenuItem) {
  //     UiState.selectNavMenuItem(this.props.item);
  //   }
  // };

  // handleMouseDown = event => {
  //   UiState.selectNavMenuItem(this.props.item, "mousedown");
  //   event.stopPropagation();
  // };

  // handleMouseUp = event => {
  //   UiState.navBar.mouseDown = false;
  // };

  // @computed
  // get isActive() {
  //   console.log(UiState.navBar.activeNavMenuItem);

  //   if (!this.props.item) return false;
  //   var activeNavMenuItem = UiState.navBar.activeNavMenuItem;
  //   while (activeNavMenuItem) {
  //     if (activeNavMenuItem.id === this.props.item.id) return true;
  //     if (activeNavMenuItem.parent) {
  //       activeNavMenuItem = activeNavMenuItem.parent;
  //     } else {
  //       return false;
  //     }
  //   }
  //   return false;
  // }

  render() {
    const { classes, children } = this.props;
    return (
      // <Popover
      //   transitionEnter={false}
      //   transitionLeave={false}
      //   hoverOpenDelay={0}
      //   hoverCloseDelay={0}
      //   transitionDuration={0}
      //   isOpen={this.isActive}
      //   position={Position.BOTTOM_LEFT}
      //   popoverClassName={"pt-minimal " + classes.popover}
      //   useSmartArrowPositioning={false}
      //   tetherOptions={{
      //     constraints: [
      //       {
      //         pin: true,
      //         to: "window"
      //       }
      //     ]
      //   }}
      //   content={<NavMenu item={this.props.item} items={this.props.items} />}
      // >
        <a
          // onMouseOver={(e) => this.handleInteraction(e,UiState.navBar.activeNavMenu)}
          ref="anchor"
          onClick={this.handleClick}
          onMouseOver={this.handleMouseOver}
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
          className={
            (this.isActive ? "pt-active " : "") +
            "pt-button pt-minimal " +
            classes.button
          }
        >
          {children}
        </a>
      // </Popover>
    );
  }
}
