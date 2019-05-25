import React from "react";
import { IconNames } from "@blueprintjs/icons";
import { Icon } from "@blueprintjs/core";
import { observer } from "mobx-react";

import Images from "../../images/images.js";
import mySentences from "../../Models/sentences.js";

import css from "./PicturePage.module.scss";

const { plot } = mySentences;

class PicturePage extends React.Component {
  state = {};

  async componentWillMount() {}

  renderSceneList = () => {
    const scenesList = Object.values(plot.scenes);

    const renderedScenes = scenesList.map((scene, index) => {
      const iconColor = scene.isUsed ? "purple" : "blue";
      return (
        <div className={css.scene} key={index}>
          <Icon color={iconColor} icon={IconNames.WALK} />
          <span className={css.sceneName}>{scene.location}</span>
        </div>
      );
    });
    return <div className={css.sceneList}>{renderedScenes}</div> || null;
  };

  renderPicturePage = () => {
    const { activeScene } = this.props;
    const defaultImage = "waterfall";
    const renderedImage = Images[activeScene.location] || Images[defaultImage];

    const youImage = plot.you.creature;
    const friendImage = Images[activeScene.newFriend.type];

    return (
      <div className={css.imageContainer}>
        <div className={css.pageNumber}>{`Page ${this.props.pageNum}`}</div>
        <div className={css.locationHeader}>{`${activeScene.location}`}</div>
        <img
          className={css.backgroundImage}
          src={renderedImage}
          alt={"imagex"}
        />
        {this.renderSceneList()}
        <img
          className={`${css.characterImage} ${css.character1}`}
          src={Images[youImage]}
          alt={youImage}
        />
        {friendImage && (
          <img
            className={`${css.characterImage} ${css.character2}`}
            src={friendImage}
            alt="friend"
          />
        )}
      </div>
    );
  };

  render() {
    return this.renderPicturePage();
  }
}
export default observer(PicturePage);
