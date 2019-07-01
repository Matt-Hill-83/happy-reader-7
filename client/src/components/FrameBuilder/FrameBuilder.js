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

  renderCharacter = ({ character }) => {
    const {
      images: { heads, body },
      name
    } = character;

    const selectedMood = "mad";

    const head = heads.find(head => head.mood === selectedMood);

    const className = css.headForBody;
    return (
      <div className={css.girlBodyContainer}>
        <img
          className={`${css.girlBodyImage}`}
          src={body.image}
          alt={`${"amber-body"}-image`}
        />
        <span className={`${css.bodyLabel}`}>{name}</span>
        {this.renderHead({ head, className })}
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
    const { girlImages, girlName, sceneToEdit } = this.props;
    console.log("girlName", girlName); // zzz
    console.log("sceneToEdit", sceneToEdit); // zzz

    const backgroundImage = Images.backgrounds["hill01"];
    const you = girlImages[0];
    console.log("you", you); // zzz

    const {
      images: { heads }
    } = you;

    const headImages = heads.map(head => {
      return this.renderHead({ head });
    });

    const locationImage = Images.locations[sceneToEdit.name];
    const bookImage = Images.sceneView.book;
    const notebookImage = Images.sceneView.notebook;

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
            <div className={css.notebookImageContainer}>
              <img
                className={css.notebookImage}
                src={notebookImage}
                alt={"imagex"}
              />
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

            {this.renderCharacter({ character: you })}
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
