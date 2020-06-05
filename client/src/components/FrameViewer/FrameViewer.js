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

  renderDialog = ({ cloneIndex }) => {
    const { frame } = this.props
    const dialog = (frame && frame.dialog) || []

    const renderedDialogs = dialog.map((line, lineIndex) => {
      const { text, characterIndex } = line

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

    const scalingFactor = 1.6
    const style = {
      "margin-left": `-${cloneIndex * scalingFactor}vh`,
      "margin-top": `${cloneIndex * scalingFactor}vh`,
      border: "3px solid red",
    }
    return (
      <div className={css.dialogScroller} style={style}>
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
    const locationName = _get(this.props, "scene.location.name")
    const locationImage = Images.all[locationName]

    return (
      <div className={css.locationImageContainer}>
        <img className={css.locationImage} src={locationImage} alt={"imagex"} />
        <span className={`${css.locationLabel}`}>{locationName}</span>
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

  renderPocketItems = () => {
    const questStatus = localStateStore.getQuestStatus()
    console.log("questStatus-----FV---------------", toJS(questStatus)) // zzz

    const items = _get(questStatus, "pockets") || null

    const itemKeys = Object.keys(items)
    if (itemKeys.length === 0 || !items) {
      return null
    }

    return itemKeys.map((key, index) => {
      const existingItem = items[key]
      const { amount } = existingItem
      console.log("existingItem------------------->>>", toJS(existingItem)) // zzz

      const newItem = { name: key, index }
      console.log("key================-=-=-=-", toJS(key)) // zzz

      return (
        <ImageDisplay
          className={css.itemContainer}
          item={newItem}
          showLabel={true}
          amount={amount}
        />
      )
    })
  }

  renderFriends = () => {
    const { scene, frame } = this.props
    const { faces = [] } = frame
    if (!frame) return null

    let allCreatures = []

    if (frame.creatures && frame.creatures.length > 0) {
      allCreatures = [...frame.creatures]
    } else {
      allCreatures =
        (scene.characters && scene.characters.map((item) => item.name)) || []
    }

    let allItems = []

    if (frame.items && frame.items.length > 0) {
      allItems = [...frame.items]
    } else {
      allItems = (scene.items && scene.items.map((item) => item.name)) || []
    }
    console.log("allItems", toJS(allItems)) // zzz
    console.log("scene.items", toJS(scene.items)) // zzz

    // const allItems = (scene.items && scene.items.map((item) => item.name)) || []

    // temp code DELETE ME!!! (start)
    allCreatures.push(...allItems)
    // temp code DELETE ME!!! (end)
    console.log("allCreatures", toJS(allCreatures)) // zzz

    const filteredCharacters = allCreatures.filter((item) => {
      return !["liz2", "kat", "katieKooper01"].includes(item)
    })

    const lock01 = Images.backgrounds["lock01"]

    // - determine is an item in the scene is a reward in a quest
    // -- if so pick it up
    // - determine if the user has
    const playerHasCompletedAllQuests = false

    return filteredCharacters.map((character, index) => {
      const mood = this.getMood({ name: character, faces })

      return (
        <div className={`${css.characterContainer}`} key={index}>
          <Character
            name={character}
            mood={mood}
            isEditMode={false}
            showHeadOnly={false}
          />
          {playerHasCompletedAllQuests && (
            <img className={css.lock01} src={lock01} alt={`backgroundImage`} />
          )}
        </div>
      )
    })
  }

  renderLizAndKat = () => {
    const { scene, frame } = this.props
    const { faces = [] } = frame
    if (!frame) return null

    let allCreatures = []

    if (frame.creatures && frame.creatures.length > 0) {
      allCreatures = [...frame.creatures]
    } else {
      allCreatures =
        (scene.characters && scene.characters.map((item) => item.name)) || []
    }

    let allItems = []

    if (frame.items && frame.items.length > 0) {
      allItems = [...frame.items]
    } else {
      allItems = (scene.items && scene.items.map((item) => item.name)) || []
    }

    // const allItems = (scene.items && scene.items.map((item) => item.name)) || []

    // temp code DELETE ME!!! (start)
    allCreatures.push(...allItems)
    // temp code DELETE ME!!! (end)
    console.log("allCreatures", toJS(allCreatures)) // zzz

    const filteredCharacters = allCreatures.filter((item) => {
      return ["liz2", "kat", "katieKooper01"].includes(item)
    })

    return filteredCharacters.map((character, index) => {
      const mood = this.getMood({ name: character, faces })

      return (
        <div className={`${css.characterContainer2}`} key={index}>
          <Character
            name={character}
            mood={mood}
            isEditMode={false}
            showHeadOnly={false}
          />
        </div>
      )
    })
  }

  nextButtonRow = () => {
    return (
      <div className={css.nextPageButtonRow}>
        <Button onClick={this.onClickNext} className={css.nextButton}>
          Next Page
        </Button>
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
        {!isLastFrame && (
          <div className={css.nextPageButtonRow}>
            <Button onClick={this.onClickNext} className={css.nextButton}>
              Next Page
            </Button>
          </div>
        )}
        {isLastFrame && (
          <ArrowNavigator
            activeScene={activeScene}
            updateActiveScene={updateActiveScene}
          />
        )}
      </div>
    )
  }

  cloneDialogs = () => {
    const numPages = 3
    const dialogClones = []
    for (let cloneIndex = 0; cloneIndex < numPages; cloneIndex++) {
      const dialog = this.renderDialog({ cloneIndex })
      dialogClones.push(dialog)
    }

    return dialogClones

    // return (
    //   <>
    //     {this.renderDialog()}
    //     {this.renderDialog()}
    //     {this.renderDialog()}
    //   </>
    // )
  }

  renderFrame = () => {
    const { scene, isLastFrame } = this.props

    const sceneName = scene.location.name
    const hideMissionConsole = localStateStore.getQuestStatus()
      .hideMissionConsole

    return (
      <div className={`${css.scenes}`}>
        {this.renderBackground()}
        {this.renderLocationImage()}

        <div className={css.relativePositionedContent}>
          <div className={css.wordsAndButtons}>
            <div className={css.sceneName}>{sceneName}</div>
            <div className={css.wordsContainer}>{this.cloneDialogs()}</div>
            <div className={css.buttonsContainer}>
              {this.renderArrowNavigator()}
            </div>
          </div>
          <div className={css.imageGroupsContainer}>
            {/* uncomment this when more than 2 characters can be added */}
            <div className={css.lizAndKatContainer}>
              {this.renderLizAndKat()}
            </div>
            <div className={css.charactersContainer}>
              {this.renderFriends()}
            </div>
            {!hideMissionConsole && (
              <div className={css.itemsContainer}>
                <div className={css.itemContainerTitle}>Your Pockets</div>
                {this.renderPocketItems()}
              </div>
            )}
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

    return (
      <div className={css.main}>
        <div className={css.scenesContainer}>{this.renderFrame()}</div>
      </div>
    )
  }
}

export default observer(FrameViewer)
