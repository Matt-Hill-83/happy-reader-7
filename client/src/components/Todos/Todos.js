import React, { Component } from "react";
import { observer } from "mobx-react";
import { todos } from "../../Stores/InitStores";

const Todos = observer(
  class Todos extends Component {
    constructor(props) {
      super(props);
      this.state = {
        disabled: false
      };
    }

    render() {
      console.log(
        "----value-----",
        todos.docs[0] && todos.docs[0]["data"]["text"]
      ); // zzz

      const values = todos.docs.map(todo => <div>{todo.data.text}</div>);

      return <div>{values}</div>;
    }
  }
);

export default Todos;
