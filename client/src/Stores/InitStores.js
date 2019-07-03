import firebase from "@firebase/app"
import "@firebase/firestore"
import { initFirestorter, Collection, Document } from "firestorter"
import { struct } from "superstruct"

firebase.initializeApp({
  projectId: "happy-reader-4"
})

const firestore = firebase.firestore()
firestore.settings({ timestampsInSnapshots: true })

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
class Frames extends Document {
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

const frames = new Collection("frames", {
  DocumentClass: Frames
})

export { maps, frames }
