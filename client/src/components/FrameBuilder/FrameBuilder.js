import { Button, Icon, Position } from "@blueprintjs/core";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { IconNames } from "@blueprintjs/icons";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import React, { Component } from "react";

import css from "./FrameBuilder.module.scss";
import MiniLocation from "../MiniLocation/MiniLocation";
import Images from "../../images/images";

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

    const backgroundImage = Images.backgrounds["hill01"];

    const headImages = girlImages[0].images.heads.map(head => {
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

    const locationImage = Images.locations[sceneToEdit.name];
    const bookImage = Images.sceneView.book;

    return (
      <div className={css.main}>
        <div className={css.girlPickerContainer}>
          <div className={css.girlPicker}>{headImages}</div>
        </div>
        <div className={css.scene}>
          <div className={css.backgroundImageContainer}>
            <div className={css.locationImageContainer}>
              <img
                className={css.locationImage}
                src={locationImage}
                alt={"imagex"}
              />
            </div>
            <div className={css.bookImageContainer}>
              <img className={css.bookImage} src={bookImage} alt={"imagex"} />
            </div>
            {/* <div className={css.backgroundSky}>
              <img
              className={`${css.backgroundSkyImage} `}
              src={backgroundImage}
              alt={`${"amber-head"}-image`}
              />
            </div> */}
            <div className={css.backgroundGrass}>
              <img
                className={`${css.backgroundGrassImage} `}
                src={backgroundImage}
                alt={`${"amber-head"}-image`}
              />
            </div>
          </div>
        </div>

        {/* <MiniLocation location={sceneToEdit} /> */}
        <div className={css.girlPickerContainer}>
          <div className={css.girlPicker}>{headImages}</div>
        </div>

        <Button className={css.closeButton} onClick={this.onExitFrameBuilder}>
          <Icon icon={IconNames.CROSS} />
        </Button>
      </div>
    );
  }
}

export default observer(FrameBuilder);
