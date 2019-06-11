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

const locations = {
  tree: { name: "tree", position: {} },
  stump: { name: "stump", position: {} },
  castle: { name: "castle", position: {} },
  waterfall: { name: "waterfall", position: {} },
  bees: { name: "bees", position: {} },
  swamp: { name: "swamp", position: {} },
  house: { name: "house", position: {} },
  lake: { name: "lake", position: {} },
  barn: { name: "barn", position: {} }
};

const locationsMap = [
  [
    { name: locations.tree.name },
    { name: locations.stump.name },
    { name: locations.castle.name }
  ],
  [
    { name: locations.waterfall.name },
    { name: locations.bees.name },
    { name: locations.swamp.name }
  ],
  [
    { name: locations.house.name },
    { name: locations.lake.name },
    { name: locations.barn.name }
  ]
];

class PicturePage extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {}

  componentDidUpdate() {}

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

    return (
      <div className={css.miniLocationsGrid}>
        {/* <canvas className={css.roadsCanvas} ref={this.canvasRef} /> */}
        <div style={{ display: "none" }}>
          <img
            id="source"
            src="https://mdn.mozillademos.org/files/5397/rhino.jpg"
            width="300"
            height="227"
            alt="asfdas"
          />
          <img
            style={{ zIndex: 1000 }}
            id="frame"
            src="https://mdn.mozillademos.org/files/242/Canvas_picture_frame.png"
            width="132"
            height="150"
            alt="asfdasdd"
          />
        </div>
        {miniLocationsGrid}
      </div>
    );
  };

  draw = () => {
    var canvas = document.getElementById("canvas");
    if (!canvas) {
      return;
    }
    var ctx = canvas.getContext("2d");

    // Draw slice
    ctx.drawImage(
      document.getElementById("source"),
      33,
      71,
      104,
      124,
      21,
      20,
      87,
      104
    );

    // Draw frame
    ctx.drawImage(document.getElementById("frame"), 0, 0);
  };

  storeImageLocation = ({ location, x, y }) => {
    this.draw();
    if (x >= 0 && y >= 0) {
      locations[location]["position"] = { x, y };
    }

    const { activeScene } = this.props;
    const activeLocation = activeScene.location;

    const activeLocationObj = locations[activeLocation];

    const activePosition = activeLocationObj.position;

    const canvas = this.canvasRef.current;
    if (!canvas) {
      return;
    }
  };

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
    console.log("Object.keys(locations)", Object.keys(locations)); // zzz

    const arrows = Object.keys(locations).map(location => {
      return (
        <LineTo className={css.lineTo} from={activeLocation} to={location} />
      );
    });

    return arrows;
  };

  renderPicturePage = () => {
    const { activeScene, wordPageProps, updateActiveScene } = this.props;
    const defaultImage = "forest";
    const renderedImage = Images[defaultImage];
    // const footsteps = Images.footsteps;

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
          {/* {this.renderSceneList()} */}
          {this.renderMiniLocations()}
          {/* <img className={css.backgroundImage} src={footsteps} alt={"imagex"} /> */}
          {/* <LineTo from={"house"} to={"lake"} /> */}
          {this.createArrows({ activeLocation })}
          {/* <LineTo className={css.lineTo} from={activeLocation} to={"lake"} /> */}
        </div>
      </div>
    );
  };

  render() {
    return this.renderPicturePage();
  }
}
export default observer(PicturePage);
