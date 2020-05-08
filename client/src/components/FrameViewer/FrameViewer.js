import { Button } from "@blueprintjs/core"
import React, { Component } from "react"
import cx from "classnames"

import Character from "../Character/Character"
import { observer } from "mobx-react"
import { toJS } from "mobx"
import _get from "lodash.get"

import Images from "../../images/images"
import WordGroup from "../WordGroup/WordGroup"

import css from "./FrameViewer.module.scss"
import ImageDisplay from "../ImageDisplay/ImageDisplay"
import Utils from "../../Utils/Utils"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore"
import ArrowNavigator from "../ArrowNavigator/ArrowNavigator"

class FrameViewer extends Component {
  state = {
    showFacePicker: false,
    showNarrativeEditor: true,
    showDialogEditor: true,
    showItemPicker: false,
    items: [],
  }

  renderNarrative = () => {
    const { frame } = this.props
    const { story = [] } = frame

    if (!story.length || !story[0]) return null

    const renderedNarrative = story.map((line, lineIndex) => {
      return <WordGroup story={[line]} className={css.narrativeClass} />
    })

    return <div className={css.narrative}>{renderedNarrative}</div>
  }

  renderDialog = () => {
    const { frame } = this.props
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

  getMood = ({ name, faces }) => {
    let mood = "ok"
    const newMood = faces && faces.find((face) => face.character === name)
    mood = (newMood && newMood.face) || mood
    return mood
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

  renderItems = () => {
    const items = _get(this, "props.scene.items") || []

    return items.map((item) => {
      const { name } = item

      return <ImageDisplay className={css.itemContainer} item={{ name }} />
    })
  }

  renderFriends = () => {
    const { scene, frame } = this.props
    const { faces = [] } = frame
    if (!frame) return null

    const allCharacters =
      (scene.characters && scene.characters.map((item) => item.name)) || []

    const allItems = (scene.items && scene.items.map((item) => item.name)) || []

    // temp code DELETE ME!!! (start)
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

  nextButtonRow = () => {
    const { isLastFrame } = this.props

    return (
      <div className={css.nextPageButtonRow}>
        {!isLastFrame && (
          <Button onClick={this.onClickNext} className={css.nextButton}>
            Next Page
          </Button>
        )}
      </div>
    )
  }

  navigationButtonRow = () => {
    return this.renderArrowNavigator()
  }

  onClickNext = () => {
    localStateStore.incrementActiveFrameIndex()
  }

  openYouWinModal = () => {
    this.props.openYouWinModal()
  }

  changeLocation = ({ sceneId }) => {
    localStateStore.incrementActiveFrameIndex(true)
    this.props.updateActiveScene({ sceneId })
  }

  renderArrowNavigator = () => {
    const activeScene = localStateStore.getActiveScene()
    const { updateActiveScene } = this.props
    const { isEndScene } = activeScene

    // if (isEndScene) {
    //   return (
    //     <Button onClick={this.openYouWinModal} className={css.newGameButton}>
    //       New Game
    //     </Button>
    //   )
    // }

    return (
      <div className={css.navigationButtonRow}>
        <ArrowNavigator
          activeScene={activeScene}
          updateActiveScene={updateActiveScene}
        />
      </div>
    )
  }

  renderFrame = () => {
    const { frame } = this.props

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
          <div className={css.buttonsContainer}>
            {this.navigationButtonRow()}
            {this.nextButtonRow()}
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
    const { scene } = this.props
    const { frame } = this.props

    if (!frame) {
      return null
    }

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
