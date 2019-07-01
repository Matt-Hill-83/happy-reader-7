import { observer } from "mobx-react";
import { toJS } from "mobx";
import React, { Component } from "react";

import css from "./Head.module.scss";

class Head extends Component {
  render() {
    console.log("this.props", this.props); // zzz

    const {
      head: { image, mood },
      className = ""
    } = this.props;

    return (
      <div className={`${css.girlHeadContainer} ${className}`}>
        <img
          className={`${css.girlHead} ${css.girlHeadAmber}`}
          src={image}
          alt={`${"mood"}-image`}
        />
        <span className={css.moodLabel}>{mood}</span>
      </div>
    );
  }
}

export default observer(Head);
