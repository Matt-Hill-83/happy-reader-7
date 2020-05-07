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
  returnName: true,
})

const youCreatureDefault = youCreatureOptions[3]
const youNameDefault = "Dobby"

class MiniLocation extends React.Component {
  defaultDoorIsOpen = {
    left: { image: "doorGreen", open: true },
    right: { image: "doorGreen", open: false },
    top: { image: "doorGreen", open: true },
    bottom: { image: "doorGreen", open: true },
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
      name: event.target.name,
    })
  }

  async componentWillMount() {
    const {
      scene: { doors },
      isStartScene,
      isEndScene,
    } = this.props

    this.setState({ isStartScene, isEndScene })

    if (doors) {
      this.setState({ doors })
    }
  }

  componentWillReceiveProps(newProps) {
    const {
      scene: { doors },
      isStartScene,
      isEndScene,
    } = newProps

    // TODO - do all this for end scene
    // TODO - do all this for end scene
    // TODO - do all this for end scene
    // TODO - do all this for end scene
    // TODO - do all this for end scene
    this.setState({ isStartScene, isEndScene })

    if (doors) {
      this.setState({ doors })
    }
  }

  state = {
    doors: this.defaultDoorIsOpen,
    youName: youNameDefault,
    youCreature: youCreatureDefault,
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
    const defaultDoorName = "door"

    return (
      <div className={`${className} ${css.doorPickerContainer}`}>
        <FormControl variant="outlined">
          <Select
            className={css.doorPickerDropdown}
            value={defaultDoorName}
            onChange={(event) => {
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
    const renderedCharacters = creatures.map((creature) => {
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

    return <div className={css.charactersContainer}>{renderedCharacters}</div>
  }

  checkIsStartScene = () => {
    const { scene } = this.props
    scene.isStartScene = !this.state.isStartScene

    this.props.updateMap &&
      this.props.updateMap({ newProps: { startScene: scene.name } })
    this.setState({ isStartScene: !this.state.isStartScene })
  }

  checkIsEndScene = () => {
    const { scene } = this.props
    scene.isEndScene = !this.state.isEndScene

    this.props.updateMap &&
      this.props.updateMap({ newProps: { endScene: scene.name } })
    this.setState({ isEndScene: !this.state.isEndScene })
  }

  render() {
    const {
      scene,
      isActive,
      className,
      showLabel = true,
      id,
      isEditMode,
    } = this.props

    const { coordinates } = scene
    const neighbors = Utils.getNeighbors({ coordinates })

    const showCloud = false
    const { items = [], creatures = [] } = scene
    const locationName = scene.location.name
    const isBlank = locationName === "blank"

    const localClass = isActive ? css.activeClass : ""
    const locationImage = Images.all[locationName]

    const rockImage = Images.backgrounds["rock"]
    const cloudImage = Images.backgrounds["cloud"]
    const defaultDoorImage = Images.backgrounds["door"]

    let renderedItems
    renderedItems = items.map((item) => {
      const renderedItem = Images.all[item.name]
      return <img className={css.itemImage} src={renderedItem} alt={"imagex"} />
    })

    if (!locationName) {
      return <div className={`${css.main} ${className} ${localClass}`}></div>
    }

    const showBottomPath = neighbors[Utils.neighborPositionsEnum.bottom]
    const showRightPath = neighbors[Utils.neighborPositionsEnum.right]

    return (
      <div
        key={id}
        id={id}
        className={`${css.main} ${className} ${
          this.props.scene.isStartScene ? css.isStartScene : ""
        } ${isBlank ? css.isBlank : ""} ${localClass} `}
      >
        {!isBlank && (
          <div className={css.container}>
            {/* Paths that connect scenes */}
            {showRightPath && <div className={css.rightPath}></div>}
            {showBottomPath && <div className={css.bottomPath}></div>}
            {/* <img className={css.rockImage} src={rockImage} alt={"imagex"} /> */}
            <div className={css.grassImage} />
            {!isEditMode && showCloud && (
              <div className={css.cloudImageContainer}>
                <img
                  className={css.cloudImage}
                  src={cloudImage}
                  alt={"imagex"}
                />
              </div>
            )}

            {/* Right door */}
            {false &&
              this.renderButton({
                position: "right",
                className: css.rightDoor,
                defaultDoorImage: defaultDoorImage,
              })}
            {false &&
              this.renderButton({
                position: "left",
                className: css.leftDoor,
                defaultDoorImage: defaultDoorImage,
              })}
            {false &&
              this.renderButton({
                position: "bottom",
                className: css.bottomDoor,
                defaultDoorImage: defaultDoorImage,
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

            {showLabel && (
              <span className={css.locationTitle}>{locationName}</span>
            )}
          </div>
        )}
      </div>
    )
  }
}

export default observer(MiniLocation)
