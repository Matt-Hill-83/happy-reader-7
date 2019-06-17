import React from "react";
import { observer } from "mobx-react";

import Images from "../../images/images.js";

import css from "./MiniLocation.module.scss";

class MiniLocation extends React.Component {
  defaultDoorIsOpen = { left: false, right: false, top: false, bottom: false };

  async componentWillMount() {
    const {
      location: { doorsIsOpen }
    } = this.props;
    if (doorsIsOpen) {
      this.setState({ doorsIsOpen });
    }
  }

  componentWillReceiveProps(newProps) {
    const {
      location: { doorsIsOpen }
    } = newProps;
    if (doorsIsOpen) {
      this.setState({ doorsIsOpen });
    }
  }

  state = {
    doorsIsOpen: this.defaultDoorIsOpen
  };

  onButtonClick = ({ location }) => {
    console.log("location", location); // zzz

    const locationName = location.name;

    const doorsIsOpen = this.state.doorsIsOpen;

    doorsIsOpen[locationName] = !doorsIsOpen[locationName];
    this.setState({ doorsIsOpen });
  };

  renderButton = ({ location, className, image }) => {
    const locationName = location;
    console.log("locationName", locationName); // zzz

    const doorIsOpen = this.state.doorsIsOpen[locationName];
    console.log("doorIsOpen", doorIsOpen); // zzz

    // TODO - set this in scene props
    // TODO - set this in scene props
    // TODO - set this in scene props
    let hasDoor = false;
    if (locationName === "bottom" || locationName === "right") {
      console.log("locationName", locationName); // zzz

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

    const locationName = location.name;

    console.log("location", location); // zzz

    const localClass = isActive ? css.activeClass : "";

    const miniLocation = Images.locations.small[locationName];

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
        {showLabel && <span className={css.locationTitle}>{locationName}</span>}
      </div>
    );
  }
}

export default observer(MiniLocation);
