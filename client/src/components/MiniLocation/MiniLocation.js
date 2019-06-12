import React from "react";
import { observer } from "mobx-react";

import Images from "../../images/images.js";

import css from "./MiniLocation.module.scss";

const MiniLocation = props => {
  const { location, xPct, characters, isActive, className } = props;

  // const style = {
  //   left: `${xPct}%`,
  //   top: `${0}%`
  // };

  const localClass = isActive ? css.activeClass : "";
  const miniLocation = Images.locations.small[location];

  return (
    <div className={`${css.main} ${className} ${localClass}`}>
      <img
        className={css.miniLocationImage}
        src={miniLocation}
        alt={"imagex"}
      />
      <span className={css.locationTitle}>{location}</span>
      <div className={css.characters}>{characters}</div>
    </div>
  );
};
export default observer(MiniLocation);
