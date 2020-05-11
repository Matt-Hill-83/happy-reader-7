import React from "react"
import { observer } from "mobx-react"
import { toJS } from "mobx"
import _get from "lodash.get"

import { Button, Dialog } from "@blueprintjs/core"

import { maps } from "../../Stores/InitStores.js"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js"
import PicturePage from "../PicturePage/PicturePage"
import Utils from "../../Utils/Utils"
import WorldBuilder from "../WorldBuilder/WorldBuilder.js"
import QuestDialog from "../QuestDialog/QuestDialog.js"

import css from "./MainStory.module.scss"
import { worldNameStore } from "../../Stores/FrameSetStore.js"

let isProdRelease
isProdRelease = false
isProdRelease = true

let SHOW_WORLD_BUILDER
SHOW_WORLD_BUILDER = true
SHOW_WORLD_BUILDER = false

class MainStory extends React.Component {
  state = {
    activeScene: undefined,
    showYouWinModal: false,
  }

  async componentWillMount() {
    localStateStore.setIsProdRelease(isProdRelease)

    // I need to make these stores shared singletons
    //  Move these to App.js
    await maps.fetch()
    // This needs to be here or WorldBuilder won't work.
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
    const map = localStateStore.getActiveWorld()

    const startScene2 = map.data.startScene
    const endScene2 = map.data.endScene

    const scenesGrid = _get(map, "data.newGrid5") || []

    const endScene = scenesGrid.find((item) => item.id === map.data.endSceneId)
    const startScene = scenesGrid.find(
      (item) => item.id === map.data.startSceneId
    )

    const terminalScene = start ? startScene : endScene

    const firstScene = scenesGrid[0]
    const lastScene = scenesGrid[scenesGrid.length - 1]

    // If no start and finish scenes are marked, choose some, so the program doesn't break
    return terminalScene || (start ? firstScene : lastScene)
  }

  initWorld = async () => {
    const startScene = this.getTerminalScene({})
    if (!startScene) return

    this.updateActiveScene({ sceneId: startScene.id })
  }

  updateActiveScene = ({ sceneId }) => {
    localStateStore.setActiveSceneId(sceneId)
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

  onChangeWorld = ({ mapId }) => {
    localStateStore.setActiveMapId(mapId)

    this.initWorld()
  }

  renderYouWinModal = () => {
    const { showYouWinModal } = this.state

    return (
      <QuestDialog
        closeYouWinModal={this.closeYouWinModal}
        showYouWinModal={showYouWinModal}
        onChangeWorld={this.onChangeWorld}
      ></QuestDialog>
    )
  }

  renderGame = () => {
    // Determine whether this is desktop or mobile
    const { className } = this.props
    const activeScene = localStateStore.getActiveScene()

    if (!activeScene) {
      return null
    }

    return (
      <div className={`${css.main} ${className}`}>
        <div className={css.floatingButtons}>
          {/* <WorldPicker
            showDelete={false}
            onChangeWorld={({ mapId, index }) =>
              this.onChangeWorld({ mapId, index })
            }
          /> */}
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

        {this.state.showYouWinModal && this.renderYouWinModal()}
      </div>
    )
  }

  render() {
    const activeWorld = localStateStore.getActiveWorld()

    if (!activeWorld || !activeWorld.data || !activeWorld.data.title) {
      return null
    }

    const showWorldBuilder = localStateStore.getShowWorldBuilder()
    const { className } = this.props

    const renderWorldBuilderButton = (
      <div
        tabIndex={0}
        className={css.toggleWorldBuilder}
        onClick={this.toggleWorldBuilder}
      >
        <span> MAP EDITOR </span>
      </div>
    )

    console.log("activeWorld------------------", toJS(activeWorld)) // zzz

    const renderWorldName = (
      <div tabIndex={0} className={css.renderWorldName}>
        <span> {activeWorld.data.title} </span>
      </div>
    )
    const renderNewGameButton = (
      <div
        tabIndex={0}
        className={css.toggleNewGame}
        onClick={this.openYouWinModal}
      >
        <span> New Game </span>
      </div>
    )

    return (
      <div className={`${css.main} ${className}`}>
        {renderWorldBuilderButton}
        {renderNewGameButton}
        {renderWorldName}
        {showWorldBuilder && <WorldBuilder />}
        {!showWorldBuilder && this.renderGame()}
      </div>
    )
  }
}

export default observer(MainStory)
