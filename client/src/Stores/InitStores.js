import firebase from "@firebase/app";
import "@firebase/firestore";
import { initFirestorter, Collection, Document } from "firestorter";
import { struct } from "superstruct";

firebase.initializeApp({
  projectId: "happy-reader-4"
});

const firestore = firebase.firestore();
firestore.settings({ timestampsInSnapshots: true });

initFirestorter({ firebase: firebase });

class Todo extends Document {
  constructor(source, options) {
    super(source, {
      ...(options || {}),
      schema: struct({
        text: "string",
        finished: "boolean?"
      })
    });
  }
}

const todos = new Collection("todos", {
  DocumentClass: Todo
});
console.log({ todos });
export { todos };
