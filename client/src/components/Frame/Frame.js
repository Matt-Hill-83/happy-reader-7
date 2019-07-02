import { Button, Icon, Position } from "@blueprintjs/core"
import { IconNames } from "@blueprintjs/icons"
import { observer } from "mobx-react"
import { toJS } from "mobx"
import React, { Component } from "react"
import Images from "../../images/images"
import WordGroup from "../WordGroup/WordGroup"
import Character from "../Character/Character"
import Head from "../Head/Head"

import localStateStore from "../../Stores/LocalStateStore/LocalStateStore"
import Utils from "../../Utils/Utils"

import css from "./Frame.module.scss"

class Frame extends Component {
  state = { frames: [], showFacePicker: false }

  componentWillMount() {}

  deleteFrame = () => {
    const { deleteFrame } = this.props
    console.log("delete frame") // zzz

    deleteFrame && deleteFrame({ frame: "id" })
  }

  selectHead = ({ name, head }) => {
    const allCreatures = localStateStore.getCreatures()
    const creature = allCreatures.find(creature => creature.type === name)

    // TODO - I should push the store here.
    creature.mood = head.mood
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
    const { dialog } = frame

    const chats = dialog.map(line => {
      return (
        <div className={css.dialog}>
          <WordGroup story={[line.text]} className={css.narrativeClass} />
        </div>
      )
    })

    return chats
  }

  renderFrame = ({ you, friends = [] }) => {
    const { sceneToEdit, frame } = this.props
    const { story } = frame

    const yourName = you.name
    const yourCreature = Utils.getCreatureByType({ type: yourName })

    const backgroundImage = Images.backgrounds["hill01"]
    const locationImage = Images.locations[sceneToEdit.name]
    const bookImage = Images.sceneView.book
    const notebookImage = Images.sceneView.notebook

    const renderedFriends = friends.map(friend => {
      const creature = Utils.getCreatureByType({ type: friend })

      return <Character name={friend} mood={creature.mood} />
    })

    const yourMood = yourCreature.mood

    return (
      <div className={css.scene}>
        <div className={css.backgroundImageContainer}>
          <div className={css.locationImageContainer}>
            <img
              className={css.locationImage}
              src={locationImage}
              alt={"imagex"}
            />
          </div>
          <div className={css.bookImageContainer}>
            {this.renderedDialog({})}

            <div className={css.narrative}>
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
          {/* <div className={css.backgroundSky}>
          <img
          className={`${css.backgroundSkyImage} `}
          src={backgroundImage}
          alt={`${"amber-head"}-image`}
          />
        </div> */}
          <div className={css.backgroundGrass}>
            <img
              className={`${css.backgroundGrassImage} `}
              src={backgroundImage}
              alt={`${"amber-head"}-image`}
            />
          </div>

          <div className={css.charactersContainer}>
            <div className={css.youContainer}>
              <Character name={yourName} mood={yourMood} />
            </div>
            {renderedFriends}
          </div>
        </div>
      </div>
    )
  }

  render() {
    const {
      frame,
      frame: { creatures }
    } = this.props

    const { showFacePicker } = this.state

    const friendNames = creatures.map(creature => creature.type)
    const you = localStateStore.getYou()
    const yourName = you.name

    const allCharacters = [yourName, ...friendNames]

    const renderedFacePickers = allCharacters.map(name => {
      return this.renderFacePicker({ name })
    })

    return (
      <>
        {showFacePicker && (
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
          {this.renderFrame({ you, friends: friendNames })}
          <Button
            className={css.toggleFacePickerButton}
            onClick={this.toggleFacePicker}
          >
            <Icon icon={IconNames.DATABASE} />
          </Button>
        </div>

        {/* <Button className={css.closeButton} onClick={this.deleteFrame}>
          <Icon icon={IconNames.CROSS} />
        </Button> */}
      </>
    )
  }
}

export default observer(Frame)
