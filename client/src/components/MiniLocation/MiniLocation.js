import React from "react";
import { observer } from "mobx-react";

import Images from "../../images/images.js";

import css from "./MiniLocation.module.scss";

class MiniLocation extends React.Component {
  render() {
    const {
      location,
      characters,
      isActive,
      className,
      showLabel = true
    } = this.props;

    const localClass = isActive ? css.activeClass : "";
    console.log("isActive", isActive); // zzz

    const miniLocation = Images.locations.small[location];

    const rockImage = Images.backgrounds["rock"];

    return (
      <div className={`${css.main} ${className} ${localClass}`}>
        <div className={css.rockImage}>
          <img className={css.rockImage} src={rockImage} alt={"imagex"} />
        </div>
        <div className={css.grassImage} />
        <div className={css.topRow}>
          <button className={"top-door"} />
        </div>
        <div className={css.midRow}>
          <div className={css.leftCol}>
            <button className={"left-side-door"} />
          </div>
          <div className={css.midCol}>
            <div className={css.imagesBox}>
              <div className={css.characters}>{characters}</div>
              <img
                className={css.miniLocationImage}
                src={miniLocation}
                alt={"imagex"}
              />
              {showLabel && (
                <span className={css.locationTitle}>{location}</span>
              )}
            </div>
          </div>
          <div className={css.rightCol}>
            <button className={"right-side-door"} />
          </div>
        </div>
        <div className={css.bottomRow}>
          <button className={"bottom-door"} />
        </div>
      </div>
    );
  }
}

export default observer(MiniLocation);
