import React from "react"
import { observer } from "mobx-react"
import { toJS } from "mobx"
import _get from "lodash.get"

import { Button, Dialog } from "@blueprintjs/core"

import { maps } from "../../Stores/InitStores.js"
import { worldNameStore } from "../../Stores/FrameSetStore"
import FlashCards from "../FlashCards/FlashCards"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js"
import mySentences from "../../Models/sentences.js"
import PicturePage from "../PicturePage/PicturePage"
import Utils from "../../Utils/Utils"
import WorldBuilder from "../WorldBuilder/WorldBuilder.js"
import WorldPicker from "../WorldPicker/WorldPicker.js"

import css from "./MainStory.module.scss"

// const SHOW_WORLD_BUILDER = true
const SHOW_WORLD_BUILDER = false

class MainStory extends React.Component {
  state = {
    showStory: true,
    activeScene: undefined,
    pages: {},
    showIntro: false,
    showYouWinModal: true,
  }

  async componentWillMount() {
    // I need to make these stores shared singletons
    //  Move these to App.js
    await maps.fetch()
    await worldNameStore.fetch()

    // let mapId = "not set"

    if (maps.docs && maps.docs[0]) {
      const defaultMap = Utils.getFirstReleasedMap()

      const mapId = _get(defaultMap, "id")

      localStateStore.setActiveMapId(mapId)
    }
    await this.init()

    this.setState({ forceUpdate: "test" })
    // temp code DELETE ME!!! (start) - zzz

    // this.toggleWorldBuilder()
    // temp code DELETE ME!!! (end)
  }

  init = async () => {
    // TODO - what does this do exactly, init some constants?
    mySentences.generatePlot({})

    Utils.getFirstReleasedMap()
    const savedMaps = Utils.getItemsFromDbObj({ dbList: maps })
    const filteredMaps = savedMaps.filter((map) => map.data.released)

    // TODO - I need to get maps by id, not by index, because I'm filtering them.
    filteredMaps.forEach((map) => {
      const grid = this.transformLocationsGridToLocationsMap({
        scenesGrid: map.data.newGrid2,
      })
      map.data.grid = grid
    })

    localStateStore.setMaps(filteredMaps)
    localStateStore.setShowWorldBuilder(SHOW_WORLD_BUILDER)
    if (SHOW_WORLD_BUILDER) return

    this.initWorld()
  }

  transformLocationsGridToLocationsMap = ({ scenesGrid }) => {
    const locationsMap = []

    const numRows = scenesGrid.length
    const numCols = Object.values(Object.values(scenesGrid)[0]).length

    const rows = Array(numRows).fill(0)
    const columns = Array(numCols).fill(0)

    rows.map((row, rowIndex) => {
      const newRow = []

      columns.map((col, colIndex) => {
        const rowName = rowIndex
        const colName = colIndex

        const newCell = toJS(scenesGrid[rowName][colName])

        // const scene = (newCell[0] && toJS(newCell[0].scene)) || {}

        newRow.push(newCell)
      })
      locationsMap.push(newRow)
    })

    return locationsMap
  }

  getTerminalScene = ({ start = true }) => {
    const mapId = localStateStore.getActiveMapId()
    const map = Utils.getMapFromId({ id: mapId })

    const startScene = map.data.startScene
    const endScene = map.data.endScene

    const grid = _get(map, "data.newGrid2") || []
    // const grid  =[]

    // I think this is breaking the refs, so assigned props are not retained

    // Re-install firebase
    // TODO: create a setGrid function to update grid in store
    // TODO: create a setGrid function to update grid in store
    // TODO: create a setGrid function to update grid in store
    // TODO: create a setGrid function to update grid in store
    // TODO: create a setGrid function to update grid in store
    // TODO: create a setGrid function to update grid in store
    const flatGrid = toJS(grid).flat()

    // Integrate this fix
    let scenesList = Utils.getArrayOfScenes({ scenesGrid: flatGrid }) || []
    scenesList = scenesList.filter((scene) => scene.location.name !== "blank")

    // hacky way to retroactively assign startScene and endScene to each scene
    scenesList.forEach((scene) => {
      scene.isStartScene = scene.location.name === startScene
      scene.isEndScene = scene.location.name === endScene
    })

    const terminalScene = scenesList.find((scene) => {
      if (scene.isStartScene || scene.isEndScene) {
        return start ? scene.isStartScene : scene.isEndScene
      }
    })

    const validScenes = scenesList.filter((scene) => {
      return toJS(scene).name
    })

    const firstScene = validScenes[0]
    const lastScene = validScenes[validScenes.length - 1]

    // If no start and finish scenes are marked, choose some, so the program doesn't break
    return terminalScene || (start ? firstScene : lastScene)
  }

