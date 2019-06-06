import React from "react";
import { observer } from "mobx-react";

import Images from "../../images/images.js";
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js";

import css from "./MiniLocation.module.scss";

class MiniLocation extends React.Component {
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

  render() {
    const { location, xPct, yPct, you } = this.props;
    const miniLocation = Images.locations.small[location];

    const style = {
      left: `${xPct}%`,
      top: `${0}%`
    };

    return (
      <div className={css.main} style={style}>
        <img
          className={css.miniLocationImage}
          src={miniLocation}
          alt={"imagex"}
        />
        <span className={css.locationTitle}>{location}</span>
        <div className={css.characters}>{you}</div>
      </div>
    );
  }
}
export default observer(MiniLocation);
