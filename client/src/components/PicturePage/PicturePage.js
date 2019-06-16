import React from "react";
import { IconNames } from "@blueprintjs/icons";
import { Icon } from "@blueprintjs/core";
import { observer } from "mobx-react";
import LineTo from "react-lineto";
import _get from "lodash.get";
import MediaQuery from "react-responsive";

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

  renderLocationRows = () => {
    // Create rows
    const miniLocationsGrid = locationsMap.map((locationRow, rowIndex) => {
      return (
        <div key={rowIndex} className={css.miniLocationsRow}>
          {this.createSingleRow({ locationRow, rowIndex })}
        </div>
      );
    });

    return <div className={css.miniLocationsGrid}>{miniLocationsGrid}</div>;
  };

  renderCharacters = ({ isActive, creatures }) => {
    const creatureType = creatures.length > 0 && creatures[0].type;
    const image = Images[creatureType] || null;

    const friend = (
      <img
        className={`${css.characterImageMini} ${css.character2Mini}`}
        src={image}
        alt={creatureType}
      />
    );

    const you = isActive ? this.renderYouMini() : null;
    const characters = [you, friend];

    return characters;
  };

  renderMiniLocation = ({ location, className = "" }) => {
    const { activeScene } = this.props;
    const isActive = location.name === activeScene.name;

    const creatures = _get(location, "scene.creatures") || [];

    const characters = this.renderCharacters({
      creatures,
      isActive
    });

    return (
      <MiniLocation
        key={location.name}
        location={location.name}
        characters={characters}
        isActive={isActive}
        className={className}
      />
    );
  };

  createSingleRow = ({ locationRow }) =>
    locationRow.map(location => this.renderMiniLocation({ location }));

  createArrows = ({ locationName }) => {
    const { activeScene } = this.props;

    if (!activeScene) {
      return null;
    }
    const neighborNames = activeScene.neighbors || [];

    const arrows = neighborNames.map(location => {
      return (
        <LineTo className={css.lineTo} from={locationName} to={location} />
      );
    });

    return arrows;
  };

  renderStoryPage = ({}) => {
    const { activeScene, wordPageProps, updateActiveScene } = this.props;

    const backgroundImage = Images["forest"];
    const locationName = activeScene.name;
    const miniLocation = Images.locations.small[locationName];
    const creatures = _get(locationName, "scene.creatures") || [];

    return (
      <div className={`${css.halfPage} ${css.leftHalf}`}>
        <div className={css.bigMiniImage}>
          {this.renderCharacters({
            creatures,
            isActive: true
          })}
        </div>

        <div className={css.miniLocation}>
          <img src={miniLocation} alt={"imagex"} />
        </div>
        <WordPage
          wordPageProps={wordPageProps}
          updateActiveScene={updateActiveScene}
        />
        <img
          className={css.backgroundImage}
          src={backgroundImage}
          alt={"imagex"}
        />
        <div className={css.locationHeader}>{`${activeScene.name}`}</div>
        <div className={css.pageNumber}>{`Page ${this.props.pageNum}`}</div>
      </div>
    );
  };

  renderMapPage = ({}) => {
    const mapImage = Images.backgrounds["map02"];

    return (
      <div className={`${css.halfPage} ${css.rightHalf}`}>
        <div className={`${css.mapScroller}`}>
          <img className={css.backgroundImage} src={mapImage} alt={"imagex"} />
          {this.renderLocationRows()}
          {/* {this.createArrows({ locationName })} */}
        </div>
      </div>
    );
  };

  render() {
    const smallMap = localStateStore.getsmallMap();
    const storyClass = smallMap ? css.smallMap : "";

    return (
      <div className={`${css.main} ${storyClass}`}>
        {this.renderStoryPage({})}
        {this.renderMapPage({})}
      </div>
    );
  }
}
export default observer(PicturePage);
