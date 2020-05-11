import React from "react"
import { observer } from "mobx-react"
import { toJS } from "mobx"
import _get from "lodash.get"
import { ButtonGroup, Button } from "@blueprintjs/core"

import { maps } from "../../Stores/InitStores.js"
import { worldNameStore } from "../../Stores/FrameSetStore.js"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js"
import PicturePage from "../PicturePage/PicturePage"
import QuestDialog from "../QuestDialog/QuestDialog.js"
import Utils from "../../Utils/Utils"
import WorldBuilder from "../WorldBuilder/WorldBuilder.js"

import css from "./MainStory.module.scss"

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

  // toggleShowProd = () => {
  //   this.setState({ showProd: !this.state.showProd })
  // }

  onChangeWorld = ({ mapId }) => {
    localStateStore.setActiveMapId(mapId)

    this.initWorld()
  }

  renderYouWinModal = () => {
    const { showProd, showYouWinModal } = this.state

    return (
      <QuestDialog
        showProd={showProd}
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
        <div className={css.body}>
          <div className={css.storyBox}>
            <PicturePage
              updateActiveScene={this.updateActiveScene}
              activeScene={activeScene}
              openYouWinModal={this.openYouWinModal}
            />
          </div>
        </div>
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

    console.log("activeWorld------------------", toJS(activeWorld)) // zzz

    const renderWorldName = (
      <div tabIndex={0} className={css.worldTitle}>
        <span> {activeWorld.data.title} </span>
      </div>
    )

    return (
      <div className={`${css.main} ${className}`}>
        <div className={css.floatingButtons}>
          <ButtonGroup
            color="primary"
            aria-label="outlined primary button group"
          >
            <Button onClick={this.openYouWinModal}>New Game</Button>
            <Button onClick={this.toggleWorldBuilder}>World Builder</Button>
          </ButtonGroup>
        </div>
        {renderWorldName}
        {showWorldBuilder && <WorldBuilder />}
        {!showWorldBuilder && this.renderGame()}
        {this.state.showYouWinModal && this.renderYouWinModal()}
      </div>
    )
  }
}

export default observer(MainStory)
