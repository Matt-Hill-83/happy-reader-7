import React from "react";
import { observer } from "mobx-react";
import useDimensions from "react-use-dimensions";

import Images from "../../images/images.js";

import css from "./MiniLocation.module.scss";

const RenderedImage = props => {
  const [ref, { x, y, width }] = useDimensions();

  console.log("x,y", x, y); // zzz
  const { location } = props;
  const miniLocation = Images.locations.small[location];

  return (
    <img
      ref={ref}
      className={css.miniLocationImage}
      src={miniLocation}
      alt={"imagex"}
    />
  );

  return <div ref={ref}>This is the element you'll measure</div>;
};

const MiniLocation = props => {
  // class MiniLocation extends React.Component {
  // render() {
  const { location, xPct, characters, isActive, className } = props;

  const style = {
    left: `${xPct}%`,
    top: `${0}%`
  };

  const localClass = isActive ? css.activeClass : "";

  return (
    <div className={`${css.main} ${className} ${localClass}`} style={style}>
      <RenderedImage location={location} />

      <span className={css.locationTitle}>{location}</span>
      <div className={css.characters}>{characters}</div>
    </div>
  );
  // }
};
export default observer(MiniLocation);
