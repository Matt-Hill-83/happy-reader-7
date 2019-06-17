import React from "react";
import { observer } from "mobx-react";

import Images from "../../images/images.js";

import css from "./MiniLocation.module.scss";

class MiniLocation extends React.Component {
  defaultDoorIsOpen = { left: false, right: false, top: false, bottom: false };

  async componentWillMount() {
    const {
      location: { doorsAreOpen }
    } = this.props;
    if (doorsAreOpen) {
      this.setState({ doorsAreOpen });
    }
  }

  componentWillReceiveProps(newProps) {
    const {
      location: { doorsAreOpen }
    } = newProps;
    if (doorsAreOpen) {
      this.setState({ doorsAreOpen });
    }
  }

  state = {
    doorsAreOpen: this.defaultDoorIsOpen
  };

  onButtonClick = ({ position }) => {
    const doorsAreOpen = this.state.doorsAreOpen;

    doorsAreOpen[position] = !doorsAreOpen[position];
    this.setState({ doorsAreOpen });
  };

  renderButton = ({ position, className, image }) => {
    const doorIsOpen = this.state.doorsAreOpen[position];

    let hasDoor = false;
    if (position === "bottom" || position === "right") {
      hasDoor = true;
    }

    return (
      <button
        onClick={() => this.onButtonClick({ position })}
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
          position: "right",
          className: "right-side-door",
          image: doorImage
        })}

        {this.renderButton({
          position: "bottom",
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
