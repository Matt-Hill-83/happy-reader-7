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

    // return (
    //   <div className={css.girlPickerContainer}>
    //     <div className={css.girlPicker}>{images}</div>
    //   </div>
    // );
  };

  onExitFrameBuilder = () => {
    const { onExitFrameBuilder } = this.props;
    onExitFrameBuilder && onExitFrameBuilder();
  };

  render() {
    const { girlImages, girlName, sceneToEdit } = this.props;
    console.log("girlName", girlName); // zzz
    console.log("sceneToEdit", sceneToEdit); // zzz

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
      <div className={css.main}>
        <Button onClick={this.onExitFrameBuilder}>
          <Icon icon={IconNames.CROSS} />
        </Button>
        <div className={css.girlPickerContainer}>
          <div className={css.girlPicker}>{images}</div>
        </div>
      </div>
    );
  }
}

export default observer(FrameBuilder);
