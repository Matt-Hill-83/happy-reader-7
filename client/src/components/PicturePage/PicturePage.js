import React from "react";
import { IconNames } from "@blueprintjs/icons";
import { Icon } from "@blueprintjs/core";
import { observer } from "mobx-react";
import LineTo from "react-lineto";
import _get from "lodash.get";

import Images from "../../images/images.js";
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js";
import MiniLocation from "../MiniLocation/MiniLocation.js";
import WordPage from "../WordPage/WordPage.js";
import sentences from "../../Models/sentences.js";

import css from "./PicturePage.module.scss";

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
        <div className={css.miniLocationsRow}>
          {this.createSingleRow({ locationRow, rowIndex })}
        </div>
      );
    });

    return <div className={css.miniLocationsGrid}>{miniLocationsGrid}</div>;
  };

  createSingleRow = ({ locationRow }) => {
    const {
      activeScene,
      activeScene: { newFriend }
    } = this.props;

    console.log("activeScene", activeScene); // zzz

    console.log("newFriend", newFriend); // zzz
    const test = _get(activeScene, "newFriend.type");
    console.log("test", test); // zzz

    const friendType = _get(activeScene, "newFriend.type") || "elf";
    // const friendType = "elf";
    const defaultImage = "elf";
    const image = Images[friendType] || Images[defaultImage];

    const friend = (
      <img
        className={`${css.characterImageMini} ${css.character2Mini}`}
        src={image}
        alt={friendType}
      />
    );

    return locationRow.map(location => {
      const isActive = location.name === activeScene.location;
      const you = isActive ? this.renderYouMini() : null;
      const characters = [you, friend];

      return (
        <MiniLocation
          key={location.name}
          location={location.name}
          characters={characters}
          isActive={isActive}
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
          <div className={`${css.mapScroller}`}>
            <img
              className={css.backgroundImage}
              src={mapImage}
              alt={"imagex"}
            />
            {this.renderMiniLocations()}
            {this.createArrows({ activeLocation })}
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
