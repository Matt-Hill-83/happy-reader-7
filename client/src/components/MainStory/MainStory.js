import React from "react"
import { observer } from "mobx-react"
import { toJS } from "mobx"
import _get from "lodash.get"

import { Button, Dialog } from "@blueprintjs/core"

import { maps } from "../../Stores/InitStores.js"
import { worldNameStore } from "../../Stores/FrameSetStore"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js"
import PicturePage from "../PicturePage/PicturePage"
import Utils from "../../Utils/Utils"
import WorldBuilder from "../WorldBuilder/WorldBuilder.js"
import WorldPicker from "../WorldPicker/WorldPicker.js"

import css from "./MainStory.module.scss"

// const SHOW_WORLD_BUILDER = true
const SHOW_WORLD_BUILDER = false

class MainStory extends React.Component {
  state = {
    activeScene: undefined,
    showYouWinModal: true,
  }

  async componentWillMount() {
    // I need to make these stores shared singletons
    //  Move these to App.js
    await maps.fetch()
    await worldNameStore.fetch()

    if (maps.docs && maps.docs[0]) {
      const defaultMap = Utils.getFirstReleasedMap()

      const mapId = _get(defaultMap, "id")

      localStateStore.setActiveMapId(mapId)
    }

    if (SHOW_WORLD_BUILDER) {
      this.toggleWorldBuilder()
    } else {
      await this.init()
    }
  }

  init = async () => {
    Utils.getFirstReleasedMap()
    const savedMaps = Utils.getItemsFromDbObj({ dbList: maps })
    const filteredMaps = savedMaps.filter((map) => map.data.released)

    // TODO - I need to get maps by id, not by index, because I'm filtering them.
    filteredMaps.forEach((map) => {
      const {
        data: { gridDimensions, newGrid5 },
      } = map

      const grid = Utils.reCreateGridFromCondensedGrid({
        gridDimensions,
        newGrid5,
      })

      map.data.grid = grid
    })

    localStateStore.setShowWorldBuilder(SHOW_WORLD_BUILDER)
    if (SHOW_WORLD_BUILDER) return

    this.initWorld()
  }

  getTerminalScene = ({ start = true }) => {
    const map = localStateStore.getActiveMap()

    const startScene2 = map.data.startScene
    const endScene2 = map.data.endScene
    console.log("startScene2", startScene2) // zzz
    console.log("endScene2", endScene2) // zzz

    const scenesGrid = _get(map, "data.newGrid5") || []

    const endScene = scenesGrid.find((item) => item.id === map.data.endSceneId)
    const startScene = scenesGrid.find(
      (item) => item.id === map.data.startSceneId
    )

    const terminalScene = start ? startScene : endScene
    // console.log("map.data", toJS(map.data)) // zzz

    console.log("-----------") // zzz
    console.log("-----------") // zzz
    console.log("-----------") // zzz

    const firstScene = scenesGrid[0]
    const lastScene = scenesGrid[scenesGrid.length - 1]

    // If no start and finish scenes are marked, choose some, so the program doesn't break
    return terminalScene || (start ? firstScene : lastScene)
  }

  initWorld = async () => {
    console.log("initWorld") // zzz

    const startScene = this.getTerminalScene({})
    if (!startScene) return

    localStateStore.setActiveSceneId(startScene.id)

    // For some reason this is not referencing the object in the grid, and the showCloud prop is not persisting.
    // startScene.showCloud = false

    this.updateActiveScene({ activeScene: startScene })
  }

  updateActiveScene = ({ activeScene }) => {
    console.log("updateActiveScene") // zzz
    console.log("activeScene", activeScene) // zzz

    if (!activeScene || !activeScene.location.name) {
      return
    }

    const map = localStateStore.getActiveMap()
    activeScene.neighborNames = this.getNeighbors({ activeScene, map })
    activeScene.showCloud = false

    // I should set to the store and not to state
    this.setState({ activeScene })
  }

  getNeighbors = ({ activeScene }) => {
    const neighbors = []
    // const neighborsArray = []

    const grid = localStateStore.getActiveMapGrid()
    console.log("grid", toJS(grid)) // zzz

    console.log("activeScene", toJS(activeScene)) // zzz

    const { coordinates } = activeScene

    // TODO: add flag for whether neighbor exists in that position
    const neighborPositions = {
      left: { row: coordinates.row - 1, col: coordinates.col },
      right: { row: coordinates.row + 1, col: coordinates.col },
      bottom: { row: coordinates.row, col: coordinates.col + 1 },
      top: { row: coordinates.row, col: coordinates.col - 1 },
    }

    const leftNeighbor = 5
    console.log("neighborPositions", toJS(neighborPositions)) // zzz

    neighbors.push(neighborPositions.top)
    neighbors.push(neighborPositions.bottom)
    neighbors.push(neighborPositions.left)
    neighbors.push(neighborPositions.right)

    activeScene.neighborPositions = neighborPositions

    const neighborNames = []

    // neighbors.forEach((neighbor) => {
    //   neighborsArray.forEach((item) => {
    //     if (item.position.x === neighbor.x && item.position.y === neighbor.y) {
    //       neighborNames.push(item.name)
    //     }
    //   })
    // })

    // console.log("neighbors", neighbors) // zzz

    return neighborNames
  }

  toggleWorldBuilder = () => {
    const showWorldBuilder = localStateStore.getShowWorldBuilder()
    const newShowWorldBuilder = !showWorldBuilder

    localStateStore.setShowWorldBuilder(newShowWorldBuilder)

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

  renderYouWinModal = () => {
    return (
      <Dialog
        isOpen={this.state.showYouWinModal}
        isCloseButtonShown={true}
        className={css.levelCompleteDialog}
      >
        <WorldPicker
          showDelete={false}
          onChangeMap={({ mapId, index }) => this.onChangeMap({ mapId, index })}
        />
        <Button
          className={css.levelCompletionButton}
          onClick={this.closeYouWinModal}
        >
          PLAY
        </Button>
      </Dialog>
    )
  }

  renderGame = () => {
    // Determine whether this is desktop or mobile
    const { className } = this.props
    const { activeScene } = this.state
    console.log("activeScene", toJS(activeScene)) // zzz

    if (!activeScene) {
      return null
    }

    return (
      <div className={`${css.main} ${className}`}>
        <div className={css.floatingButtons}>
          <WorldPicker
            showDelete={false}
            onChangeMap={({ mapId, index }) =>
              this.onChangeMap({ mapId, index })
            }
          />
        </div>
        <div className={css.body}>
          <div className={css.storyBox}>
            <PicturePage
              updateActiveScene={this.updateActiveScene}
              activeScene={activeScene}
              openYouWinModal={this.openYouWinModal}
            />
          </div>
        </div>

        {/* this is commented bc it is annoying, but I need to put it back later.... maybe */}
        {false && this.state.showYouWinModal && this.renderYouWinModal()}
      </div>
    )
  }

  render() {
    const activeMap = localStateStore.getActiveMap()

    if (!activeMap || !activeMap.data || !activeMap.data.title) {
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
