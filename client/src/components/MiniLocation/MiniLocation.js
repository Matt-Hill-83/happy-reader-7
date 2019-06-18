import React from "react";
import { observer } from "mobx-react";

import Images from "../../images/images.js";
import _get from "lodash.get";

import css from "./MiniLocation.module.scss";

class MiniLocation extends React.Component {
  defaultDoorIsOpen = {
    left: { image: "doorGreen", state: true },
    right: { image: "doorGreen", state: false },
    top: { image: "doorGreen", state: true },
    bottom: { image: "doorGreen", state: true }
  };

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

    doorsAreOpen[position]["state"] = !doorsAreOpen[position]["state"];
    this.setState({ doorsAreOpen });
  };

  renderButton = ({ position, className, image }) => {
    console.log("this.state.doorsAreOpen", this.state.doorsAreOpen); // zzz

    const doorImage =
      this.state.doorsAreOpen[position] &&
      this.state.doorsAreOpen[position]["image"];

    const doorIsOpen =
      this.state.doorsAreOpen[position] &&
      this.state.doorsAreOpen[position]["state"];

    console.log("doorIsOpen", doorIsOpen); // zzz

    let hasDoor = false;
    if (position === "bottom" || position === "right") {
      hasDoor = this.state.doorsAreOpen[position] !== undefined;
    }

    const renderedDoorImage = hasDoor ? Images.doors[doorImage] : null;

    return (
      <button
        onClick={() => this.onButtonClick({ position })}
        className={`${className} ${doorIsOpen ? "door-open" : ""}`}
      >
        {hasDoor && !doorIsOpen && (
          <img src={renderedDoorImage} alt={"imagex"} />
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

    const { items = [], name: locationName } = location;

    const localClass = isActive ? css.activeClass : "";

    const miniLocation = Images.locations.small[locationName];

    const rockImage = Images.backgrounds["rock"];
    const doorImage = Images.backgrounds["door"];

    const renderedItems = items.map(item => {
      const renderedItem = Images.items[item];
      return (
        <img className={css.itemImage} src={renderedItem} alt={"imagex"} />
      );
    });

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
        {renderedItems || null}
        <div className={css.characters}>{characters}</div>
        {showLabel && <span className={css.locationTitle}>{locationName}</span>}
      </div>
    );
  }
}

export default observer(MiniLocation);
