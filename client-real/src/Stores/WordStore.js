import { Collection, Document } from "firestorter";
import { struct } from "superstruct";

class Word extends Document {
  constructor(source, options) {
    super(source, {
      ...(options || {}),
      schema: struct({
        text: "string?",
        isFavorite: "boolean?",
        name: "string?",
        type: "string?",
        image: "string?",
        family: "string?"
      })
    });
  }
}

const words2 = new Collection("words", {
  DocumentClass: Word
});

console.log("words2", words2); // zzz

export { words2 };
