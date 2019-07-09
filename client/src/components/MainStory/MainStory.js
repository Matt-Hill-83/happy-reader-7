import React from "react"
import { observer } from "mobx-react"
import { toJS } from "mobx"

import {
  Button,
  Dialog,
  Menu,
  MenuItem,
  Popover,
  PopoverInteractionKind,
  Position
} from "@blueprintjs/core"

import FlashCards from "../FlashCards/FlashCards"
import IntroPage1 from "../IntroPage1/IntroPage1.js"
import PicturePage from "../PicturePage/PicturePage"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js"
import { maps } from "../../Stores/InitStores.js"
import mySentences from "../../Models/sentences.js"

import css from "./MainStory.module.scss"
import StoryPickerPage from "../StoryPickerPage/StoryPickerPage"

class MainStory extends React.Component {
  state = {
    // showStory: false,
    showStory: true,
    activeScene: undefined,
    pages: {},
    showIntro: false
    // showIntro: true
  }

  async componentWillMount() {
    mySentences.generateYou({})
    mySentences.generatePlot({})

    // localStateStore.setsmallMap(false)
    if (this.state.showIntro) {
      // localStateStore.setPage("you-picker")
      localStateStore.setPage("story-picker")
    } else {
      localStateStore.setPage("intro2")
      // this.onExitIntro({ you: { name: "Luna", creature: "kat" } })
    }
    this.onExitIntro()
  }

  getTerminalScene = ({ start = true }) => {
    const locationsMap = localStateStore.getActiveLocationsMap()

    const scenesGrid = JSON.parse(locationsMap.scenesGrid)

    const allScenes = scenesGrid.flat()
    const terminalScene = allScenes.find(scene => {
      if (!scene.creatures) {
        return false
      }
      const creatureTypes = scene.creatures.map(char => char.type)

      return creatureTypes.includes(`${start ? "start" : "end"}`)
    })

    // If no start and finish scenes are marked, choose some, so the program doesn't break
    return terminalScene
    // return terminalScene || start ? allScenes[0] : allScenes[1]
  }

  onExitIntro = async () => {
    const { docs } = await maps.fetch()

    const savedMaps = docs.map(map => toJS(map.data))
    localStateStore.setLocationsMaps(savedMaps)
    const startScene = this.getTerminalScene({ savedMaps })

    this.updateActiveScene({ activeScene: toJS(startScene) })
    // localStateStore.setPage("story-picker")
  }

  updateActiveScene = ({ activeScene }) => {
    const locationsMap = localStateStore.getActiveLocationsMap()

    const activeSceneName = activeScene.name
    const endScene = this.getTerminalScene({ start: false })

    const activeLocationsMap = localStateStore.getActiveLocationsMap()

    // todo, move this to where the scene is updated
    localStateStore.setLocationDetails({
      mapName: activeLocationsMap.name,
      sceneName: activeSceneName
    })

    if (activeSceneName === endScene.name) {
      this.setState({ showYouWin: true })
    }

    activeScene.neighborNames = this.getNeighbors({ activeScene, locationsMap })

    this.setState({ activeScene })
  }

  getNeighbors = ({ activeScene, locationsMap }) => {
    const activeSceneName = activeScene.name

    const neighbors = []
    const neighborsArray = []

    // create a map of all the locations for future use
    const scenesGrid = JSON.parse(locationsMap.scenesGrid)

    scenesGrid.forEach((row, rowIndex) => {
      row.forEach((location, locationIndex) => {
        location = location || {}

        neighborsArray.push({
          name: location.name,
          position: { x: rowIndex, y: locationIndex }
        })
      })
    })

    const currentLocation = neighborsArray.find(item => {
      return item.name === activeSceneName
    })

    const currentPosition = currentLocation.position

    neighbors.push({ x: currentPosition.x - 1, y: currentPosition.y })
    neighbors.push({ x: currentPosition.x + 1, y: currentPosition.y })
    neighbors.push({ x: currentPosition.x, y: currentPosition.y + 1 })
    neighbors.push({ x: currentPosition.x, y: currentPosition.y - 1 })

    const neighborNames = []

    neighbors.forEach(neighbor => {
      neighborsArray.forEach(item => {
        if (item.position.x === neighbor.x && item.position.y === neighbor.y) {
          neighborNames.push(item.name)
        }
      })
    })

    return neighborNames
  }

