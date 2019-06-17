import React from "react";
import { observer } from "mobx-react";

import Images from "../../images/images.js";

import css from "./MiniLocation.module.scss";

class MiniLocation extends React.Component {
  state = { buttons: { left: false, right: false, top: false, button: true } };

  onButtonClick = ({ location }) => {
    console.log("location", location); // zzz

    const buttons = this.state.buttons;
    buttons[location] = !buttons[location];
    this.setState({ buttons });
  };

  renderButton = ({ location, className, image }) => {
    const doorOpen = this.state.buttons[location];

    return (
      <button
        onClick={() => this.onButtonClick({ location })}
        className={`${className} ${doorOpen ? "door-open" : ""}`}
      >
        {/* <div className={css.buttonImageContainer}> */}
        {image && <img className={css.doorImage} src={image} alt={"imagex"} />}
        {/* </div> */}
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
        {/*
        {this.renderButton({
          location: "bottom",
          className: "bottom-door",
          image: doorImage
        })} */}
        {/* <div className={css.topRow}>
          {this.renderButton({ location: "top", className: "top-door" })}
        </div> */}
        <div className={css.midRow}>
          {/* <div className={css.leftCol}>
            {this.renderButton({
              location: "left",
              className: "left-side-door",
              image: doorImage
            })}
          </div> */}
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
            {/* {this.renderButton({
              location: "right",
              className: "right-side-door",
              image: doorImage
            })} */}
          </div>
        </div>
        {/* <div className={css.bottomRow}>
          {this.renderButton({
            location: "bottom",
            className: "bottom-door",
            image: doorImage
          })}
        </div> */}
      </div>
    );
  }
}

export default observer(MiniLocation);
