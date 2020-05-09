import { Collection, Document } from "firestorter"

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