  toggleFlashCards = () => {
    this.setState({ showStory: !this.state.showStory })
  }

  changeCharacter = () => {
    localStateStore.setPage("you-picker")
  }

  toggleMap = () => {
    const smallMap = localStateStore.getsmallMap()
    localStateStore.setsmallMap(!smallMap)
  }

  toggleWorldBuilder = () => {
    const plot = localStateStore.getPlot()

    const showWorldBuilder = localStateStore.getShowWorldBuilder()
    const newShowWorldBuilder = !showWorldBuilder

    localStateStore.setShowWorldBuilder(newShowWorldBuilder)
    if (newShowWorldBuilder === false) {
      this.updateActiveScene({ activeScene: plot.activeScene })
    }
  }

  closeYouWin = () => {
    this.setState({ showYouWin: false })
    const isLastMap = localStateStore.isLastMap()

    if (!isLastMap) {
      localStateStore.incrementActiveLocationsMapIndex()
      const startScene = this.getTerminalScene({})

      this.updateActiveScene({ activeScene: startScene })
    }
  }

  changeMap = ({ index }) => {
    localStateStore.setActiveLocationsMapIndex(index)
  }

  render() {
    const { className } = this.props
    const { activeScene } = this.state

    const index = localStateStore.getActiveLocationsMapIndex()

    if (!activeScene) {
      return null
    }

    const activeLocationsMap = localStateStore.getActiveLocationsMap()

    const { name: activeSceneName } = activeScene
    const page = localStateStore.getPage()
    const wordPageProps = { activeScene }

    if (page === "you-picker") {
      return (
        <IntroPage1 className={css.IntroPage1} onExitIntro={this.onExitIntro} />
      )
    }

    if (page === "story-picker") {
      return (
        <StoryPickerPage
          className={css.IntroPage1}
          onExitIntro={this.onExitIntro}
        />
      )
    }

    // // todo, move this to where the scene is updated
    // localStateStore.setLocationDetails({
    //   mapName: activeLocationsMap.name,
    //   sceneName: activeSceneName
    // })

    const renderedMapTitle = (
      <div className={css.mapTitle}>
        <span>{`map: ${index}  `}</span>
        <span>{`name: ${activeLocationsMap.name}`}</span>
        <div>{`scene: ${activeSceneName}`}</div>
      </div>
    )

    const changeCharacterButton = (
      <Button
        tabIndex={0}
        className={css.newStoryBtn}
        onClick={this.changeCharacter}
        // disabled={true}
      >
        <span> Change Character </span>
      </Button>
    )

    const toggleMapButton = (
      <Button
        tabIndex={0}
        className={css.newStoryBtn}
        onClick={this.toggleMap}
        disabled={true}
      >
        <span>Toggle Map</span>
      </Button>
    )

    const toggleWorldBuilderButton = (
      <Button
        tabIndex={0}
        className={css.newStoryBtn}
        onClick={this.toggleWorldBuilder}
      >
        <span> Toggle World Builder </span>
      </Button>
    )

    const isLastMap = localStateStore.isLastMap()

    const youWinMessage = isLastMap ? "You Win!" : "Good Job!"

    return (
      <div className={`${css.main} ${className}`}>
        <div className={css.floatingButtons}>
          {renderedMapTitle}
          <div className={css.settingButtons}>
            {/* {changeCharacterButton} */}
            {/* {toggleMapButton} */}
            {toggleWorldBuilderButton}
          </div>
        </div>
        <div className={css.body}>
          {!this.state.showStory && <FlashCards />}
          {this.state.showStory && (
            <div className={css.storyBox}>
              <PicturePage
                wordPageProps={wordPageProps}
                updateActiveScene={this.updateActiveScene}
                activeScene={activeScene}
              />
            </div>
          )}
        </div>
        <Dialog
          isOpen={this.state.showYouWin}
          isCloseButtonShown={true}
          className={css.levelCompleteDialog}
        >
          <span className={css.levelCompletionMessage}>{youWinMessage}</span>
          <Button
            className={css.levelCompletionButton}
            onClick={this.closeYouWin}
          >
            GO
          </Button>
        </Dialog>
      </div>
    )
  }
}

export default observer(MainStory)
