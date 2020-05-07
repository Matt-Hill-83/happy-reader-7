import {
  Button,
  Icon,
  Position,
  InputGroup,
  FormGroup,
} from "@blueprintjs/core"
import React, { Component } from "react"

import Character from "../Character/Character"
import Head from "../Head/Head"
import { observer } from "mobx-react"
import { toJS } from "mobx"
import _get from "lodash.get"

import Images from "../../images/images"
import WordGroup from "../WordGroup/WordGroup"

import css from "./FrameViewer.module.scss"
import ImageDisplay from "../ImageDisplay/ImageDisplay"
import Utils from "../../Utils/Utils"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore"

class FrameViewer extends Component {
  state = {
    showFacePicker: false,
    showNarrativeEditor: true,
    showDialogEditor: true,
    showItemPicker: false,
    items: [],
  }

  componentWillMount() {
    const { frameIndex, scene = {} } = this.props
    const frameSet = scene.frameSet
    const frame = frameSet && frameSet.frames && frameSet.frames[frameIndex]
    this.setState({ frame })
  }

  componentWillReceiveProps(newProps) {
    const { frameIndex, scene = {} } = newProps
    const frameSet = scene.frameSet
    const frame = frameSet && frameSet.frames && frameSet.frames[frameIndex]
    this.setState({ frame })
  }

  deleteFrame = async () => {
    const { deleteFrame, frameIndex } = this.props
    await deleteFrame({ frameIndex })
  }

  cloneFrame = async () => {
    const { cloneFrame, frameIndex } = this.props
    await cloneFrame({ frameIndex })
  }

  selectHead = ({ name, head }) => {
    const { updateFrameSet } = this.props

    const {
      frame,
      frame: { faces },
    } = this.state
    console.log("frame", toJS(frame)) // zzz

    console.log("faces", toJS(faces)) // zzz

    const thisFace = faces.find((face) => face.character === name)
    thisFace.face = head.mood

    //  /TODO - chage to update world maybe?
    updateFrameSet({})

    this.setState({ frame })
    this.toggleFacePicker({})
  }

  // TODO -
  // TODO -
  // TODO -
  // TODO -
  // TODO -
  // TODO  - on add item, I need to add it to db as a blank item, and get the itemId.
  // Then when I edit the item, update that item's item Id
  // Also, I need to mark which frame I am adding it to and
  // But start out by just editing existing items, like characters

  onSelectItem = ({ itemId, name }) => {
    this.toggleItemPicker({})
  }

  renderFacePicker = ({ character }) => {
    const girlImages = Images.posableGirls
    const images = girlImages.find((girl) => girl.name === character)

    // For characters with no posable images
    if (!images) return null

    const {
      images: { heads },
    } = images

    const headImages = heads.map((head, headIndex) => {
      return (
        <div
          className={css.girlHead}
          key={headIndex}
          onClick={() => this.selectHead({ head, name: character })}
        >
          <Head name={character} head={head} />
        </div>
      )
    })

    return (
      <div className={css.girlPickerContainer}>
        <div className={css.girlPicker}>{headImages}</div>
      </div>
    )
  }

  toggleFacePicker = ({ character }) => {
    const showFacePicker = !this.state.showFacePicker
    this.setState({ showFacePicker, facePickerCharacter: character })
  }

  toggleItemPicker = ({ item = null }) => {
    const showItemPicker = !this.state.showItemPicker
    this.setState({ showItemPicker, itemPickerItem: item })
  }

  renderNarrative = () => {
    const { frame } = this.state
    const { story = [] } = frame

    if (!story.length || !story[0]) return null

    const renderedNarrative = story.map((line, lineIndex) => {
      return <WordGroup story={[line]} className={css.narrativeClass} />
    })

    return <div className={css.narrative}>{renderedNarrative}</div>
  }

  renderDialog = () => {
    const { frame } = this.state
    const dialog = (frame && frame.dialog) || []

    const renderedDialogs = dialog.map((line, lineIndex) => {
      const { text, characterIndex } = line

      if (!text) return null

      const className = `character${characterIndex}`

      return (
        <WordGroup
          index={lineIndex}
          story={[text]}
          className={`${css.line} ${css[className]}`}
        />
      )
    })

    return <div className={css.dialog}>{renderedDialogs}</div>
  }

  onChangeDialog = ({ event, lineIndex }) => {
    const { frame } = this.state
    const dialog = (frame && frame.dialog) || []

    const newLine = event.target.value
    dialog[lineIndex]["text"] = newLine
    this.setState({ frame })
  }

  getMood = ({ name, faces }) => {
    let mood = "ok"
    const newMood = faces && faces.find((face) => face.character === name)
    mood = (newMood && newMood.face) || mood
    return mood
  }

  editNarrative = async () => {
    this.setState({ showNarrativeEditor: true })
  }

  saveNarrative = async () => {
    const { updateMap } = this.props
    await updateMap({})
  }

  onChangeNarrative = ({ event, lineIndex }) => {
    const { frame } = this.state
    const newLine = event.target.value
    frame.story[lineIndex] = newLine
    this.setState({ frame })
  }

  renderLocationImage = () => {
    const { scene = true } = this.props
    const locationImage =
      Images.locations[_get(this.props, "scene.location.name")]

    return (
      <div className={css.locationImageContainer}>
        <img className={css.locationImage} src={locationImage} alt={"imagex"} />
        <span className={`${css.locationLabel}`}>{scene.name}</span>
      </div>
    )
  }

