import React from "react";
import { observer } from "mobx-react";

import Images from "../../images/images.js";

import css from "./MiniLocation.module.scss";

class MiniLocation extends React.Component {
  state = { buttons: { left: false, right: false, top: false, button: true } };

  onButtonClick = ({ location }) => {
    const buttons = this.state.buttons;
    buttons[location] = !buttons[location];
    this.setState({ buttons });
  };

  renderButton = ({ location, className }) => {
    const doorOpen = this.state.buttons[location];

    return (
      <button
        onClick={() => this.onButtonClick({ location })}
        className={`${className} ${doorOpen ? "door-open" : ""}`}
      />
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

    return (
      <div className={`${css.main} ${className} ${localClass}`}>
        <div className={css.rockImage}>
          <img className={css.rockImage} src={rockImage} alt={"imagex"} />
        </div>
        <div className={css.grassImage} />
        <div className={css.topRow}>
          {this.renderButton({ location: "top", className: "top-door" })}
        </div>
        <div className={css.midRow}>
          <div className={css.leftCol}>
            {this.renderButton({
              location: "left",
              className: "left-side-door"
            })}
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
            {this.renderButton({
              location: "right",
              className: "right-side-door"
            })}
          </div>
        </div>
        <div className={css.bottomRow}>
          {this.renderButton({ location: "bottom", className: "bottom-door" })}
        </div>
      </div>
    );
  }
}

export default observer(MiniLocation);
