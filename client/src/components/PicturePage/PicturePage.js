import React from "react";
import { IconNames } from "@blueprintjs/icons";
import { Icon } from "@blueprintjs/core";
import { observer } from "mobx-react";

import Images from "../../images/images.js";
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js";

import css from "./PicturePage.module.scss";

class PicturePage extends React.Component {
  state = {};

  async componentWillMount() {}

  renderSceneList = () => {
    const plot = localStateStore.getPlot();
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

  renderYou = () => {
    const plot = localStateStore.getPlot();
    const youImage = plot.you.creature;

    return (
      <img
        className={`${css.characterImage} ${css.character1}`}
        src={Images[youImage]}
        alt={youImage}
      />
    );
  };

  renderPicturePage = () => {
    const { activeScene } = this.props;
    const defaultImage = "waterfall";
    const renderedImage = Images[activeScene.location] || Images[defaultImage];

    const mapImage = Images.backgrounds["map02"] || Images[defaultImage];

    const friendImage =
      activeScene.newFriend && Images[activeScene.newFriend.type];

    return (
      <div className={css.imageContainer}>
        <div className={css.pageNumber}>{`Page ${this.props.pageNum}`}</div>
        <div className={css.locationHeader}>{`${activeScene.location}`}</div>
        <img
          className={css.backgroundImage}
          src={renderedImage}
          alt={"imagex"}
        />
        <img className={css.backgroundImage} src={mapImage} alt={"imagex"} />
        {this.renderSceneList()}
        {this.renderYou()}
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
