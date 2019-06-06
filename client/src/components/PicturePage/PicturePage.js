import React from "react";
import { IconNames } from "@blueprintjs/icons";
import { Icon } from "@blueprintjs/core";
import { observer } from "mobx-react";

import Images from "../../images/images.js";
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js";
import MiniLocation from "../MiniLocation/MiniLocation.js";

import css from "./PicturePage.module.scss";

class PicturePage extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }

  componentDidMount() {
    console.log("did update"); // zzz

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
    const locations = [
      [{ name: "castle" }, { name: "house" }, { name: "treehouse" }],
      [{ name: "waterfall" }, { name: "house" }, { name: "treehouse" }],
      [{ name: "castle" }, { name: "house" }, { name: "waterfall" }]
    ];

    // Create rows
    const numRows = locations.length;
    return locations.map((locationRow, rowIndex) => {
      const offset = 100 / (numRows + 1);
      const yPct = offset * (rowIndex + 1);

      const style = {
        left: `${0}%`,
        top: `${yPct}%`
      };

      return (
        // positioned absolutely
        <div className={css.miniLocationsRowContainer} style={style}>
          {/* positioned relatively */}
          <div className={css.miniLocationsRow}>
            {this.createSingleRow({ locationRow, rowIndex })}
          </div>
        </div>
      );
    });
  };

  createSingleRow = ({ locationRow, rowIndex }) => {
    const numLocations = locationRow.length;

    return locationRow.map((location, index) => {
      const offset = 100 / (numLocations + 1);
      const xPct = offset * (index + 1);

      return (
        <MiniLocation
          xPct={xPct}
          key={location.name}
          location={location.name}
          you={this.renderYouMini()}
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
          {/* <canvas
            className={css.roadsCanvas}
            width="300"
            height="300"
            ref={this.canvasRef}
          /> */}
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
