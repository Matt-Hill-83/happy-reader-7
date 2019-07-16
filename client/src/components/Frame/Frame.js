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
    const { isStartScene, isEndScene, frame } = this.props
    this.setState({ isStartScene, isEndScene, frame })
  }

  componentWillReceiveProps(newProps) {
    const { isStartScene, isEndScene, frame } = newProps
    this.setState({ isStartScene, isEndScene, frame })
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

  renderFacePicker = ({ name }) => {
    const girlImages = Images.posableGirls

    const images = girlImages.find(girl => girl.name === name)

    const {
      images: { heads }
    } = images

    const headImages = heads.map(head => {
      return (
        <div onClick={() => this.selectHead({ head, name })}>
          <Head name={name} head={head} />
        </div>
      )
    })

    return (
      <div className={css.girlPickerContainer}>
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

      const className = `character${characterIndex}`
      return (
        <WordGroup story={[text]} className={`${css.line} ${css[className]}`} />
      )
    })

    return <div className={css.dialog}>{chats}</div>
  }

  getMood = ({ name, faces }) => {
    let mood = "ok"
    const newMood = faces && faces.find(face => face.character === name)
    mood = (newMood && newMood.face) || mood
    return mood
  }

  editNarrative = async () => {
    this.setState({ showNarrativeEditor: true })
    console.log("edit narrative") // zzz
  }

  saveNarrative = async () => {
    const { updateMap } = this.props
    await updateMap({})
  }

  onChangeNarrative = ({ story, event }) => {
    const { frame } = this.state
    const newStory = event.target.value
    console.log("newStory", newStory) // zzz
    frame.story[0] = newStory
    this.setState({ frame })
  }

  renderNarrativeEditor = () => {
    const {
      frame: { story }
    } = this.state

    return (
      <div className={css.frameSetNameContainer}>
        <FormGroup label="Title" labelFor="text-input">
          <InputGroup
            value={story[0]}
            id="text-input"
            placeholder="Placeholder text"
            onChange={event => this.onChangeNarrative({ story, event })}
            onBlur={event => this.saveNarrative({ event })}
          />
        </FormGroup>
      </div>
    )
  }

  renderFrame = ({ allCharacters = [] }) => {
    const {
      frame,
      frame: { story = [], faces = [] },
      showNarrativeEditor
    } = this.state

    const { scene, isEditMode = true } = this.props
    // const { story = [], faces = [] } = frame

    const backgroundImage = Images.backgrounds["hill01"]
    const locationImage = Images.locations[scene.name]
    const bookImage = Images.sceneView.book
    const notebookImage = Images.sceneView.notebook

    const renderedFriends = allCharacters.map(friend => {
      const mood = this.getMood({ name: friend, faces })

      return (
        <div onClick={this.toggleFacePicker}>
          <Character name={friend} mood={mood} isEditMode={isEditMode} />
        </div>
      )
    })

    return (
      <div className={css.scene}>
        <div className={css.backgroundImageContainer}>
          {this.renderedDialog({})}
          <div className={css.locationImageContainer}>
            <img
              className={css.locationImage}
              src={locationImage}
              alt={"imagex"}
            />
          </div>
          <div className={css.bookImageContainer}>
            {showNarrativeEditor && this.renderNarrativeEditor()}
            <div className={css.narrative}>
              {isEditMode && (
                <Button
                  className={css.xxxtoggleFacePickerButton2}
                  onClick={this.editNarrative}
                >
                  Edit
                </Button>
              )}
              <WordGroup story={story} className={css.narrativeClass} />
            </div>
            <img className={css.bookImage} src={bookImage} alt={"imagex"} />
          </div>
          <div className={css.notebookImageContainer}>
            <img
              className={css.notebookImage}
              src={notebookImage}
              alt={"imagex"}
            />
          </div>

          <div className={css.backgroundGrass}>
            <img
              className={`${css.backgroundGrassImage} ${
                isEditMode ? css.isEditMode : ""
              }`}
              src={backgroundImage}
              alt={`backgroundImage`}
            />
          </div>

          <div className={css.charactersContainer}>{renderedFriends}</div>
        </div>
      </div>
    )
  }

  renderFacePickers = ({ allCharacters }) => {
    return allCharacters.map(name => {
      return this.renderFacePicker({ name })
    })
  }

  render() {
    const { isEditMode = true } = this.props
    const { frame, showFacePicker, showNarrativeEditor } = this.state

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
