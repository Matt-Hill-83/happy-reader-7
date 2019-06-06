import React from "react";
import { IconNames } from "@blueprintjs/icons";
import { Icon } from "@blueprintjs/core";
import { observer } from "mobx-react";

import Images from "../../images/images.js";
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js";
import MiniLocation from "../MiniLocation/MiniLocation.js";

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

  renderMiniLocations = () => {
    const locations = [
      { name: "castle", xPct: 10, yPct: 14 },
      { name: "house", xPct: 20, yPct: 72 },
      { name: "treehouse", xPct: 14, yPct: 46 },
      { name: "waterfall", xPct: 54, yPct: 57 }
    ];
    // const locations = ["school", "forest", "waterfall", "home"];
    const numLocations = locations.length;

    return locations.map((location, index) => {
      const offset = 100 / (numLocations + 1);
      // const xPct = offset * (index + 1);
      // const yPct = offset * (index + 1);

      return (
        <MiniLocation
          xPct={location.xPct}
          yPct={location.yPct}
          key={location.name}
          location={location.name}
        />
      );
    });
  };

  renderPicturePage = () => {
    const { activeScene } = this.props;
    const defaultImage = "waterfall";
    const renderedImage = Images[activeScene.location] || Images[defaultImage];

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
          {this.renderMiniLocations()}
        </div>
      </div>
    );
  };

  render() {
    return this.renderPicturePage();
  }
}
export default observer(PicturePage);
