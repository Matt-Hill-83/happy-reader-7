import React from "react";
import { observer } from "mobx-react";

import Images from "../../images/images.js";

import css from "./MiniLocation.module.scss";

class MiniLocation extends React.Component {
  render() {
    const {
      location,
      xPct,
      yPct,
      characters,
      isActive,
      className
    } = this.props;
    const miniLocation = Images.locations.small[location];

    const style = {
      left: `${xPct}%`,
      top: `${0}%`
    };

    const localClass = isActive ? css.activeClass : "";

    return (
      <div className={`${css.main} ${className} ${localClass}`} style={style}>
        <img
          className={css.miniLocationImage}
          src={miniLocation}
          alt={"imagex"}
        />
        <span className={css.locationTitle}>{location}</span>
        <div className={css.characters}>{characters}</div>
      </div>
    );
  }
}
export default observer(MiniLocation);
