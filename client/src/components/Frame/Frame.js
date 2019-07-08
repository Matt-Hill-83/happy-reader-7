import { Button, Icon, Position } from "@blueprintjs/core"
import React, { Component } from "react"

import Character from "../Character/Character"
import Head from "../Head/Head"
import { IconNames } from "@blueprintjs/icons"
import Images from "../../images/images"
import Utils from "../../Utils/Utils"
import WordGroup from "../WordGroup/WordGroup"
import css from "./Frame.module.scss"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore"
import { observer } from "mobx-react"
import { toJS } from "mobx"

class Frame extends Component {
  state = { showFacePicker: false }

  componentWillMount() {}

  deleteFrame = () => {
    const { deleteFrame } = this.props

    deleteFrame && deleteFrame({ frame: "id" })
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

  renderedDialog = ({}) => {
    const { frame } = this.props
    const dialog = (frame && frame.dialog) || []

    const chats =
      dialog &&
      dialog.map(line => {
        const { text, character } = line

        return (
          <WordGroup
            story={[text]}
            className={`${css.line} ${css[character]}`}
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

  renderFrame = ({ allCharacters = [] }) => {
    const { sceneToEdit, frame = {}, isEditMode = true } = this.props
    const { story = [], faces = [] } = frame

    const backgroundImage = Images.backgrounds["hill01"]
    const locationImage = Images.locations[sceneToEdit.name]
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
    console.log("isEditMode", isEditMode) // zzz

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
              alt={`backgroundImage-image`}
            />
          </div>

          <div className={css.charactersContainer}>{renderedFriends}</div>
        </div>
      </div>
    )
  }

  render() {
    const { frame, isEditMode = true } = this.props

    const creatures = (frame && frame.creatures) || []
    const { showFacePicker } = this.state

    const friendNames = creatures.map(creature => creature.type)
    const you = localStateStore.getYou()
    const yourName = you.name

    const allCharacters = [yourName, ...friendNames]

    const renderedFacePickers =
      isEditMode &&
      allCharacters.map(name => {
        return this.renderFacePicker({ name })
      })

    return (
      <>
        {isEditMode && showFacePicker && (
          <div className={css.girlPickersContainer}>
            <Button
              className={css.toggleFacePickerButton2}
              onClick={this.toggleFacePicker}
            >
              <Icon icon={IconNames.DATABASE} />
            </Button>
            {renderedFacePickers}
          </div>
        )}
        <div className={css.scenesContainer}>
          {this.renderFrame({ you, allCharacters })}
          {isEditMode && (
            <Button
              className={css.toggleFacePickerButton}
              onClick={this.toggleFacePicker}
            >
              <Icon icon={IconNames.DATABASE} />
            </Button>
          )}
        </div>

        {isEditMode && (
          <Button className={css.closeButton} onClick={this.deleteFrame}>
            <Icon icon={IconNames.CROSS} />
          </Button>
        )}
      </>
    )
  }
}

export default observer(Frame)
