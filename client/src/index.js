import React from "react"
import ReactDOM from "react-dom"
import "@firebase/firestore"
import "@blueprintjs/core/lib/css/blueprint.css"
import "@blueprintjs/table/lib/css/table.css"

// Import this first to initialize stores.
import { test } from "./Stores/InitStores"
import App from "./App"

// Use this file to add words to the db in bulk.
// ReactDOM.render(<Words />, document.getElementById("root"));
ReactDOM.render(<App />, document.getElementById("root"))
