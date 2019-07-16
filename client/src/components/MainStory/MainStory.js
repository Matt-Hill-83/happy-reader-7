import React from "react"
import { observer } from "mobx-react"
import { toJS } from "mobx"
import _get from "lodash.get"

import {
  Button,
  Dialog,
  Menu,
  MenuItem,
  Popover,
  PopoverInteractionKind,
  Position
} from "@blueprintjs/core"

import { maps } from "../../Stores/InitStores.js"
import { worldNameStore } from "../../Stores/FrameSetStore"
import FlashCards from "../FlashCards/FlashCards"
import IntroPage1 from "../IntroPage1/IntroPage1.js"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js"
import mySentences from "../../Models/sentences.js"
import PicturePage from "../PicturePage/PicturePage"
import StoryPickerPage from "../StoryPickerPage/StoryPickerPage"
import Utils from "../../Utils/Utils"

import css from "./MainStory.module.scss"
import WorldBuilder from "../WorldBuilder/WorldBuilder.js"

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

    // I need to make these stored shared singletons
    await maps.fetch()
    await worldNameStore.fetch()

    const savedMaps = Utils.getItemsFromDbObj({ dbList: maps })

    savedMaps.forEach(map => {
      const grid = this.transformLocationsGridToLocationsMap({
        scenesGrid: map.data.scenesGrid
      })

      return (map.data.grid = grid)
    })

    localStateStore.setLocationsMaps(savedMaps)

    if (this.state.showIntro) {
      // localStateStore.setPage("you-picker")
      localStateStore.setPage("story-picker")
    } else {
      localStateStore.setPage("intro2")
      // this.onExitIntro({ you: { name: "Luna", creature: "kat" } })
    }
    this.onExitIntro()
  }

  transformLocationsGridToLocationsMap = ({ scenesGrid }) => {
    const locationsMap = []

    // TODO - use array dimensions
    const rows = Array(8).fill(0)
    const columns = Array(8).fill(0)

    rows.map((row, rowIndex) => {
      const newRow = []

      columns.map((col, colIndex) => {
        const rowName = `row-${rowIndex}`
        const colName = `col-${colIndex}`

        const newCell = scenesGrid[rowName][colName]
        const scene = (newCell[0] && toJS(newCell[0].scene)) || {}

        newRow.push(scene)
      })
      locationsMap.push(newRow)
    })

    return locationsMap
  }

  getTerminalScene = ({ start = true }) => {
    // TODO, get map from strore by mapId
    const map = localStateStore.getActiveMap()

    const grid = _get(map, "data.grid") || []

    const allScenes = grid.flat()
    const terminalScene = allScenes.find(scene => {
      return start ? scene.isStartScene : scene.isEndScene
    })

    // If no start and finish scenes are marked, choose some, so the program doesn't break
    return terminalScene || allScenes[0]
  }

  onExitIntro = async () => {
    const savedMaps = Utils.getItemsFromDbObj({ dbList: maps })
    const startScene = this.getTerminalScene({ savedMaps })

    this.updateActiveScene({ activeScene: toJS(startScene) })
    // localStateStore.setPage("story-picker")
  }

  updateActiveScene = ({ activeScene }) => {
    if (!activeScene.name) {
      return
    }

    const map = localStateStore.getActiveMap()
    const lastScene = maps.docs.slice(-1)[0].data

    const activeSceneName = activeScene.name
    const endScene = this.getTerminalScene({ start: false }) || lastScene

    localStateStore.setLocationDetails({
      mapName: map.data.name,
      sceneName: activeSceneName
    })

    if (activeSceneName === endScene.name) {
      this.setState({ showYouWin: true })
    }

    activeScene.neighborNames = this.getNeighbors({ activeScene, map })

    this.setState({ activeScene })
  }

  getNeighbors = ({ activeScene, map }) => {
    const activeSceneName = activeScene.name

    const neighbors = []
    const neighborsArray = []

    // create a map of all the locations for future use
    map.data.grid.forEach((row, rowIndex) => {
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
    const savedMaps = Utils.getItemsFromDbObj({ dbList: maps })
    if (!savedMaps.length) {
      return null
    }

    const showWorldBuilder = localStateStore.getShowWorldBuilder()
    if (showWorldBuilder) {
      return <WorldBuilder />
    }

    const { className } = this.props
    const { activeScene } = this.state

    const index = localStateStore.getActiveMapIndex()

    if (!activeScene) {
      return null
    }

    const activeLocationsMap = localStateStore.getActiveMap()

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
