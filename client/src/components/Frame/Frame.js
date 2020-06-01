import {
  Button,
  Icon,
  Position,
  InputGroup,
  TextArea,
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

import css from "./Frame.module.scss"
import CharacterPicker from "../CharacterPicker/CharacterPicker"
import images from "../../images/images"
import CrudMachine from "../CrudMachine/CrudMachine"
import ImageDisplay from "../ImageDisplay/ImageDisplay"
import Utils from "../../Utils/Utils"
import cx from "classnames"

class Frame extends Component {
  state = {
    showFacePicker: false,
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
  }

  renderDialog = () => {
    const { frame } = this.state
    const dialog = (frame && frame.dialog) || []

    const renderedDialogs = dialog.map((line, lineIndex) => {
      const { text, characterIndex } = line

      const className = `character${characterIndex}`
      const characterName = line.character || ""

      return (
        <div className={css.textAreaWrapper}>
          <div className={cx(css.characterNameContainer)}>
            <span className={css.characterName}>{characterName}</span>
          </div>
          <TextArea
            className={`${css.line} ${css[className]}`}
            // growVertically={true}
            // large={true}
            onChange={(event) => this.onChangeDialog({ event, lineIndex })}
            id="text-input"
            value={text}
            onBlur={(event) => this.saveDialog({ event })}
          />
        </div>
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

  saveDialog = async (event) => {
    if (event && !event.value) {
      return
    }

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
    const locationImage = Images.all[_get(this.props, "scene.location.name")]

    return (
      <div className={css.locationImageContainer}>
        <img className={css.locationImage} src={locationImage} alt={"imagex"} />
        <span className={`${css.locationLabel}`}>{scene.name}</span>
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

  renderCharacters = () => {
    const { scene } = this.props

    const { frame } = this.state
    const { faces = [] } = frame
    if (!frame) return null

    const allCharacters =
      (scene.characters && scene.characters.map((item) => item.name)) || []

    const allItems = (scene.items && scene.items.map((item) => item.name)) || []

    // temp code DELETE ME!!! (end)
    allCharacters.push(...allItems)
    // temp code DELETE ME!!! (end)

    return allCharacters.map((friend, index) => {
      const mood = this.getMood({ name: friend, faces })

      return (
        <div className={`${css.characterContainer}`} key={index}>
          <div onClick={() => this.toggleFacePicker({ character: friend })}>
            <Character
              showHeadOnly={true}
              name={friend}
              mood={mood}
              isEditMode={true}
            />
          </div>
        </div>
      )
    })
  }

  renderFrame = () => {
    const { frame } = this.state

    if (!frame) return null

    const renderedItems = this.renderItems()
    const renderedFriends = this.renderCharacters()

    return (
      <div className={`${css.scenes}`}>
        {this.renderLocationImage()}

        <div className={css.relativePositionedContent}>
          <div className={css.wordsContainer}>
            {this.renderNarrative()}
            {this.renderDialog()}
          </div>

          <div className={css.imageGroupsContainer}>
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

    const allCharacters =
      (scene.characters && scene.characters.map((item) => item.name)) || []

    const itemRenderer = ({ item }) => {
      return <ImageDisplay item={item} />
    }

    console.log("frame", toJS(frame)) // zzz

    return (
      <div className={`${css.main}`}>
        <div className={` ${css.scenesContainer}`}>
          {this.renderFrame({ allCharacters })}
          {false && (
            <CrudMachine
              className={css.crudMachine}
              items={items}
              itemRenderer={itemRenderer}
              saveItems={this.saveItems}
              title={"stuff"}
            />
          )}
          (
          <Button className={css.closeButton} onClick={this.deleteFrame}>
            X
          </Button>
        </div>
        {showFacePicker && (
          <div className={css.girlPickersContainer}>
            {this.renderFacePicker({ character: facePickerCharacter })}
            <Button
              className={css.closeFacePickerButton}
              onClick={() => this.toggleFacePicker({})}
            >
              <Icon icon={IconNames.CROSS} />
            </Button>
          </div>
        )}

        {showItemPicker && (
          <CharacterPicker
            imageSets={[
              images.creatures,
              images.all,
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
