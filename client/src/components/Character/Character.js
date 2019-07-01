import { observer } from "mobx-react";
import { toJS } from "mobx";
import React, { Component } from "react";
import Head from "../Head/Head";

import css from "./Character.module.scss";
import Images from "../../images/images";

class Character extends Component {
  state = {};

  async componentWillMount() {}

  // renderCharacter = ({ character }) => {
  //   const girlImages = Images.posableGirls;
  //   const youImages = girlImages.find(girl => girl.name === you);

  //   const {
  //     images: { heads, body },
  //     name,
  //     mood
  //   } = character;

  //   const head = heads.find(head => head.mood === mood);

  //   const className = css.headForBody;
  //   return (
  //     <div className={css.girlBodyContainer}>
  //       <img
  //         className={`${css.girlBodyImage}`}
  //         src={body.image}
  //         alt={`${"amber-body"}-image`}
  //       />
  //       <span className={`${css.bodyLabel}`}>{name}</span>
  //       <Head head={head} className={className} />
  //     </div>
  //   );
  // };

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
    const girlImages = Images.posableGirls;
    const youImages = girlImages.find(girl => girl.name === character);

    const {
      images: { heads, body },
      name,
      mood
    } = youImages;

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
        <Head head={head} className={className} />
      </div>
    );
  }
}

export default observer(Character);
