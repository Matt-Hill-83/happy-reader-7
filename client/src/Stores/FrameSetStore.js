import { Collection, Document } from "firestorter"

import { struct } from "superstruct"

class FrameSets extends Document {
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

  getFrameSet = () => this.frameSet
  setFrameSet = frameSet => {
    this.frameSet = frameSet
  }

  frameSet = {}
}

const frameSetStore = new Collection("frameSets", {
  DocumentClass: FrameSets
})

export { frameSetStore }
