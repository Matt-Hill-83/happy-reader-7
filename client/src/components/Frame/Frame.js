import { Button, Icon, Position } from "@blueprintjs/core";
import { IconNames } from "@blueprintjs/icons";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import React, { Component } from "react";
import Images from "../../images/images";
import WordGroup from "../WordGroup/WordGroup";
import Character from "../Character/Character";
import Head from "../Head/Head";

import css from "./Frame.module.scss";
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore";
import Utils from "../../Utils/Utils";

class Frame extends Component {
  state = { frames: [] };

  componentWillMount() {}

  deleteFrame = () => {
    const { deleteFrame } = this.props;

    deleteFrame && deleteFrame({ frame: "id" });
  };

  selectHead = ({ name, head }) => {
    const allCreatures = localStateStore.getCreatures();
    const creature = allCreatures.find(creature => creature.type === name);

    // TODO - I should push the store here.
    creature.mood = head.mood;
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

  renderFrame = ({ you, friends = [] }) => {
    const { sceneToEdit } = this.props;

    const yourName = you.name;

    const yourCreature = Utils.getCreatureByType({ type: yourName });

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
      console.log("friend", friend); // zzz

      const creature = Utils.getCreatureByType({ type: friend });

      return <Character name={friend} mood={creature.mood} />;
    });

    const yourMood = yourCreature.mood;

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
              <Character name={yourName} mood={yourMood} />
            </div>
            {renderedFriends}
          </div>
        </div>
      </div>
    );
  };

  render() {
    const {
      frame,
      frame: { creatures }
    } = this.props;

    console.log("creatures", toJS(creatures)); // zzz

    const friendNames = creatures.map(creature => creature.type);
    const you = localStateStore.getYou();
    const yourName = you.name;
    const friendName = creatures[0] && creatures[0].type;

    /* eslint-disable */ debugger; /* zzz */ /* eslint-ensable */
    return (
      <>
        <div className={css.girlPickersContainer}>
          {this.renderGirlPicker({ name: yourName })}
          {this.renderGirlPicker({ name: friendName })}
        </div>
        <div className={css.scenesContainer}>
          {this.renderFrame({ you, friends: friendNames })}
          {this.renderFrame({ you, friends: friendNames })}
        </div>

        <Button className={css.closeButton} onClick={this.deleteFrame}>
          <Icon icon={IconNames.CROSS} />
        </Button>
      </>
    );
  }
}

export default observer(Frame);
