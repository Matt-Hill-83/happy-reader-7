import React from "react";
import { IconNames } from "@blueprintjs/icons";
import { Icon } from "@blueprintjs/core";
import { observer } from "mobx-react";

import Images from "../../images/images.js";
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js";
import MiniLocation from "../MiniLocation/MiniLocation.js";
import WordPage from "../WordPage/WordPage.js";

import css from "./PicturePage.module.scss";

const locations = {
  tree: "tree",
  stump: "stump",
  castle: "castle",
  waterfall: "waterfall",
  bees: "bees",
  swamp: "swamp",
  house: "house",
  lake: "lake",
  barn: "barn"
};

const locationsMap = [
  [
    { name: locations.tree },
    { name: locations.stump },
    { name: locations.castle }
  ],
  [
    { name: locations.waterfall },
    { name: locations.bees },
    { name: locations.swamp }
  ],
  [
    { name: locations.house },
    { name: locations.lake },
    { name: locations.barn }
  ]
];

class PicturePage extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    console.log("did mount"); // zzz

    // console.log(
    //   "this.input.getBoundingClientRect() ",
    //   this.input.getBoundingClientRect && this.input.getBoundingClientRect()
    // ); // zzz

    // Draws a square in the middle of the canvas rotated
    // around the centre by this.props.angle
    // const { angle = 97 } = this.props;
    // const canvas = this.canvasRef.current;
    // const ctx = canvas.getContext("2d");
    // const width = canvas.width;
    // const height = canvas.height;
    // ctx.save();
    // ctx.beginPath();
    // ctx.clearRect(0, 0, width, height);
    // ctx.translate(width / 2, height / 2);
    // ctx.rotate((angle * Math.PI) / 180);
    // ctx.fillStyle = "#4397AC";
    // ctx.fillRect(-width / 4, -height / 4, width / 2, height / 2);
    // ctx.restore();
  }

  componentDidUpdate() {
    console.log("did update"); // zzz
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

  storeImageLocation = ({ location, x, y }) => {
    if (x >= 0 && y >= 0) {
      console.log("{ x, y }", { location, x, y }); // zzz
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
        />
      );
    });
  };

  renderPicturePage = () => {
    const { activeScene, wordPageProps, updateActiveScene } = this.props;
    const defaultImage = "forest";
    const renderedImage = Images[defaultImage];
    // const renderedImage = Images[activeScene.location] || Images[defaultImage];

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
          {/* <canvas
            className={css.roadsCanvas}
            width="300"
            height="300"
            ref={this.canvasRef}
          /> */}
          <img className={css.backgroundImage} src={mapImage} alt={"imagex"} />
          {/* {this.renderSceneList()} */}
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