  renderBackground = () => {
    const backgroundImageSky = Images.backgrounds["sky01"]
    const backgroundImageHill = Images.backgrounds["hill01"]

    return (
      <div className={css.backgroundImageContainer}>
        <div className={css.backgroundGrass}>
          <img
            className={`${css.backgroundGrassImage}`}
            src={backgroundImageSky}
            alt={`backgroundImage`}
          />
          <img
            className={css.backgroundGrassHill}
            src={backgroundImageHill}
            alt={`backgroundImage`}
          />
        </div>
      </div>
    )
  }

  saveItems = async ({ items = [] }) => {
    const { frame } = this.state
    const { updateMap } = this.props

    frame.items = items

    this.setState({ frame }, () => updateMap({}))
  }

  renderItems = () => {
    const items = _get(this, "props.scene.items") || []

    return items.map((item) => {
      const { name } = item

      return <ImageDisplay className={css.itemContainer} item={{ name }} />
    })
  }

  renderFriends = () => {
    const { scene } = this.props

    const { frame } = this.state
    const { faces = [] } = frame
    if (!frame) return null

    const allCharacters =
      (scene.characters && scene.characters.map((item) => item.name)) || []

    const allItems = (scene.items && scene.items.map((item) => item.name)) || []

    // temp code DELETE ME!!! (start) - zzz
    allCharacters.push(...allItems)
    // temp code DELETE ME!!! (end)

    return allCharacters.map((friend, index) => {
      const mood = this.getMood({ name: friend, faces })

      return (
        <div className={`${css.characterContainer}`} key={index}>
          <div onClick={() => this.toggleFacePicker({ character: friend })}>
            <Character name={friend} mood={mood} isEditMode={false} />
          </div>
        </div>
      )
    })
  }

  renderButtonRow = () => {
    const { frameIndex } = this.props

    const activeScene = localStateStore.getActiveScene()
    console.log("activeScene", toJS(activeScene)) // zzz

    const frameSet = activeScene.frameSet
    // const frameSet = activeScene.frameSet

    let isLastFrame =
      frameSet.frames && frameIndex >= frameSet.frames.length - 1
    if (!frameSet) {
      isLastFrame = true
    }

    return (
      <div className={css.buttonRow}>
        {!isLastFrame && (
          <Button onClick={this.onClickNext} className={css.choiceButton}>
            NEXT
          </Button>
        )}

        {isLastFrame && this.renderButtons()}
      </div>
    )
  }

  onClickNext = () => {
    this.setState({
      frameIndex: this.state.frameIndex + 1,
    })
  }

  openYouWinModal = () => {
    this.props.openYouWinModal()
    console.log("this.props.openYouWinModal", toJS(this.props.openYouWinModal)) // zzz
  }

  // TODO: change scene should be done by sceneId
  // TODO: change scene should be done by sceneId
  // TODO: change scene should be done by sceneId
  // TODO: change scene should be done by sceneId
  // TODO: change scene should be done by sceneId
  changeLocation = ({ sceneName }) => {
    this.setState({ frameIndex: 0 })

    const grid = localStateStore.getActiveMapGrid()
    const newScene = grid.find((scene) => scene.location.name === sceneName)
    console.log("newScene", toJS(newScene)) // zzz

    // localStateStore.setActiveSceneId(newScene.id)

    this.props.updateActiveScene({ activeScene: newScene })
  }

  renderButtons = () => {
    const activeScene = localStateStore.getActiveScene()
    console.log("activeScene", toJS(activeScene)) // zzz

    const { isEndScene, coordinates } = activeScene

    const neighbors = Utils.getNeighborNames({
      coordinates,
    })
    console.log("neighbors", toJS(neighbors)) // zzz

    const filteredNeighbors = neighbors.filter((item) => item !== "blank")

    if (isEndScene) {
      return (
        <Button onClick={this.openYouWinModal} className={css.newGameButton}>
          New Game
        </Button>
      )
    }

    const buttons = filteredNeighbors.map((neighbor, i) => {
      if (!neighbor) {
        return null
      }

      const onClick = () => this.changeLocation({ sceneName: neighbor })

      return (
        <Button key={i} onClick={onClick} className={css.choiceButton}>
          {neighbor}
        </Button>
      )
    })

    return <div className={css.decisionButtonRow}>GO TO{buttons}</div>
  }

  renderFrame = () => {
    const { frame } = this.state

    if (!frame) return null

    const renderedItems = this.renderItems()
    const renderedFriends = this.renderFriends()

    return (
      <div className={`${css.scenes}`}>
        {this.renderBackground()}
        {this.renderLocationImage()}

        <div className={css.relativePositionedContent}>
          <div className={css.wordsContainer}>
            {this.renderNarrative()}
            {this.renderDialog()}
          </div>
          {this.renderButtonRow()}
          <div className={css.imageGroups}>
            {/* uncomment this when more than 2 characters can be added */}
            {/* <div className={css.itemsContainer}>{renderedItems}</div> */}
            <div className={css.charactersContainer}>{renderedFriends}</div>
          </div>
        </div>
      </div>
    )
  }

  render() {
    const { scene } = this.props
    console.log("scene", toJS(scene)) // zzz

    const { frame } = this.state

    if (!frame) {
      return null
    }

    // TODO -  I need put in a dummy frame for when there is none.
    // TODO -  I need put in a dummy frame for when there is none.
    // TODO -  I need put in a dummy frame for when there is none.
    // TODO -  I need put in a dummy frame for when there is none.
    // TODO -  I need put in a dummy frame for when there is none.
    // TODO -  I need put in a dummy frame for when there is none.
    const items = frame.items || []

    const allCharacters =
      (scene.characters && scene.characters.map((item) => item.name)) || []

    const itemRenderer = ({ item }) => {
      return <ImageDisplay item={item} />
    }

    return (
      <div className={css.main}>
        <div className={css.scenesContainer}>
          {this.renderFrame({ allCharacters })}
        </div>
      </div>
    )
  }
}

export default observer(FrameViewer)
