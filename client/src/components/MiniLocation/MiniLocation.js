import React from "react"
import { observer } from "mobx-react"
import { Button, Icon, Position, Tooltip, Checkbox } from "@blueprintjs/core"
import { FormControl, MenuItem, OutlinedInput, Select } from "@material-ui/core"

import Images from "../../images/images.js"
import Utils from "../../Utils/Utils.js"
import css from "./MiniLocation.module.scss"
import myWords from "../../Models/words.js"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js"

import { toJS } from "mobx"

const { words, wordTypes } = myWords

const youCreatureOptions = Utils.getWordsByType({
  words: words,
  type: wordTypes.creature,
  returnName: true
})

const youCreatureDefault = youCreatureOptions[3]
const youNameDefault = "Dobby"

class MiniLocation extends React.Component {
  defaultDoorIsOpen = {
    left: { image: "doorGreen", open: true },
    right: { image: "doorGreen", open: false },
    top: { image: "doorGreen", open: true },
    bottom: { image: "doorGreen", open: true }
  }

  renderYouMini = () => {
    const you = localStateStore.getYou()
    const youImage = you.creature

    return (
      <div className={css.miniYou}>
        <img
          className={`${css.characterImageMini} ${css.characterYouMini}`}
          src={Images.creatures[youImage]}
          alt={youImage}
        />
      </div>
    )
  }

  changeDoor = ({ event }) => {
    this.setState({
      youCreature: event.target.value,
      name: event.target.name
    })
  }

  async componentWillMount() {
    const {
      location: { doors },
      isStartScene
    } = this.props

    this.setState({ isStartScene })

    if (doors) {
      this.setState({ doors, isStartScene })
    }
  }

  componentWillReceiveProps(newProps) {
    const {
      location: { doors },
      location,
      isStartScene
    } = newProps

    // TODO - do all this for end scene
    // TODO - do all this for end scene
    // TODO - do all this for end scene
    // TODO - do all this for end scene
    // TODO - do all this for end scene
    this.setState({ isStartScene })

    if (doors) {
      this.setState({ doors, isStartScene })
    }
  }

  state = {
    doors: this.defaultDoorIsOpen,
    youName: youNameDefault,
    youCreature: youCreatureDefault
  }

  onButtonClick = ({ position }) => {
    const doors = this.state.doors

    doors[position]["open"] = !doors[position]["open"]
    this.setState({ doors })
  }

  createDoorPickerOptions = () => {
    const doors = ["doorYellow", "door", "doorGreen"]
    const renderedMenuItems = doors.map((door, index) => {
      const doorImage = Images.doors[door]
      return (
        <MenuItem key={index} value={door}>
          <div className={css.doorPickerItem}>
            <img src={doorImage} alt={"imagex"} />
          </div>
          {/* {door && door.toUpperCase()} */}
        </MenuItem>
      )
    })

    return renderedMenuItems
  }

  renderButton = ({ position, className, defaultDoorImage }) => {
    let hasDoor = false
    let renderedDoorImage

    // const doors = [
    //   {
    //     right: { image: "doorYellow", open: true },
    //     bottom: { image: "doorYellow", open: false }
    //   }
    // ];

    const doorImage =
      this.state.doors[position] && this.state.doors[position]["image"]

    const doorIsOpen =
      this.state.doors[position] && this.state.doors[position]["open"]

    if (position === "bottom" || position === "right") {
      hasDoor = this.state.doors[position] !== undefined

      if (hasDoor) {
        renderedDoorImage = doorImage
          ? Images.doors[doorImage]
          : defaultDoorImage
      }
    }

    const defaultDoorName = "door"

    return (
      <div className={`${className} ${css.doorPickerContainer}`}>
        {/* <Button
          onClick={() => this.onButtonClick({ position })}
          className={`${doorIsOpen ? "door-open" : ""}`}
        >
          {hasDoor && !doorIsOpen && (
            <img
              className={css.doorImage}
              src={renderedDoorImage}
              alt={"imagex"}
            />
          )}
        </Button> */}

        <FormControl variant="outlined">
          <Select
            className={css.doorPickerDropdown}
            value={defaultDoorName}
            onChange={event => {
              this.changeDoor({ event })
            }}
            input={<OutlinedInput id="outlined-age-simple" />}
          >
            {this.createDoorPickerOptions()}
          </Select>
        </FormControl>
      </div>
    )
  }

