import React, { Component } from "react";
import { observer } from "mobx-react";
import { todos } from "../../Stores/InitStores";
// import { todos } from "./store";

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

      const { isLoading } = todos;
      // console.log('Todos.render, isLoading: ', isLoading);
      return <div>test</div>;
    }
  }
);

export default Todos;
