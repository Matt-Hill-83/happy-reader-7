import { Button, Icon, Position } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import React, { Component } from "react";
import Images from "../../images/images";
import WordGroup from "../WordGroup/WordGroup";
import Character from "../Character/Character";
import Head from "../Head/Head";

import css from "./FrameBuilder.module.scss";

class FrameBuilder extends Component {
  state = {};

  async componentWillMount() {}

  onExitFrameBuilder = () => {
    const { onExitFrameBuilder } = this.props;
    onExitFrameBuilder && onExitFrameBuilder();
  };

  selectHead = ({ girl, head }) => {
    // TODO - need to persist this change.
    girl.mood = head.mood;
  };

  renderGirlPicker = ({ girl }) => {
    const {
      images: { heads }
    } = girl;

    const headImages = heads.map(head => {
      return (
        <div onClick={() => this.selectHead({ head, girl })}>
          <Head head={head} />
        </div>
      );
    });

    return (
      <div className={css.girlPickerContainer}>
        <div className={css.girlPicker}>{headImages}</div>
      </div>
    );
  };

  renderScene = ({ you, friend }) => {
    const { sceneToEdit } = this.props;
    const backgroundImage = Images.backgrounds["hill01"];

    const locationImage = Images.locations[sceneToEdit.name];
    const bookImage = Images.sceneView.book;
    const notebookImage = Images.sceneView.notebook;

    const activeParagraph = [
      `Girls play.`,
      `You are a $-{you.creature}.`,
      `You live in the $-{you.homeLocation}.`,
      `You are sooooo happy.`
    ];

    return (
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
            <div className={css.narrative}>
              <WordGroup
                story={activeParagraph}
                className={css.narrativeClass}
              />
            </div>
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

          <div className={css.charactersContainer}>
            <Character character={you} />
            <Character character={friend} />
          </div>
        </div>
      </div>
    );
  };

  render() {
    const { girlImages } = this.props;
    console.log("girlImages", girlImages); // zzz

    const yourName = "amber";
    const friendName = "jan";

    const you = girlImages.find(girl => girl.name === yourName);
    const friend = girlImages.find(girl => girl.name === friendName);

    return (
      <div className={css.main}>
        <div className={css.girlPickersContainer}>
          {this.renderGirlPicker({ girl: you })}
          {this.renderGirlPicker({ girl: friend })}
        </div>
        <div className={css.scenesContainer}>
          {this.renderScene({ you, friend })}
          {this.renderScene({ you, friend })}
        </div>

        <Button className={css.closeButton} onClick={this.onExitFrameBuilder}>
          <Icon icon={IconNames.CROSS} />
        </Button>
      </div>
    );
  }
}

export default observer(FrameBuilder);
