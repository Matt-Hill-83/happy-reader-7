import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { useCookies } from "react-cookie";

import MediaQuery from "react-responsive";
import MainStory from "./components/MainStory/MainStory";
import "./App.module.scss";
// import css from "./App.module.scss";

// import this last
import { UserConfigStore } from "./Stores/UserConfigStore";

function App() {
  const muiTheme = getMuiTheme();

  const [cookies, setCookie] = useCookies(["name"]);
  const newName = Math.floor(Math.random() * 1000 + 1);

  if (!cookies.name) {
    setCookie("name", newName, { path: "/" });
  }

  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div className="App test">
        <MediaQuery minDeviceWidth={1224}>
          <div>You are a desktop</div>
          <MainStory className="test" />
        </MediaQuery>
        <MediaQuery maxDeviceWidth={1224}>
          <MainStory className="mobile" />
          <div>You are a tablet or mobile phone</div>
          <MediaQuery orientation="portrait">
            <div>You are portrait</div>
          </MediaQuery>
          <MediaQuery orientation="landscape">
            <div>You are landscape</div>
          </MediaQuery>
        </MediaQuery>
      </div>
    </MuiThemeProvider>
  );
}

export default App;
