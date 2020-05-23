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
  state = {}

  renderNarrative = () => {
    const { frame } = this.props
    const { story = [] } = frame

    if (!story.length || !story[0]) return null

    const renderedNarrative = story.map((line, lineIndex) => {
      return <WordGroup story={[line]} className={css.narrativeClass} />
    })

    return <div className={css.narrative}></div>
    // return <div className={css.narrative}>{renderedNarrative}</div>
  }

  renderDialog = () => {
    const { frame } = this.props
    const dialog = (frame && frame.dialog) || []

    const renderedDialogs = dialog.map((line, lineIndex) => {
      const { text, characterIndex } = line

      console.log("characterIndex-----------------FV", toJS(characterIndex)) // zzz

      if (!text) return null

      const className = `character${characterIndex}`
      const characterName = line.character || ""

      const indexIsEven = characterIndex % 2 === 0

      const isEven = (
        <div className={cx(css.line, css[className], css.isEven)}>
          <div className={cx(css.characterNameContainer)}>
            <span className={css.characterName}>{characterName}</span>
          </div>
          <WordGroup lineIndex={lineIndex} story={[text]} />
        </div>
      )

      const isOdd = (
        <div className={cx(css.line, css[className], css.isOdd)}>
          <WordGroup lineIndex={lineIndex} story={[text]} />
          <div className={cx(css.characterNameContainer)}>
            <span className={css.characterName}>{characterName}</span>
          </div>
        </div>
      )

      return indexIsEven ? isEven : isOdd
    })

    return (
      <div className={css.dialogScroller}>
        <div className={css.dialog}>{renderedDialogs}</div>
      </div>
    )
  }

  getMood = ({ name, faces }) => {
    let mood = "ok"
    const newMood = faces && faces.find((face) => face.character === name)
    mood = (newMood && newMood.face) || mood
    return mood
  }

  renderLocationImage = () => {
    const locationImage =
      Images.locations[_get(this.props, "scene.location.name")]

    return (
      <div className={css.locationImageContainer}>
        <img className={css.locationImage} src={locationImage} alt={"imagex"} />
        {/* <span className={`${css.locationLabel}`}>{scene.location.name}</span> */}
      </div>
    )
  }

  renderBackground = () => {
    const backgroundImageHill = Images.backgrounds["hill01"]
    const brokenMonitor01 = Images.backgrounds["brokenMonitor01"]

    return (
      <div className={css.backgroundImageContainer}>
        <div className={css.backgroundGrass}>
          <img
            className={css.backgroundGrassImage}
            src={backgroundImageHill}
            alt={`backgroundImage`}
          />
        </div>
        {/* <div className={css.backgroundGrass}>
          <img
            className={css.backgroundGrassImage}
            src={brokenMonitor01}
            alt={`backgroundImage`}
          />
        </div> */}
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
    console.log("frame", toJS(frame)) // zzz
    console.log("scene", toJS(scene)) // zzz

    let allCharacters = []

    if (frame.creatures && frame.creatures.length > 0) {
      allCharacters = [...frame.creatures]
    } else {
      allCharacters =
        (scene.characters && scene.characters.map((item) => item.name)) || []
    }

    let allItems = []

    if (frame.items && frame.items.length > 0) {
      allItems = [...frame.items]
    } else {
      allItems = (scene.items && scene.items.map((item) => item.name)) || []
    }

    // const allItems = (scene.items && scene.items.map((item) => item.name)) || []
    console.log("allItems", toJS(allItems)) // zzz

    // temp code DELETE ME!!! (start)
    allCharacters.push(...allItems)
    // temp code DELETE ME!!! (end)
    console.log("allCharacters", toJS(allCharacters)) // zzz

    return allCharacters.map((character, index) => {
      const mood = this.getMood({ name: character, faces })

      return (
        <div className={`${css.characterContainer}`} key={index}>
          <div onClick={() => this.toggleFacePicker({ character: character })}>
            <Character name={character} mood={mood} isEditMode={false} />
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

  onClickNext = () => {
    localStateStore.incrementActiveFrameIndex()
  }

  renderArrowNavigator = () => {
    const activeScene = localStateStore.getActiveScene()
    const { isLastFrame, updateActiveScene, openYouWinModal } = this.props
    const { isEndScene } = activeScene

    if (isEndScene && isLastFrame) {
      return (
        <Button onClick={openYouWinModal} className={css.newGameButton}>
          New Game
        </Button>
      )
    }

    return (
      <div className={css.arrowNavigatorBox}>
        <ArrowNavigator
          activeScene={activeScene}
          updateActiveScene={updateActiveScene}
        />
      </div>
    )
  }

  renderFrame = () => {
    const { scene } = this.props

    const sceneName = scene.location.name
    const renderedItems = this.renderItems()
    const renderedFriends = this.renderFriends()

    return (
      <div className={`${css.scenes}`}>
        {this.renderBackground()}
        {this.renderLocationImage()}

        <div className={css.relativePositionedContent}>
          <div className={css.wordsAndButtons}>
            <div className={css.sceneName}>{sceneName}</div>
            <div className={css.wordsContainer}>
              {/* {this.renderNarrative()} */}
              {this.renderDialog()}
              {this.nextButtonRow()}
            </div>
            <div className={css.buttonsContainer}>
              {this.renderArrowNavigator()}
            </div>
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
    const { frame } = this.props

    if (!frame) {
      return null
    }
    console.log("frame", toJS(frame)) // zzz

    return (
      <div className={css.main}>
        <div className={css.scenesContainer}>{this.renderFrame()}</div>
      </div>
    )
  }
}

export default observer(FrameViewer)
