import "@firebase/firestore"

import { Collection, Document, initFirestorter } from "firestorter"

import firebase from "@firebase/app"
import { struct } from "superstruct"

firebase.initializeApp({
  projectId: "happy-reader-4"
})

// const firestore = firebase.firestore()
// firestore.settings({ timestampsInSnapshots: true })

initFirestorter({ firebase: firebase })

class Map extends Document {
  constructor(source, options) {
    super(source, {
      ...(options || {})
      // schema: struct({
      //   name: "string?",
      //   grid: "string?",
      //   finished: "boolean?"
      // })
    })
  }
}

const maps = new Collection("maps", {
  DocumentClass: Map
})

export { maps }
