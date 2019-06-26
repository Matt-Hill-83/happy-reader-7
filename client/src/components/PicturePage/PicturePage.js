import React from "react";
// import { IconNames } from "@blueprintjs/icons";
// import { Icon } from "@blueprintjs/core";
import { observer } from "mobx-react";
import LineTo from "react-lineto";
import _get from "lodash.get";

import DragTest from "../DragTest/DragTest.js";
import Images from "../../images/images.js";
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js";
import MiniLocation from "../MiniLocation/MiniLocation.js";
import WordPage from "../WordPage/WordPage.js";

import css from "./PicturePage.module.scss";

import myWords from "../../Models/words.js";
import Utils from "../../Utils/Utils.js";

const { words, wordTypes } = myWords;

class PicturePage extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  // renderSceneList = () => {
  //   const plot = localStateStore.getPlot();
  //   const scenesList = Object.values(plot.scenes);

  //   const renderedScenes = scenesList.map((scene, index) => {
  //     const iconColor = scene.isUsed ? "purple" : "blue";
  //     return (
  //       <div className={css.scene} key={index}>
  //         <Icon color={iconColor} icon={IconNames.WALK} />
  //         <span className={css.sceneName}>{scene.location}</span>
  //       </div>
  //     );
  //   });
  //   return <div className={css.sceneList}>{renderedScenes}</div> || null;
  // };

  renderYouMini = () => {
    const { you } = localStateStore.getPlot();

    const youImage = you.creature;

    return (
      <img
        className={`${css.characterImageMini} ${css.characterYouMini}`}
        src={Images.creatures[youImage]}
        alt={youImage}
      />
    );
  };

  renderLocationRows = () => {
    const locationsMap = localStateStore.getActiveLocationsMap();

    const miniLocationsGrid = locationsMap.grid.map((locationRow, rowIndex) => {
      return (
        <div key={rowIndex} className={css.miniLocationsRow}>
          {this.createSingleRow({ locationRow, rowIndex })}
        </div>
      );
    });

    return <div className={css.miniLocationsGrid}>{miniLocationsGrid}</div>;
  };

  getLocationsForDragger = () => {
    const plot = localStateStore.getPlot();

    return plot.allScenes.map((location, colIndex) => {
      return {
        id: `location-${colIndex}`,
        creatures: [],
        // This should be rendered in the DragTest component, based on what creatures have been added.
        content: this.renderMiniLocation({ location })
      };
    });
  };

  renderCharacters = ({ isActive, creatures }) => {
    const creatureType = creatures.length > 0 && creatures[0].type;

    const image = Images.creatures[creatureType] || null;

    const friend = (
      <img
        className={`${css.characterImageMini} ${css.character1Mini}`}
        src={image}
        alt={creatureType}
      />
    );

    const you = isActive ? this.renderYouMini() : null;
    const characters = [you, friend];

    return characters;
  };

  createSingleRow = ({ locationRow, rowIndex }) => {
    return locationRow.map((location, colIndex) => {
      return this.renderMiniLocation({ location, colIndex, rowIndex });
    });
  };

  // TODO - make this a component
  // TODO - make this a component
  // TODO - make this a component
  renderMiniLocation = ({
    colIndex = 0,
    rowIndex = 0,
    location,
    className = ""
  }) => {
    const { activeScene } = this.props;
    const { name: locationName, creatures = [] } = location;

    const isActive = locationName === activeScene.name;

    const characters = this.renderCharacters({
      creatures,
      isActive
    });

    const id = `${colIndex}-${rowIndex}`;

    return (
      <MiniLocation
        id={id}
        key={locationName}
        location={location}
        characters={characters}
        isActive={isActive}
        className={className}
      />
    );
  };

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

  changeLocation = ({ sceneName }) => {
    const plot = localStateStore.getPlot();
    const { scenes = {} } = plot;

    const newScene = scenes.find(scene => scene.name === sceneName);

    this.props.updateActiveScene({ activeScene: newScene });
  };

  renderStoryPage = () => {
    const {
      activeScene,
      activeScene: { creatures = [] },
      wordPageProps,
      updateActiveScene
    } = this.props;

    const backgroundImage = Images["forest"];
    const activeLocationName = activeScene.name;

    const miniLocationImage = Images.locations[activeLocationName];

    return (
      <div className={`${css.halfPage} ${css.leftHalf}`}>
        <div className={css.bigMiniImage}>
          {this.renderCharacters({
            creatures,
            isActive: true
          })}
        </div>

        <div className={css.miniLocation}>
          <img src={miniLocationImage} alt={"imagex"} />
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
        <div className={css.locationHeader}>{`${activeLocationName}`}</div>
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

  renderYourItems = () => {
    const plot = localStateStore.getPlot();
    const items = plot.you.items.map(item => <div>{item}</div>);

    return (
      <div className={css.yourItems}>
        <span>My Stuff</span>
        {items}
      </div>
    );
  };

  render() {
    const smallMap = localStateStore.getsmallMap();
    const storyClass = smallMap ? css.smallMap : "";

    const creatures = Utils.getWordsByType({
      words: words,
      type: wordTypes.creature
    });
    const showWorldBuilder = localStateStore.getShowWorldBuilder();

    if (showWorldBuilder) {
      return (
        <DragTest
          locations={this.getLocationsForDragger()}
          creatures={creatures}
        />
      );
    } else {
      return (
        <div className={`${css.main} ${storyClass}`}>
          {this.renderStoryPage()}
          {this.renderMapPage({})}
          {this.renderYourItems({})}
        </div>
      );
    }
  }
}
export default observer(PicturePage);
