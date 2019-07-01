import { observer } from "mobx-react";
import { toJS } from "mobx";
import React, { Component } from "react";
import Head from "../Head/Head";

import css from "./Character.module.scss";

class Character extends Component {
  state = {};

  async componentWillMount() {}

  renderCharacter = ({ character }) => {
    const {
      images: { heads, body },
      name,
      mood
    } = character;

    const head = heads.find(head => head.mood === mood);

    const className = css.headForBody;
    return (
      <div className={css.girlBodyContainer}>
        <img
          className={`${css.girlBodyImage}`}
          src={body.image}
          alt={`${"amber-body"}-image`}
        />
        <span className={`${css.bodyLabel}`}>{name}</span>
        <Head head={head} />
        {/* {this.renderHead({ head, className })} */}
      </div>
    );
  };

  renderHead = ({ head, className = "" }) => {
    const { image, mood } = head;

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
  };

  render() {
    const { character } = this.props;
    return this.renderCharacter({ character });
  }
}

export default observer(Character);
