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

  renderButton = ({ location }) => {
    const doorOpen = this.state.buttons[location];

    return (
      <button
        onClick={() => this.onButtonClick({ location })}
        className={`top-door ${doorOpen ? "door-open" : ""}`}
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
    console.log("this.state.buttons", this.state.buttons); // zzz

    const miniLocation = Images.locations.small[location];

    const rockImage = Images.backgrounds["rock"];

    return (
      <div className={`${css.main} ${className} ${localClass}`}>
        <div className={css.rockImage}>
          <img className={css.rockImage} src={rockImage} alt={"imagex"} />
        </div>
        <div className={css.grassImage} />
        <div className={css.topRow}>
          {this.renderButton({ location: "top" })}
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