  initWorld = async () => {
    const startScene = this.getTerminalScene({})
    if (!startScene) return

    // For some reason this is not referencing the object in the grid, and the showCloud prop is not persisting.
    startScene.showCloud = false

    this.updateActiveScene({ activeScene: startScene })
  }

  updateActiveScene = ({ activeScene }) => {
    if (!activeScene || !activeScene.location.name) {
      return
    }

    const map = localStateStore.getActiveMap()

    activeScene.neighborNames = this.getNeighbors({ activeScene, map })

    activeScene.showCloud = false

    // I should set to the store and not to state
    this.setState({ activeScene })
  }

  getNeighbors = ({ activeScene, map }) => {
    const activeSceneName = activeScene.location.name

    const neighbors = []
    const neighborsArray = []

    // create a map of all the locations for future use
    map.data.grid.forEach((row, rowIndex) => {
      row.forEach((location, locationIndex) => {
        location = location || {}

        neighborsArray.push({
          name: location.location.name,
          position: { x: rowIndex, y: locationIndex },
        })
      })
    })

    const currentLocation = neighborsArray.find((item) => {
      return item.name === activeSceneName
    })

    const currentPosition = currentLocation.position

    neighbors.push({ x: currentPosition.x - 1, y: currentPosition.y })
    neighbors.push({ x: currentPosition.x + 1, y: currentPosition.y })
    neighbors.push({ x: currentPosition.x, y: currentPosition.y + 1 })
    neighbors.push({ x: currentPosition.x, y: currentPosition.y - 1 })

    const neighborNames = []

    neighbors.forEach((neighbor) => {
      neighborsArray.forEach((item) => {
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

  toggleWorldBuilder = () => {
    const showWorldBuilder = localStateStore.getShowWorldBuilder()
    const newShowWorldBuilder = !showWorldBuilder

    localStateStore.setShowWorldBuilder(newShowWorldBuilder)

    // TODO - get rid of all this plot stuff
    if (newShowWorldBuilder === false) {
      this.init()
    }
  }

  closeYouWinModal = () => {
    this.setState({ showYouWinModal: false })
  }

  openYouWinModal = () => {
    this.setState({ showYouWinModal: true })
  }

  onChangeMap = ({ mapId }) => {
    localStateStore.setActiveMapId(mapId)

    this.initWorld()
  }

  renderGame = () => {
    const savedMaps = Utils.getItemsFromDbObj({ dbList: maps })

    if (!savedMaps.length) {
      return null
    }

    const { className } = this.props
    const { activeScene } = this.state

    if (!activeScene) {
      return null
    }

    const map = localStateStore.getActiveMap()
    const { title, order } = map.data

    const renderedMapTitle = (
      <div className={css.mapTitle}>
        <span>{`map ${order}: ${title}`}</span>
      </div>
    )

    return (
      <div className={`${css.main} ${className}`}>
        {/* {renderedMapTitle} */}
        <div className={css.floatingButtons}>
          <WorldPicker
            showDelete={false}
            onChangeMap={({ mapId, index }) =>
              this.onChangeMap({ mapId, index })
            }
          />
        </div>
        <div className={css.body}>
          {!this.state.showStory && <FlashCards />}
          {this.state.showStory && (
            <div className={css.storyBox}>
              <PicturePage
                updateActiveScene={this.updateActiveScene}
                activeScene={activeScene}
                openYouWinModal={this.openYouWinModal}
              />
            </div>
          )}
        </div>

        {false && this.state.showYouWinModal && (
          <Dialog
            isOpen={this.state.showYouWinModal}
            isCloseButtonShown={true}
            className={css.levelCompleteDialog}
          >
            <WorldPicker
              showDelete={false}
              onChangeMap={({ mapId, index }) =>
                this.onChangeMap({ mapId, index })
              }
            />
            <Button
              className={css.levelCompletionButton}
              onClick={this.closeYouWinModal}
            >
              PLAY
            </Button>
          </Dialog>
        )}
      </div>
    )
  }

  render() {
    // const mapId = localStateStore.getActiveMapId()
    const activeMap = localStateStore.getActiveMap()

    // const savedMaps = Utils.getItemsFromDbObj({ dbList: maps })

    if (!activeMap || !activeMap.data || !activeMap.data.title) {
      // if (!savedMaps.length) {

      return null
    }

    const showWorldBuilder = localStateStore.getShowWorldBuilder()
    const { className } = this.props

    const toggleWorldBuilderButton = (
      <div
        tabIndex={0}
        className={css.toggleWorldBuilder}
        onClick={this.toggleWorldBuilder}
      >
        <span> AAAAAAA </span>
      </div>
    )

    return (
      <div className={`${css.main} ${className}`}>
        {toggleWorldBuilderButton}
        {showWorldBuilder && <WorldBuilder />}
        {!showWorldBuilder && this.renderGame()}
      </div>
    )
  }
}

export default observer(MainStory)
