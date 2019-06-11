import React from "react";
import { IconNames } from "@blueprintjs/icons";
import { Icon } from "@blueprintjs/core";
import { observer } from "mobx-react";
import LineTo from "react-lineto";

import Images from "../../images/images.js";
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js";
import MiniLocation from "../MiniLocation/MiniLocation.js";
import WordPage from "../WordPage/WordPage.js";

import css from "./PicturePage.module.scss";
import sentences from "../../Models/sentences.js";

const { locationsMap } = sentences;

class PicturePage extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

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

  renderYouMini = () => {
    const plot = localStateStore.getPlot();
    const youImage = plot.you.creature;

    return (
      <img
        className={`${css.characterImageMini} ${css.character1Mini}`}
        src={Images[youImage]}
        alt={youImage}
      />
    );
  };

  renderMiniLocations = () => {
    // Create rows
    const miniLocationsGrid = locationsMap.map((locationRow, rowIndex) => {
      return (
        <div className={css.miniLocationsRowContainer}>
          <div className={css.miniLocationsRow}>
            {this.createSingleRow({ locationRow, rowIndex })}
          </div>
        </div>
      );
    });

    return <div className={css.miniLocationsGrid}>{miniLocationsGrid}</div>;
  };

  storeImageLocation = ({ location, x, y }) => {};

  createSingleRow = ({ locationRow, rowIndex }) => {
    const { activeScene } = this.props;

    const numLocations = locationRow.length;

    return locationRow.map((location, index) => {
      const offset = 100 / numLocations;
      const xPct = offset * index;

      const isActive = location.name === activeScene.location;
      const you = isActive ? this.renderYouMini() : null;
      const characters = [you];

      return (
        <MiniLocation
          xPct={xPct}
          key={location.name}
          location={location.name}
          characters={characters}
          isActive={isActive}
          storeImageLocation={this.storeImageLocation}
          className={location.name}
        />
      );
    });
  };

  createArrows = ({ activeLocation }) => {
    const { activeScene } = this.props;

    if (!activeScene) {
      return null;
    }
    const neighborNames = activeScene.neighbors || [];

    const arrows = neighborNames.map(location => {
      return (
        <LineTo className={css.lineTo} from={activeLocation} to={location} />
      );
    });

    return arrows;
  };

  renderPicturePage = () => {
    const { activeScene, wordPageProps, updateActiveScene } = this.props;

    if (!activeScene) {
      return null;
    }

    const defaultImage = "forest";
    const renderedImage = Images[defaultImage];

    const mapImage = Images.backgrounds["map02"] || Images[defaultImage];
    const activeLocation = activeScene.location;
    console.log("activeLocation", activeLocation); // zzz

    return (
      <div className={css.imageContainer}>
        <div className={`${css.halfPage} ${css.leftHalf}`}>
          <MiniLocation
            xPct={0}
            location={activeLocation}
            className={css.miniActiveLocation}
          />
          <WordPage
            wordPageProps={wordPageProps}
            updateActiveScene={updateActiveScene}
          />
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
          {this.renderMiniLocations()}
          {this.createArrows({ activeLocation })}
        </div>
      </div>
    );
  };

  render() {
    return this.renderPicturePage();
  }
}
export default observer(PicturePage);
