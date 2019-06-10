import React from "react";
import { observer } from "mobx-react";
import useDimensions from "react-use-dimensions";

import Images from "../../images/images.js";

import css from "./MiniLocation.module.scss";

const RenderedImage = props => {
  const { location, storeImageLocation } = props;

  const [ref, { x, y, width }] = useDimensions();

  storeImageLocation && storeImageLocation({ x, y, location });

  const miniLocation = Images.locations.small[location];

  return (
    <img
      ref={ref}
      className={css.miniLocationImage}
      src={miniLocation}
      alt={"imagex"}
    />
  );
};

const MiniLocation = props => {
  const {
    location,
    xPct,
    characters,
    isActive,
    className,
    storeImageLocation
  } = props;

  const style = {
    left: `${xPct}%`,
    top: `${0}%`
  };

  const localClass = isActive ? css.activeClass : "";

  return (
    <div className={`${css.main} ${className} ${localClass}`} style={style}>
      <RenderedImage
        location={location}
        storeImageLocation={storeImageLocation}
      />

      <span className={css.locationTitle}>{location}</span>
      <div className={css.characters}>{characters}</div>
    </div>
  );
};
export default observer(MiniLocation);
