import React from "react";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import { useCookies } from "react-cookie";
import { observer } from "mobx-react";

import MainStory from "./components/MainStory/MainStory";
import "./App.module.scss";

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
      <div className="App">
        {/* <span>{UserConfigStore.docs}</span> */}
        {/* {cookies.name && <h1>{`Hello Charlie-${cookies.name}!`}</h1>} */}
        <MainStory />
      </div>
    </MuiThemeProvider>
  );
}

export default App;
