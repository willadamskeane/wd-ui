import React from "react";
import PropTypes from "prop-types";
import { withStyles, createStyleSheet } from "material-ui/styles";
import AppBar from "material-ui/AppBar";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import createMuiTheme from "material-ui/styles/theme";
import createPalette from "material-ui/styles/palette";
import createTypography from "material-ui/styles/typography";
import { MuiThemeProvider } from "material-ui/styles";
import { AnchorButton, Button } from "@blueprintjs/core";
import { Menu, MenuItem, MenuDivider } from "@blueprintjs/core";
import { NavMenuHeader, NavMenuItem } from "./common";
import { observable, computed } from "mobx";
import { menu } from "../menu";

const theme = createMuiTheme({
  palette: createPalette({
    type: "dark", // Switching the dark mode on is a single property value change.,
    shades: {
      dark: {
        background: {
          appBar: "#394B59",
          default: "#394B59",
          paper: "#394B59",
          contentFrame: "#394B59",
          status: "#394B59"
        }
      }
    }
  }),
  typography: createTypography(createPalette(), {
    fontFamily: "Open Sans"
  })
});

const styleSheet = createStyleSheet({
  navBar: {
    height: 36
  },
  root: {
    fontSize: 12,
    height: 36,
    width: "100%"
  }
});

@withStyles(styleSheet)
export default class SimpleAppBar extends React.Component {

  renderNavMenuHeaders() {
    return menu.map((menu => {
      menu.id = menu.heading;
      return <NavMenuItem header={true} item={menu} subItems={menu.children}>{menu.heading}</NavMenuItem>
    }));
  }

  render() {
    const classes = this.props.classes;
    return (
      <MuiThemeProvider theme={theme}>
        <nav className={"pt-navbar pt-dark " + classes.navBar}>
          <div className={"pt-navbar-group pt-align-left " + classes.navBar}>
            { this.renderNavMenuHeaders() }
          </div>
          <div className={"pt-navbar-group pt-align-right " + classes.navBar}>
          <NavMenuHeader>Home</NavMenuHeader>
            <button className="pt-button pt-minimal pt-icon-document">
              Portfolio
            </button>
            <span className="pt-navbar-divider" />

            <button className="pt-button pt-minimal pt-icon-user" />
            <button className="pt-button pt-minimal pt-icon-notifications" />
            <button className="pt-button pt-minimal pt-icon-cog" />
          </div>
        </nav>
      </MuiThemeProvider>
    );
  }
}

SimpleAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};
