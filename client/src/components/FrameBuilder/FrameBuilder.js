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
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore";

class FrameBuilder extends Component {
  state = {};

  async componentWillMount() {}

  onExitFrameBuilder = () => {
    const { onExitFrameBuilder } = this.props;
    onExitFrameBuilder && onExitFrameBuilder();
  };

  selectHead = ({ girl, head }) => {
    // TODO - need to persist this change.

    // girl.mood = head.mood;

    const plot = localStateStore.getPlot();
    console.log("plot.allCreatures", plot.allCreatures); // zzz

    const you = localStateStore.getYou();
    you.mood = head.mood;
    localStateStore.setYou(you);
  };

  renderGirlPicker = ({ name }) => {
    const girlImages = Images.posableGirls;
    const images = girlImages.find(girl => girl.name === name);

    const {
      images: { heads }
    } = images;

    const headImages = heads.map(head => {
      return (
        <div onClick={() => this.selectHead({ head, name })}>
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

  renderScene = ({ you, friends = [] }) => {
    const { sceneToEdit } = this.props;

    const yourName = you.creature;

    const backgroundImage = Images.backgrounds["hill01"];

    const locationImage = Images.locations[sceneToEdit.name];
    const bookImage = Images.sceneView.book;
    const notebookImage = Images.sceneView.notebook;

    const activeParagraph = [
      `Liz and Kat are girls.`,
      `Liz and Kat play.`,
      `Liz and Kat are so sweet.`
    ];

    const renderedFriends = friends.map(friend => {
      return <Character name={friend} mood={"normal"} />;
    });

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
            <div className={css.youContainer}>
              <Character name={yourName} mood={you.mood} />
            </div>
            {renderedFriends}
          </div>
        </div>
      </div>
    );
  };

  render() {
    const {
      sceneToEdit,
      sceneToEdit: { creatures = [] }
    } = this.props;

    console.log("sceneToEdit", toJS(sceneToEdit)); // zzz
    const friendNames = creatures.map(creature => creature.type);
    console.log("friendNames", friendNames); // zzz

    const you = localStateStore.getYou();

    const yourName = you.creature;
    // const yourName = "amber";
    const friendName = "jan";

    return (
      <div className={css.main}>
        <div className={css.girlPickersContainer}>
          {this.renderGirlPicker({ name: yourName })}
          {this.renderGirlPicker({ name: friendName })}
        </div>
        <div className={css.scenesContainer}>
          {this.renderScene({ you, friends: friendNames })}
          {/* {this.renderScene({ you, friends: [friendName] })} */}
        </div>

        <Button className={css.closeButton} onClick={this.onExitFrameBuilder}>
          <Icon icon={IconNames.CROSS} />
        </Button>
      </div>
    );
  }
}

export default observer(FrameBuilder);
