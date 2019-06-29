import React from "react";
import { observer } from "mobx-react";
import { toJS } from "mobx";
import Images from "../../images/images.js";
// import _get from "lodash.get";
import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  OutlinedInput,
  MenuItem
} from "@material-ui/core";

import Utils from "../../Utils/Utils.js";
import myWords from "../../Models/words.js";

import css from "./MiniLocation.module.scss";

const { words, wordTypes } = myWords;

const youCreatureOptions = Utils.getWordsByType({
  words: words,
  type: wordTypes.creature,
  returnName: true
});

const youCreatureDefault = youCreatureOptions[3];
const youNameDefault = "Dobby";

class MiniLocation extends React.Component {
  defaultDoorIsOpen = {
    left: { image: "doorGreen", open: true },
    right: { image: "doorGreen", open: false },
    top: { image: "doorGreen", open: true },
    bottom: { image: "doorGreen", open: true }
  };

  changeDoor = ({ event }) => {
    this.setState({
      youCreature: event.target.value,
      name: event.target.name
    });

    console.log("event.target.name", event.target.name); // zzz
    console.log("event.target.value", event.target.value); // zzz
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
    doors: this.defaultDoorIsOpen,
    youName: youNameDefault,
    youCreature: youCreatureDefault
  };

  onButtonClick = ({ position }) => {
    const doors = this.state.doors;

    doors[position]["open"] = !doors[position]["open"];
    this.setState({ doors });
  };

  createDoorPickerOptions = () => {
    const doors = ["doorYellow", "door", "doorGreen"];
    const renderedMenuItems = doors.map((door, index) => {
      const doorImage = Images.doors[door];
      return (
        <MenuItem key={index} value={door}>
          <div className={css.doorPickerItem}>
            <img src={doorImage} alt={"imagex"} />
          </div>
          {/* {door && door.toUpperCase()} */}
        </MenuItem>
      );
    });

    return renderedMenuItems;
  };

  renderButton = ({ position, className, defaultDoorImage }) => {
    // const { youName, youCreature } = this.state;
    let hasDoor = false;
    let renderedDoorImage;

    // const doors = [
    //   {
    //     right: { image: "doorYellow", open: true },
    //     bottom: { image: "doorYellow", open: false }
    //   }
    // ];

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

    const defaultDoorName = "door";

    return (
      <div className={css.doorPickerContainer}>
        <button
          onClick={() => this.onButtonClick({ position })}
          className={`${className} ${doorIsOpen ? "door-open" : ""}`}
        >
          {hasDoor && !doorIsOpen && (
            <img src={renderedDoorImage} alt={"imagex"} />
          )}
        </button>

        <FormControl variant="outlined">
          <Select
            className={css.doorPickerDropdown}
            value={defaultDoorName}
            onChange={event => {
              this.changeDoor({ event });
            }}
            input={<OutlinedInput id="outlined-age-simple" />}
          >
            {this.createDoorPickerOptions()}
          </Select>
        </FormControl>
      </div>
    );
  };

  renderCharacters = ({ isActive, characters: creatures }) => {
    const renderedCharacters = creatures.map(creature => {
      const creatureType = creature && creature.type;
      const image = Images.creatures[creatureType] || null;

      const friend = (
        <img
          className={`${css.characterImageMini} ${css.character1Mini}`}
          src={image}
          alt={creatureType}
        />
      );

      return friend;
    });

    if (isActive) {
      const you = this.renderYouMini();
      renderedCharacters.unshift(you);
    }

    return renderedCharacters;
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

    // const charJs = toJS(characters);

    const { items = [], name: locationName } = location;

    const localClass = isActive ? css.activeClass : "";

    const locationImage = Images.locations[locationName];

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

        {/* {this.renderButton({
          position: "bottom",
          className: "bottom-door",
          defaultDoorImage: doorImage
        })} */}

        <div className={css.imagesBox}>
          <img
            className={css.miniLocationImage}
            src={locationImage}
            alt={"imagex"}
          />
        </div>
        {renderedItems || null}
        <div className={css.characters}>
          {this.renderCharacters({ characters })}
        </div>
        {showLabel && <span className={css.locationTitle}>{locationName}</span>}
      </div>
    );
  }
}

export default observer(MiniLocation);
