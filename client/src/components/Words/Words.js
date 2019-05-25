// This is a test file that I used to seed the database.

import React, { Component } from "react";
import { observer } from "mobx-react";

import WordItem from "./WordItem";
import { words2 } from "../../Stores/WordStore";

import { Button } from "@blueprintjs/core";
import words from "../../Models/words";

const styles = {
  container: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    position: "relative"
  },
  loader: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  },
  header: {
    padding: 16,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottom: "1px solid #DDD"
  },
  content: {
    flex: 1,
    overflowY: "scroll"
  }
};

const Words = observer(
  class Words extends Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    clone = object => {
      return object ? JSON.parse(JSON.stringify(object)) : null;
    };

    onPressAdd = () => {
      this.addItems({ words: words.words });
    };

    addItems = ({ words }) => {
      words.forEach(async word => {
        try {
          await words2.add(word);
        } catch (err) {
          // TODO
        }
      });
    };

    render() {
      const { docs } = words2;

      const children = docs.map(word => <WordItem key={word.id} word={word} />);
      const { isLoading } = words2;

      return (
        <div style={styles.container}>
          <Button style={styles.add} onClick={this.onPressAdd}>
            Load Data to DataBase
          </Button>
          <div style={styles.content} className="mobile-margins">
            {children}
          </div>
          {isLoading ? <div style={styles.loader}>loading</div> : undefined}
        </div>
      );
    }
  }
);

export default Words;
