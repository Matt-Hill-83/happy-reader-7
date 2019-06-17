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

    // TODO - set this in scene props
    // TODO - set this in scene props
    // TODO - set this in scene props
    let hasDoor = false;
    if (location === "bottom" || location === "right") {
      console.log("location", location); // zzz

      hasDoor = true;
    }

    return (
      <button
        onClick={() => this.onButtonClick({ location })}
        className={`${className} ${doorIsOpen ? "door-open" : ""}`}
      >
        {hasDoor && !doorIsOpen && <img src={image} alt={"imagex"} />}
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
    console.log("localClass", localClass); // zzz

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
          location: "right",
          className: "right-side-door",
          image: doorImage
        })}

        {this.renderButton({
          location: "bottom",
          className: "bottom-door",
          image: doorImage
        })}

        <div className={css.imagesBox}>
          <img
            className={css.miniLocationImage}
            src={miniLocation}
            alt={"imagex"}
          />
        </div>
        <div className={css.characters}>{characters}</div>
        {showLabel && <span className={css.locationTitle}>{location}</span>}
      </div>
    );
  }
}

export default observer(MiniLocation);
