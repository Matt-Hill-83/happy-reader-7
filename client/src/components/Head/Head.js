import { observer } from "mobx-react";
import { toJS } from "mobx";
import React, { Component } from "react";

import css from "./Head.module.scss";

class Head extends Component {
  state = {};

  async componentWillMount() {}

  render() {
    const {
      head: { image, mood },
      className = ""
    } = this.props;
    // const { image, mood } = head;

    return (
      <div className={`${css.girlHeadContainer} ${className}`}>
        <img
          className={`${css.girlHead} ${css.girlHeadAmber}`}
          src={image}
          alt={`${"amber-head"}-image`}
        />
        <span className={css.moodLabel}>{mood}</span>
      </div>
    );
  }
}

export default observer(Head);
