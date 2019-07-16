import { Button, Icon, Position } from "@blueprintjs/core"
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
  state = { showFacePicker: false }

  componentWillMount() {
    // const { isStartScene, isEndScene, scene } = this.props
    // this.setState({ isStartScene, isEndScene, scene })
  }

  componentWillReceiveProps(newProps) {
    // const { isStartScene, isEndScene, scene } = newProps
    // this.setState({ isStartScene, isEndScene, scene })
  }

  deleteFrame = () => {
    const { deleteFrame, frameIndex } = this.props

    deleteFrame({ frameIndex })
  }

  cloneFrame = () => {
    const { cloneFrame } = this.props

    cloneFrame && cloneFrame({ frame: "id" })
  }

  selectHead = ({ name, head }) => {
    const {
      updateFrameSet,
      frame: { faces }
    } = this.props

    const thisFace = faces.find(face => face.character === name)
    thisFace.face = head.mood

    updateFrameSet({})

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
    const { frame } = this.props
    const dialog = (frame && frame.dialog) || []

    const chats =
      dialog &&
      dialog.map((line, index) => {
        const { text, characterIndex } = line

        const className = `character${characterIndex}`
        return (
          <WordGroup
            story={[text]}
            className={`${css.line} ${css[className]}`}
          />
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

  editNarrative = ({ allCharacters = [] }) => {
    console.log("edit narrative") // zzz

    const { scene, frame = {}, isEditMode = true } = this.props

    const { story = [], faces = [] } = frame
  }

  onChangeNarrative = async ({ event }) => {
    const frameSet = this.getFrameSet()
    frameSet.title = event.target.value
    this.setState({ frameSet })
  }

  updateNarrative = async ({ event }) => {
    const frameSet = this.getFrameSet()
    frameSet.title = event.target.value
    this.setState({ frameSet })
    this.props.updateFrameSet({ frameSet })
  }

  // updateFrameSet = async () => {
  //   const { updateMap } = this.props
  //   const frameSet = this.getFrameSet()

  //   // updateMap && updateMap({ newProps: { frameSet: toJS(frameSet) } })
  // }

  renderFrame = ({ allCharacters = [] }) => {
    const { scene, frame = {}, isEditMode = true } = this.props
    const { story = [], faces = [] } = frame

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
    const { frame, isEditMode = true } = this.props
    const { showFacePicker } = this.state

    const allCharacters = (frame && frame.creatures) || []

    return (
      <>
        {isEditMode && showFacePicker && (
          <div className={css.girlPickersContainer}>
            {false && (
              <Button
                className={css.toggleFacePickerButton2}
                onClick={this.toggleFacePicker}
              >
                <Icon icon={IconNames.DATABASE} />
              </Button>
            )}
            {isEditMode && this.renderFacePickers({ allCharacters })}
          </div>
        )}
        <div className={css.scenesContainer}>
          {this.renderFrame({ allCharacters })}
          {false && isEditMode && (
            <Button
              className={css.toggleFacePickerButton}
              onClick={this.toggleFacePicker}
            >
              <Icon icon={IconNames.DATABASE} />
            </Button>
          )}

          {isEditMode && (
            <Button className={css.closeButton} onClick={this.deleteFrame}>
              <Icon icon={IconNames.CROSS} />
            </Button>
          )}
        </div>
      </>
    )
  }
}

export default observer(Frame)
