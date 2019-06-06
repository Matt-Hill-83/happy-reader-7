import React from "react";
import { observer } from "mobx-react";

import Images from "../../images/images.js";
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js";

import css from "./MiniLocation.module.scss";

class MiniLocation extends React.Component {
  constructor(props) {
    super(props);
    this.canvasRef = React.createRef();
  }
  state = {};

  async componentWillMount() {}

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
    const { location, xPct, yPct } = this.props;
    const miniLocation = Images[location];

    const style = {
      left: `${xPct}%`,
      top: `${yPct}%`
    };

    return (
      <div className={css.miniLocation} style={style}>
        {/* <canvas width="300" height="300" ref={this.canvasRef} />; */}
        <img
          className={css.miniLocationImage}
          src={miniLocation}
          alt={"imagex"}
        />
        {location}
      </div>
    );
  };

  render() {
    return this.renderPicturePage();
  }
}
export default observer(MiniLocation);
