import { FocusStyleManager } from "@blueprintjs/core"
import MainStory from "./components/MainStory/MainStory"
import MediaQuery from "react-responsive"
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider"
import React from "react"
// import this last
import { UserConfigStore } from "./Stores/UserConfigStore"
import css from "./App.module.scss"
import getMuiTheme from "material-ui/styles/getMuiTheme"
// import { useCookies } from "react-cookie"

function App() {
  // Disable accessibility focus
  FocusStyleManager.onlyShowFocusOnTabs()
  const muiTheme = getMuiTheme()

  // const [cookies, setCookie] = useCookies(["name"])
  // const newName = Math.floor(Math.random() * 1000 + 1)

  // if (!cookies.name) {
  //   setCookie("name", newName, { path: "/" })
  // }

  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div className={`${css.App} `}>
        <MediaQuery minDeviceWidth={1224}>
          {/* <div className={css.mediaMsg}>You are a desktop</div> */}
          {/* set global css vars thru class */}
          <MainStory className={css.desktop} />
          {/* <MainStory className={css.mobile} /> */}
        </MediaQuery>
        <MediaQuery maxDeviceWidth={1224}>
          <MainStory className={css.mobile} />
          <div className={css.mediaMsg}>You are a tablet or mobile phone</div>
          <MediaQuery orientation="portrait">
            <div className={css.mediaMsg}>
              You are in portrait view. Please Rotate Screen.
            </div>
          </MediaQuery>
          <MediaQuery orientation="landscape">
            <div className={css.mediaMsg}>You are landscape</div>
          </MediaQuery>
        </MediaQuery>
      </div>
    </MuiThemeProvider>
  )
}

export default App
