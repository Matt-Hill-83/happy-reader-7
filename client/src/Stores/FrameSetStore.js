import { Collection, Document } from "firestorter"

import { struct } from "superstruct"

class FrameSets extends Document {
  constructor(source, options) {
    super(source, {
      ...(options || {}),
      // schema: struct({
      //   name: "string?",
      //   grid: "string?",
      //   finished: "boolean?"
      // })
    })
  }

  getFrameSet = () => this.frameSet
  setFrameSet = (frameSet) => {
    this.frameSet = frameSet
  }

  frameSet = {}
}

class WorldNames extends Document {
  constructor(source, options) {
    super(source, {
      ...(options || {}),
      // schema: struct({
      //   name: "string?",
      //   grid: "string?",
      //   finished: "boolean?"
      // })
    })
  }
}

const frameSetStore = new Collection("frameSets", {
  DocumentClass: FrameSets,
})

const worldNameStore = new Collection("worldNames", {
  DocumentClass: WorldNames,
})

export { frameSetStore, worldNameStore }
