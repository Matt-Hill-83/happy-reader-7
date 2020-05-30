import React from "react"
import { observer } from "mobx-react"
import { FormControl, MenuItem, OutlinedInput, Select } from "@material-ui/core"

import Images from "../../images/images.js"
import Utils from "../../Utils/Utils.js"
import css from "./MiniLocation.module.scss"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js"

import { toJS } from "mobx"
import MiniTable from "../MiniTable/MiniTable.js"

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
      // youCreature: event.target.value,
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
    // youCreature: youCreatureDefault,
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

  renderButton = ({ className }) => {
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
      // showLabel = true,
      id,
      isEditMode,
    } = this.props

    if (scene && scene.location.name !== "blank") {
      console.log("scene", toJS(scene)) // zzz
    }

    const {
      coordinates,
      sceneConfig: { storyIndex, firstScene, storyTitle } = {},
    } = scene

    const neighbors = Utils.getNeighbors({ coordinates })

    const showCloud = false
    const { items = [], creatures = [] } = scene
    const locationName = scene.location.name
    const isBlank = locationName === "blank"

    const localClass = isActive ? css.activeClass : ""
    const locationImage = Images.all[locationName]

    const rockImage = Images.backgrounds["rock"]
    const rockImageVertical = Images.backgrounds["rock02Vertical"]
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

    const colors = ["fcf6bd", "d0f4de", "a9def9", "e4c1f9"]

    const colorIndex = storyIndex % colors.length
    const backgroundColor = colors[colorIndex]

    const style = {
      "background-color": `#${backgroundColor}`,
    }

    const columnNames = ["", ""]

    const tableData = [
      ["Gold", "4"],
      ["Prizes", "shoes, [white]"],
    ]

    const tableProps = {
      defaultColumnWidth: 100,
      columnWidths: [70, 150],
    }

    const firstSceneInfo = (
      <div className={css.firstScene}>
        <span className={css.storyTitle}>{storyTitle}</span>
        <MiniTable
          tableProps={tableProps}
          columnNames={columnNames}
          tableData={tableData}
        />
      </div>
    )

    return (
      <div
        key={id}
        id={id}
        className={`${css.main} ${className} ${
          this.props.scene.isStartScene ? css.isStartScene : ""
        } ${isBlank ? css.isBlank : ""} ${localClass} `}
        style={style}
      >
        {!isBlank && (
          <div className={css.container}>
            {firstScene && firstSceneInfo}

            {/* Paths that connect scenes */}
            {showRightPath && (
              <div className={css.rightPath}>
                <img className={css.rockImage} src={rockImage} alt={"imagex"} />
              </div>
            )}
            {showBottomPath && (
              <div className={css.bottomPath}>
                <img
                  className={css.rockImageVertical}
                  src={rockImageVertical}
                  alt={"imagex"}
                />
              </div>
            )}

            {false && <div className={css.hexagon}></div>}
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
            {(false && renderedItems) || null}

            <div className={css.characters}>
              {this.renderCharacters({ creatures, isActive })}
            </div>

            <span className={css.locationTitle}>{locationName}</span>
          </div>
        )}
      </div>
    )
  }
}

export default observer(MiniLocation)
