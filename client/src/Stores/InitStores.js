import "@firebase/firestore"

import { Collection, Document, initFirestorter } from "firestorter"

import firebase from "@firebase/app"
import { struct } from "superstruct"
import { toJS } from "mobx"

firebase.initializeApp({
  projectId: "happy-reader-4"
})

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

// console.log("maps.docs", toJS(maps.docs)) // zzz

// maps.docs.forEach(map => {
//   console.log(
//     "JSON.parse(map.scenesGrid)",
//     toJS(JSON.parse(map.data.scenesGrid))
//   ) // zzz
//   return (map.data.grid = JSON.parse(map.data.scenesGrid))
// })
// console.log("maps", toJS(maps)) // zzz

export { maps }
