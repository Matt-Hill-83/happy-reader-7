import {
  Button,
  Icon,
  Position,
  InputGroup,
  FormGroup
} from "@blueprintjs/core"
import React, { Component } from "react"

import Character from "../Character/Character"
import Head from "../Head/Head"
import { IconNames } from "@blueprintjs/icons"
import { observer } from "mobx-react"
import { toJS } from "mobx"

import Images from "../../images/images"
import WordGroup from "../WordGroup/WordGroup"

import css from "./Frame.module.scss"

class Frame extends Component {
  state = { showFacePicker: false, showNarrativeEditor: true }

  componentWillMount() {
    const { frame } = this.props
    this.setState({ frame })
  }

  componentWillReceiveProps(newProps) {
    const { frame } = newProps
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
      frame: { faces }
    } = this.state

    const thisFace = faces.find(face => face.character === name)
    thisFace.face = head.mood

    updateFrameSet({})

    this.setState({ frame })
    this.toggleFacePicker()
  }

  renderFacePicker = ({ name, facePickerIndex }) => {
    const girlImages = Images.posableGirls

    const images = girlImages.find(girl => girl.name === name)

    if (!images) return null

    const {
      images: { heads }
    } = images

    const headImages = heads.map((head, headIndex) => {
      return (
        <div key={headIndex} onClick={() => this.selectHead({ head, name })}>
          <Head name={name} head={head} />
        </div>
      )
    })

    return (
      <div key={facePickerIndex} className={css.girlPickerContainer}>
        <div className={css.girlPicker}>{headImages}</div>
      </div>
    )
  }

  toggleFacePicker = () => {
    const showFacePicker = !this.state.showFacePicker
    this.setState({ showFacePicker })
  }

  renderedDialog = () => {
    const { frame } = this.state
    const dialog = (frame && frame.dialog) || []

    const chats = dialog.map((line, index) => {
      const { text, characterIndex } = line

      if (!text) return null

      const className = `character${characterIndex}`
      return (
        <WordGroup
          index={index}
          story={[text]}
          className={`${css.line} ${css[className]}`}
        />
      )
    })

    return <div className={css.dialog}>{chats}</div>
  }

  onChangeDialog = ({ event, lineIndex }) => {
    const { frame } = this.state
    const dialog = (frame && frame.dialog) || []

    const newLine = event.target.value
    dialog[lineIndex]["text"] = newLine
    this.setState({ frame })
  }

  renderDialogEditor = () => {
    const { frame } = this.state
    const dialog = (frame && frame.dialog) || []

    const inputFields = dialog.map((line, lineIndex) => {
      const { text, characterIndex } = line
      const className = `character${characterIndex}`

      return (
        <InputGroup
          className={`${css.line} ${css[className]}`}
          value={text}
          id="text-input"
          placeholder="Placeholder text"
          onChange={event => this.onChangeDialog({ event, lineIndex })}
          onBlur={event => this.saveNarrative({ event })}
        />
      )
    })

    return (
      <div className={css.dialogEditor}>
        <FormGroup label="kiringle" labelFor="text-input">
          {inputFields}
        </FormGroup>
      </div>
    )
  }

  getMood = ({ name, faces }) => {
    let mood = "ok"
    const newMood = faces && faces.find(face => face.character === name)
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

  renderNarrativeEditor = () => {
    const {
      frame: { story }
    } = this.state

    const inputFields = story.map((line, lineIndex) => {
      return (
        <InputGroup
          value={line}
          id="text-input"
          placeholder="Placeholder text"
          onChange={event => this.onChangeNarrative({ event, lineIndex })}
          onBlur={event => this.saveNarrative({ event })}
        />
      )
    })

    return (
      <div className={css.frameSetNameContainer}>
        <FormGroup label="xxxx" labelFor="text-input">
          {inputFields}
        </FormGroup>
      </div>
    )
  }

  renderFrame = ({ allCharacters = [] }) => {
    const { frame, showNarrativeEditor } = this.state
    if (!frame) return null

    const { story = [], faces = [] } = frame

    const { actionButtons, scene, isEditMode = true } = this.props

    const backgroundImageSky = Images.backgrounds["sky01"]
    const backgroundImageHill = Images.backgrounds["hill01"]
    const locationImage = Images.locations[scene.name]
    const bookImage = Images.sceneView.book
    const notebookImage = Images.sceneView.notebook

    const renderedFriends = allCharacters.map((friend, index) => {
      const mood = this.getMood({ name: friend, faces })

      return (
        <div
          className={css.characterContainer}
          key={index}
          onClick={this.toggleFacePicker}
        >
          <Character name={friend} mood={mood} isEditMode={isEditMode} />
        </div>
      )
    })

    return (
      <div className={css.scene}>
        <div className={css.locationImageContainer}>
          <img
            className={css.locationImage}
            src={locationImage}
            alt={"imagex"}
          />
          <span className={`${css.locationLabel}`}>{scene.name}</span>
        </div>

        <div className={css.wordsContainer}>
          <div className={css.bookImageContainer}>
            {isEditMode && showNarrativeEditor && this.renderNarrativeEditor()}
            <div className={css.narrative}>
              <WordGroup story={story} className={css.narrativeClass} />
            </div>
            {/* <img className={css.bookImage} src={bookImage} alt={"imagex"} /> */}
            {/* <div className={css.notebookImageContainer}>
              <img
                className={css.notebookImage}
                src={notebookImage}
                alt={"imagex"}
              />
            </div> */}
            {this.renderedDialog({})}
            {isEditMode && this.renderDialogEditor()}
          </div>
          {actionButtons}
        </div>

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

          <div className={css.charactersContainer}>{renderedFriends}</div>
        </div>
      </div>
    )
  }

  renderFacePickers = ({ allCharacters }) => {
    return allCharacters.map((name, index) => {
      return this.renderFacePicker({ name, facePickerIndex: index })
    })
  }

  render() {
    const { isEditMode = true } = this.props
    const { frame, showFacePicker } = this.state

    const allCharacters = (frame && frame.creatures) || []

    return (
      <>
        <div className={css.scenesContainer}>
          {this.renderFrame({ allCharacters })}

          {isEditMode && (
            <Button className={css.closeButton} onClick={this.deleteFrame}>
              <Icon icon={IconNames.CROSS} />
            </Button>
          )}
        </div>
        {isEditMode && showFacePicker && (
          <div className={css.girlPickersContainer}>
            {isEditMode && this.renderFacePickers({ allCharacters })}
          </div>
        )}
      </>
    )
  }
}

export default observer(Frame)
