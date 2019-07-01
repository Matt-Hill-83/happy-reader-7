import { Button, Icon, Position } from "@blueprintjs/core";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IconNames } from "@blueprintjs/icons";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import React, { Component } from "react";

import css from "./FrameBuilder.module.scss";
import MiniLocation from "../MiniLocation/MiniLocation";

class FrameBuilder extends Component {
  state = {};

  async componentWillMount() {}

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
        <Button className={css.closeButton} onClick={this.onExitFrameBuilder}>
          <Icon icon={IconNames.CROSS} />
        </Button>
        <div className={css.girlPickerContainer}>
          <div className={css.girlPicker}>{images}</div>
        </div>
        <div className={css.scene}>
          {/* <MiniLocation
            id={id}
            key={name}
            location={scene}
            characters={creatures}
          /> */}
        </div>
        <div className={css.girlPickerContainer}>
          <div className={css.girlPicker}>{images}</div>
        </div>
      </div>
    );
  }
}

export default observer(FrameBuilder);
