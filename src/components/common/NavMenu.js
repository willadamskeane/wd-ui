import React from "react";
import { Menu, MenuItem, MenuDivider } from "@blueprintjs/core";
import { createStyleSheet } from "material-ui/styles";
import { withStyles } from "material-ui/styles";
import { observer } from "mobx-react";
import { observable, computed } from "mobx";
import UiState from "../../UiState";
import { NavMenuItem } from "./NavMenuItem";

const styleSheet = createStyleSheet(theme => ({
  menu: {
    fontFamily: "Open Sans",
    fontSize: 12,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0
  },
  popover: {
    opacity: "1 !important",
    boxShadow:
      "0 2px 4px rgba(16, 22, 26, 0.4), 0 8px 24px rgba(16, 22, 26, 0.4) !important"
  }
}));

@withStyles(styleSheet)
export class NavMenu extends React.Component {
  renderNavMenuItems(items, parent) {
    return items.map((menu, i) => {
      if (menu) {
        menu.id = (menu.parent && menu.parent.id + "_") + menu.heading;
        if (parent) {
          menu.parent = { id: parent.id, parent: parent.parent };
        }
        return (
          <NavMenuItem
            key={i}
            item={menu}
            subItems={
              menu.children && this.renderNavMenuItems(menu.children, menu)
            }
          />
        );
      }
      return <MenuDivider />;
    });
  }

  render() {
    return (
      <Menu className={this.props.classes.menu}>
        {this.renderNavMenuItems(this.props.items, this.props.item)}
      </Menu>
    );
  }
}
