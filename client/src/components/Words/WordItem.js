import React, { Component } from "react";
import { observer } from "mobx-react";

import { Checkbox } from "@blueprintjs/core";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column"
  },
  row: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  checkbox: {
    marginLeft: 16,
    width: 40
  },
  input: {
    flex: 1
  },
  icon: {
    marginRight: 6
  }
};

class WordItem extends Component {
  render() {
    const { word } = this.props;
    const { isFavorite, name } = word.data;

    return (
      <div>
        {name}
        <Checkbox
          style={styles.checkbox}
          onClick={this.onPressCheck}
          checked={isFavorite}
        />
      </div>
    );
  }

  onPressDelete = async () => {
    const { word } = this.props;
    if (this._deleting) return;
    this._deleting = true;
    try {
      await word.delete();
      this._deleting = false;
    } catch (err) {
      this._deleting = false;
    }
  };

  onPressCheck = async () => {
    const { word } = this.props;

    await word.update({
      isFavorite: !word.data.isFavorite
    });
  };

  onTextChange = async (event, newValue) => {
    const { word } = this.props;
    await word.update({
      text: newValue
    });
  };
}

export default observer(WordItem);
