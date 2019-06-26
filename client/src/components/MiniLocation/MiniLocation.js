import React from "react";
import { observer } from "mobx-react";

import Images from "../../images/images.js";
// import _get from "lodash.get";

import css from "./MiniLocation.module.scss";

class MiniLocation extends React.Component {
  defaultDoorIsOpen = {
    left: { image: "doorGreen", open: true },
    right: { image: "doorGreen", open: false },
    top: { image: "doorGreen", open: true },
    bottom: { image: "doorGreen", open: true }
  };

  async componentWillMount() {
    const {
      location: { doors }
    } = this.props;

    if (doors) {
      this.setState({ doors });
    }
  }

  componentWillReceiveProps(newProps) {
    const {
      location: { doors }
    } = newProps;

    if (doors) {
      this.setState({ doors });
    }
  }

  state = {
    doors: this.defaultDoorIsOpen
  };

  onButtonClick = ({ position }) => {
    const doors = this.state.doors;

    doors[position]["open"] = !doors[position]["open"];
    this.setState({ doors });
  };

  renderButton = ({ position, className, defaultDoorImage }) => {
    let hasDoor = false;
    let renderedDoorImage;

    const doorImage =
      this.state.doors[position] && this.state.doors[position]["image"];

    const doorIsOpen =
      this.state.doors[position] && this.state.doors[position]["open"];

    if (position === "bottom" || position === "right") {
      hasDoor = this.state.doors[position] !== undefined;

      if (hasDoor) {
        renderedDoorImage = doorImage
          ? Images.doors[doorImage]
          : defaultDoorImage;
      }
    }

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
      showLabel = true,
      id
    } = this.props;

    const { items = [], name: locationName } = location;

    const localClass = isActive ? css.activeClass : "";

    const miniLocation = Images.locations[locationName];

    const rockImage = Images.backgrounds["rock"];
    const doorImage = Images.backgrounds["door"];

    const renderedItems = items.map(item => {
      const renderedItem = Images.items[item];
      return (
        <img className={css.itemImage} src={renderedItem} alt={"imagex"} />
      );
    });

    if (!locationName) {
      return <div className={`${css.main} ${className} ${localClass}`} />;
    }

    return (
      <div
        key={id}
        id={id}
        className={`${css.main} ${className} ${localClass}`}
      >
        <div className={css.rockImage}>
          <img className={css.rockImage} src={rockImage} alt={"imagex"} />
        </div>
        <div className={css.grassImage} />
        {this.renderButton({
          position: "right",
          className: "right-side-door",
          defaultDoorImage: doorImage
        })}

        {this.renderButton({
          position: "bottom",
          className: "bottom-door",
          defaultDoorImage: doorImage
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
