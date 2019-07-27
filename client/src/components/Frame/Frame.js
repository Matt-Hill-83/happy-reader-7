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
  state = {
    showFacePicker: false,
    showNarrativeEditor: true,
    showDialogEditor: true
  }

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

    //  /TODO - chage to update world maybe?
    updateFrameSet({})

    this.setState({ frame })
    this.toggleFacePicker({})
  }

  renderFacePicker = ({ character }) => {
    const girlImages = Images.posableGirls
    const images = girlImages.find(girl => girl.name === character)

    // For characters with no posable images
    if (!images) return null

    const {
      images: { heads }
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
            onChange={event => this.onChangeNarrative({ event, lineIndex })}
            onBlur={event => this.saveNarrative({ event })}
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
            onChange={event => this.onChangeDialog({ event, lineIndex })}
            onBlur={event => this.saveNarrative({ event })}
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

  renderLocationImage = () => {
    const { scene = true } = this.props
    const locationImage = Images.locations[scene.name]
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

  renderFrame = ({ allCharacters = [] }) => {
    const { frame } = this.state
    const { faces = [] } = frame
    if (!frame) return null

    const { isEditMode = true } = this.props

    const renderedFriends = allCharacters.map((friend, index) => {
      const mood = this.getMood({ name: friend, faces })

      return (
        <div
          className={`${css.characterContainer}`}
          key={index}
          onClick={() => this.toggleFacePicker({ character: friend })}
        >
          <Character name={friend} mood={mood} isEditMode={isEditMode} />
        </div>
      )
    })

    return (
      <div className={`${css.scenes}`}>
        {this.renderBackground()}
        {this.renderLocationImage()}

        <div className={css.wordsContainer}>
          {this.renderNarrative()}
          {this.renderDialog()}
        </div>

        <div className={css.charactersContainer}>{renderedFriends}</div>
      </div>
    )
  }

  render() {
    const { isEditMode = true } = this.props
    const { frame, showFacePicker, facePickerCharacter } = this.state

    const allCharacters = (frame && frame.creatures) || []

    return (
      <div className={`${css.main} ${isEditMode ? css.editFrame : ""}`}>
        <div
          className={` ${css.scenesContainer} ${
            isEditMode ? css.editingFrame : ""
          }`}
        >
          {this.renderFrame({ allCharacters })}

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
      </div>
    )
  }
}

export default observer(Frame)
