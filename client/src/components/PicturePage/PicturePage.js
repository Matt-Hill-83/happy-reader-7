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
    const miniLocation = Images["home"];

    const mapImage = Images.backgrounds["map02"] || Images[defaultImage];

    return (
      <div className={css.imageContainer}>
        <div className={`${css.halfPage} ${css.leftHalf}`}>
          <img
            className={css.backgroundImage}
            src={renderedImage}
            alt={"imagex"}
          />
          <div className={css.locationHeader}>{`${activeScene.location}`}</div>
          <div className={css.pageNumber}>{`Page ${this.props.pageNum}`}</div>
          {this.renderYou()}
        </div>

        <div className={`${css.halfPage} ${css.rightHalf}`}>
          <img className={css.backgroundImage} src={mapImage} alt={"imagex"} />
          {this.renderSceneList()}
          <div className={css.miniLocation}>
            <img
              className={css.miniLocation}
              src={renderedImage}
              alt={"imagex"}
            />
            {this.renderYou()}
            {activeScene.location}
          </div>
          <div className={css.miniLocation2}>
            <img
              className={css.miniLocation2}
              src={miniLocation}
              alt={"imagex"}
            />
            {activeScene.location}
          </div>
        </div>
      </div>
    );
  };

  render() {
    return this.renderPicturePage();
  }
}
export default observer(PicturePage);
