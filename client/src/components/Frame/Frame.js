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
import { IconNames } from "@blueprintjs/icons"
import { observer } from "mobx-react"
import { toJS } from "mobx"
import _get from "lodash.get"

import Images from "../../images/images"
import WordGroup from "../WordGroup/WordGroup"

import css from "./Frame.module.scss"
import CharacterPicker from "../CharacterPicker/CharacterPicker"
import images from "../../images/images"
import CrudMachine from "../CrudMachine/CrudMachine"
import ImageDisplay from "../ImageDisplay/ImageDisplay"

class Frame extends Component {
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
    // const { updateFrameSet } = this.props

    // const {
    //   frame,
    //   frame: { faces }
    // } = this.state

    // const thisFace = faces.find(face => face.character === name)
    // thisFace.face = head.mood

    // //  /TODO - chage to update world maybe?
    // updateFrameSet({})

    // this.setState({ frame })
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
    const { frame, showNarrativeEditor } = this.state
    const { isEditMode = true } = this.props
    const { story = [] } = frame

    if (!story.length || !story[0]) return null

    const renderedNarrative = story.map((line, lineIndex) => {
      if (isEditMode && showNarrativeEditor) {
        return (
          <InputGroup
            value={line}
            id="text-input"
            placeholder="Placeholder text"
            onChange={(event) => this.onChangeNarrative({ event, lineIndex })}
            onBlur={(event) => this.saveNarrative({ event })}
          />
        )
      } else {
        return <WordGroup story={[line]} className={css.narrativeClass} />
      }
    })

    return (
      <div className={css.narrative}>
        {renderedNarrative}
        {isEditMode && (
          <Button
            className={css.closeButton}
            onClick={() =>
              this.setState({ showNarrativeEditor: !showNarrativeEditor })
            }
          >
            <Icon icon={IconNames.EDIT} />
          </Button>
        )}
      </div>
    )
  }

  renderDialog = () => {
    const { isEditMode = true } = this.props
    const { showDialogEditor, frame } = this.state
    const dialog = (frame && frame.dialog) || []

    const renderedDialogs = dialog.map((line, lineIndex) => {
      const { text, characterIndex } = line

      if (!text) return null

      const className = `character${characterIndex}`

      if (isEditMode && showDialogEditor) {
        return (
          <InputGroup
            className={`${css.line} ${css[className]}`}
            value={text}
            id="text-input"
            placeholder="Placeholder text"
            onChange={(event) => this.onChangeDialog({ event, lineIndex })}
            onBlur={(event) => this.saveNarrative({ event })}
          />
        )
      } else {
        return (
          <WordGroup
            index={lineIndex}
            story={[text]}
            className={`${css.line} ${css[className]}`}
          />
        )
      }
    })

    return (
      <div className={css.dialog}>
        {renderedDialogs}
        {isEditMode && (
          <Button
            className={css.closeButton}
            onClick={() =>
              this.setState({ showDialogEditor: !showDialogEditor })
            }
          >
            <Icon icon={IconNames.EDIT} />
          </Button>
        )}
      </div>
    )
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

    console.log("scene", toJS(scene)) // zzz

    return (
      <div className={css.locationImageContainer}>
        <img className={css.locationImage} src={locationImage} alt={"imagex"} />
        <span className={`${css.locationLabel}`}>{scene.name}</span>
      </div>
    )
  }

  renderBackground = () => {
    const { isEditMode = true } = this.props
    const backgroundImageSky = Images.backgrounds["sky01"]
    const backgroundImageHill = Images.backgrounds["hill01"]

    return (
      <div className={css.backgroundImageContainer}>
        <div className={css.backgroundGrass}>
          <img
            className={`${css.backgroundGrassImage} ${
              isEditMode ? css.isEditMode : ""
            }`}
            src={backgroundImageSky}
            alt={`backgroundImage`}
          />
          <img
            className={`${css.backgroundGrassHill} ${
              isEditMode ? css.isEditMode : ""
            }`}
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
    console.log("this.props", toJS(this.props)) // zzz

    console.log("items", items) // zzz

    return items.map((item) => {
      console.log("item", toJS(item)) // zzz

      const { name } = item

      return <ImageDisplay className={css.itemContainer} item={{ name }} />
    })
  }

  renderFriends = () => {
    const { isEditMode = true, scene } = this.props

    const { frame } = this.state
    const { faces = [] } = frame
    if (!frame) return null

    const allCharacters =
      (scene.characters && scene.characters.map((item) => item.name)) || []

    const allItems = (scene.items && scene.items.map((item) => item.name)) || []

    // temp code DELETE ME!!! (start) - zzz
    allCharacters.push(...allItems)
    // temp code DELETE ME!!! (end)

    console.log("allCharacters", toJS(allCharacters)) // zzz

    return allCharacters.map((friend, index) => {
      const mood = this.getMood({ name: friend, faces })

      return (
        <div className={`${css.characterContainer}`} key={index}>
          <div onClick={() => this.toggleFacePicker({ character: friend })}>
            <Character name={friend} mood={mood} isEditMode={isEditMode} />
          </div>
        </div>
      )
    })
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
    const { isEditMode = true, scene } = this.props

    const {
      frame,
      showFacePicker,
      showItemPicker,
      facePickerCharacter,
    } = this.state

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

    // const allCharacters = frame.creatures || []

    const allCharacters =
      (scene.characters && scene.characters.map((item) => item.name)) || []

    const itemRenderer = ({ item }) => {
      return <ImageDisplay item={item} />
    }

    return (
      <div className={`${css.main} ${isEditMode ? css.editFrame : ""}`}>
        <div
          className={` ${css.scenesContainer} ${
            isEditMode ? css.editingFrame : ""
          }`}
        >
          {this.renderFrame({ allCharacters })}
          {isEditMode && (
            <CrudMachine
              className={css.crudMachine}
              items={items}
              itemRenderer={itemRenderer}
              saveItems={this.saveItems}
              title={"stuff"}
            />
          )}
          {isEditMode && (
            <Button className={css.closeButton} onClick={this.deleteFrame}>
              X
            </Button>
          )}
        </div>
        {isEditMode && showFacePicker && (
          <div className={css.girlPickersContainer}>
            {isEditMode &&
              this.renderFacePicker({ character: facePickerCharacter })}
            <Button
              className={css.closeFacePickerButton}
              onClick={() => this.toggleFacePicker({})}
            >
              <Icon icon={IconNames.CROSS} />
            </Button>
          </div>
        )}

        {isEditMode && showItemPicker && (
          <CharacterPicker
            imageSets={[
              images.creatures,
              images.locations,
              images.vehicles,
              images.items,
            ]}
            className={css.test}
            onClose={this.toggleItemPicker}
            onSelectItem={this.onSelectItem}
          />
        )}
      </div>
    )
  }
}

export default observer(Frame)