  renderCharacters = ({ isActive, creatures }) => {
    // Hide start star
    const filteredCretures = creatures.filter(cr => cr.type !== "start")

    const renderedCharacters = filteredCretures.map(creature => {
      const creatureType = creature && creature.type

      const image = Images.creatures[creatureType] || null

      const friend = (
        <img
          className={`${css.characterImageMini} ${css.character1Mini}`}
          src={image}
          alt={creatureType}
        />
      )

      return friend
    })

    if (isActive) {
      const you = this.renderYouMini()
      renderedCharacters.unshift(you)
    }

    return renderedCharacters
  }

  checkIsStartScene = () => {
    console.log("this.props", this.props) // zzz
    const { location } = this.props

    // TODO - test this
    // TODO - test this
    // TODO - test this
    this.props.updateMap &&
      this.props.updateMap({ newProps: { startScene: location.name } })

    location.isStartScene = !this.state.isStartScene
    this.setState({ isStartScene: !this.state.isStartScene })
  }

  checkIsEndScene = () => {
    const { location } = this.props
    this.props.updateEndScene &&
      this.props.updateEndScene({ sceneName: location.name })
    location.isEndScene = !this.state.isEndScene
    this.setState({ isEndScene: !this.state.isEndScene })
  }

  render() {
    const { isStartScene, isEndScene } = this.state
    const {
      location,
      isActive,
      className,
      showLabel = true,
      id,
      isEditMode
    } = this.props

    const { items = [], name: locationName, creatures = [] } = location
    const localClass = isActive ? css.activeClass : ""
    const locationImage = Images.locations[locationName]

    const rockImage = Images.backgrounds["rock"]
    const defaultDoorImage = Images.backgrounds["door"]

    const renderedItems = items.map(item => {
      const renderedItem = Images.items[item]
      return <img className={css.itemImage} src={renderedItem} alt={"imagex"} />
    })

    if (!locationName) {
      return <div className={`${css.main} ${className} ${localClass}`} />
    }

    return (
      <div
        key={id}
        id={id}
        className={`${css.main} ${className} ${
          this.props.location.isStartScene ? css.isStartScene : ""
        } ${localClass} `}
      >
        {isEditMode && (
          <div className={css.isStartSceneCheckBox}>
            Start
            <Checkbox onClick={this.checkIsStartScene} checked={isStartScene} />
          </div>
        )}
        {isEditMode && (
          <div className={css.isEndSceneCheckBox}>
            End
            <Checkbox onClick={this.checkIsEndScene} checked={isEndScene} />
          </div>
        )}
        <div className={css.rockImage}>
          <img className={css.rockImage} src={rockImage} alt={"imagex"} />
        </div>
        <div className={css.grassImage} />
        {false &&
          this.renderButton({
            position: "right",
            className: css.rightDoor,
            defaultDoorImage: defaultDoorImage
          })}

        {false &&
          this.renderButton({
            position: "bottom",
            className: css.bottomDoor,
            defaultDoorImage: defaultDoorImage
          })}

        <div className={css.imagesBox}>
          <img
            className={css.miniLocationImage}
            src={locationImage}
            alt={"imagex"}
          />
        </div>
        {renderedItems || null}
        <div className={css.characters}>
          {this.renderCharacters({ creatures, isActive })}
        </div>
        {showLabel && <span className={css.locationTitle}>{locationName}</span>}
      </div>
    )
  }
}

export default observer(MiniLocation)
