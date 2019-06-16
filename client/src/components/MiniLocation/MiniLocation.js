import React from "react";
import { observer } from "mobx-react";

import Images from "../../images/images.js";

import css from "./MiniLocation.module.scss";

const MiniLocation = props => {
  const { location, characters, isActive, className, showLabel = true } = props;

  const localClass = isActive ? css.activeClass : "";
  const miniLocation = Images.locations.small[location];

  const rockImage = Images.backgrounds["rock"];

  return (
    <div className={`${css.main} ${className} ${localClass}`}>
      <div className={css.rockImage}>
        <img className={css.rockImage} src={rockImage} alt={"imagex"} />
      </div>
      <div className={css.topRow} />
      <div className={css.midRow}>
        <div className={css.leftCol}>
          <button className={css.sideDoor} />
        </div>
        <div className={css.midCol}>
          <div className={css.imagesBox}>
            <div className={css.characters}>{characters}</div>
            <img
              className={css.miniLocationImage}
              src={miniLocation}
              alt={"imagex"}
            />
            {showLabel && <span className={css.locationTitle}>{location}</span>}
          </div>
        </div>
        <div className={css.rightCol}>
          <button className={css.sideDoor} />
        </div>
      </div>
      <div className={css.bottomRow} />
    </div>
  );
  // return (
  //   <div className={`${css.main} ${className} ${localClass}`}>
  //     <div className={css.topRow} />
  //     <div className={css.midRow}>
  //       <div className={css.leftCol}>
  //         <button className={css.sideDoor} />
  //       </div>
  //       <div className={css.midCol}>
  //         <div className={css.imagesBox}>
  //           <img
  //             className={css.miniLocationImage}
  //             src={miniLocation}
  //             alt={"imagex"}
  //           />
  //           {showLabel && <span className={css.locationTitle}>{location}</span>}
  //           <div className={css.characters}>{characters}</div>
  //         </div>
  //       </div>
  //       <div className={css.rightCol}>
  //         <button className={css.sideDoor} />
  //       </div>
  //     </div>
  //     <div className={css.bottomRow} />
  //   </div>
  // );
};
export default observer(MiniLocation);
