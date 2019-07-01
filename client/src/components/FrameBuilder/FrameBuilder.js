import { Button, Icon, Position } from "@blueprintjs/core";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IconNames } from "@blueprintjs/icons";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import React, { Component } from "react";

import css from "./FrameBuilder.module.scss";

class FrameBuilder extends Component {
  state = {};

  async componentWillMount() {}

  renderGirlPicker = () => {
    const { girlImages, girlName } = this.props;

    /* eslint-disable */ debugger; /* eslint-ensable */ /* zzz */
    if (!girlImages.length && girlImages.length > 0) {
      return null;
    }

    const images = girlImages[0].images.heads.map(head => {
      const { image, mood } = head;

      return (
        <div className={css.girlHeadContainer}>
          <img
            className={`${css.girlHead} ${css.girlHeadAmber}`}
            src={image}
            alt={`${"amber-head"}-image`}
          />
          <span className={css.characterLabel}>{mood}</span>
        </div>
      );
    });

    return (
      <div className={css.girlPickerContainer}>
        <div className={css.girlPicker}>{images}</div>
      </div>
    );
  };

  render() {
    const { girlName } = this.props;

    return <div className={css.main}>{this.renderGirlPicker()}</div>;
  }
}

export default observer(FrameBuilder);
