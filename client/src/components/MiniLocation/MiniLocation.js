import React from "react";
import { observer } from "mobx-react";

import Images from "../../images/images.js";

import css from "./MiniLocation.module.scss";

class MiniLocation extends React.Component {
  state = {
    doorsIsOpen: { left: false, right: false, top: false, bottom: false }
  };

  onButtonClick = ({ location }) => {
    console.log("location", location); // zzz

    const doorsIsOpen = this.state.doorsIsOpen;
    doorsIsOpen[location] = !doorsIsOpen[location];
    this.setState({ doorsIsOpen });
  };

  renderButton = ({ location, className, image }) => {
    const doorIsOpen = this.state.doorsIsOpen[location];
    console.log("doorIsOpen", doorIsOpen); // zzz

    const doorOpen = this.state.doorsIsOpen[location];

    // TODO - set this in scene props
    // TODO - set this in scene props
    // TODO - set this in scene props
    const hasDoor = true;

    return (
      <button
        onClick={() => this.onButtonClick({ location })}
        className={`${className} ${doorOpen ? css.doorOpen : ""}`}
      >
        {hasDoor && !doorOpen && (
          <img className={css.doorImage} src={image} alt={"imagex"} />
        )}
      </button>
    );
  };

  render() {
    const {
      location,
      characters,
      isActive,
      className,
      showLabel = true
    } = this.props;

    const localClass = isActive ? css.activeClass : "";

    const miniLocation = Images.locations.small[location];

    const rockImage = Images.backgrounds["rock"];
    const doorImage = Images.backgrounds["door"];

    return (
      <div className={`${css.main} ${className} ${localClass}`}>
        <div className={css.rockImage}>
          <img className={css.rockImage} src={rockImage} alt={"imagex"} />
        </div>
        <div className={css.grassImage} />
        {this.renderButton({
          location: "left",
          className: "left-side-door",
          image: doorImage
        })}

        {this.renderButton({
          location: "bottom",
          className: "bottom-door",
          image: doorImage
        })}

        <div className={css.midRow}>
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
          <div className={css.rightCol} />
        </div>
      </div>
    );
  }
}

export default observer(MiniLocation);
