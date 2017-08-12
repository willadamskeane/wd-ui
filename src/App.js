import React, { Component } from "react";
import logo from "./logo.svg";
import NavBar from "./components/NavBar";
import { FocusStyleManager } from "@blueprintjs/core";
import Paper from "material-ui/Paper";
import Grid from "material-ui/Grid";

import "./App.css";
import UiState from "./UiState";
import mobx from "mobx";
import { observer } from "mobx-react";


FocusStyleManager.onlyShowFocusOnTabs();

@observer
class App extends Component {

  handleClick() {
    UiState.resetNavBar();
  }

  render() {
    return (
      <div className="App" onClick={this.handleClick}>
        <NavBar />
        
<div className="pt-non-ideal-state">
<div className="pt-non-ideal-state-visual pt-non-ideal-state-icon">
  <span className="pt-icon pt-icon-folder-open"></span>
</div>
<h4 className="pt-non-ideal-state-title">This folder is empty</h4>
<div className="pt-non-ideal-state-description">
  Create a new file to populate the folder.
</div>
</div>

      </div>
    );
  }
}

export default App;
