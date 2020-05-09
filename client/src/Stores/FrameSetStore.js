import { Collection, Document } from "firestorter"

// import { struct } from "superstruct"

// class FrameSets extends Document {
//   constructor(source, options) {
//     super(source, {
//       ...(options || {}),
//     })
//   }

//   getFrameSet = () => this.frameSet
//   setFrameSet = (frameSet) => {
//     this.frameSet = frameSet
//   }

//   frameSet = {}
// }

class WorldNames extends Document {
  constructor(source, options) {
    super(source, {
      ...(options || {}),
    })
  }
}

const worldNameStore = new Collection("worldNames", {
  DocumentClass: WorldNames,
})

export { worldNameStore }
