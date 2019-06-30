import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { FocusStyleManager } from "@blueprintjs/core";
import { useCookies } from "react-cookie";

import MediaQuery from "react-responsive";
import MainStory from "./components/MainStory/MainStory";

import css from "./App.module.scss";

// import this last
import { UserConfigStore } from "./Stores/UserConfigStore";
import Todos from "./components/Todos/Todos";

function App() {
  // return <Todos>test</Todos>;
  // Disable accessibility focus
  FocusStyleManager.onlyShowFocusOnTabs();
  const muiTheme = getMuiTheme();

  const [cookies, setCookie] = useCookies(["name"]);
  const newName = Math.floor(Math.random() * 1000 + 1);

  if (!cookies.name) {
    setCookie("name", newName, { path: "/" });
  }

  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div className={`${css.App} `}>
        <MediaQuery minDeviceWidth={1224}>
          <div className={css.mediaMsg}>You are a desktop</div>
          {/* set global css vars thru class */}
          <MainStory className={css.desktop} />
          {/* <MainStory className={css.mobile} /> */}
        </MediaQuery>
        <MediaQuery maxDeviceWidth={1224}>
          <MainStory className={css.mobile} />
          <div className={css.mediaMsg}>You are a tablet or mobile phone</div>
          <MediaQuery orientation="portrait">
            <div className={css.mediaMsg}>You are portrait</div>
          </MediaQuery>
          <MediaQuery orientation="landscape">
            <div className={css.mediaMsg}>You are landscape</div>
          </MediaQuery>
        </MediaQuery>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
