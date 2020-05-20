import React from "react"
import { observer } from "mobx-react"
import { toJS } from "mobx"
import _get from "lodash.get"
import { ButtonGroup, Button } from "@blueprintjs/core"

import { maps } from "../../Stores/InitStores.js"
import { worldNameStore } from "../../Stores/FrameSetStore.js"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js"
import StoryMode from "../StoryMode/StoryMode"
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
    localStateStore.setActiveFrameIndex(0)
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
    this.setState({ showYouWinModal: false })

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

  renderButtons = () => {
    return (
      <div className={css.floatingButtons}>
        <ButtonGroup color="primary">
          <Button onClick={this.toggleWorldBuilder}>World Builder</Button>
          <Button onClick={this.openYouWinModal}>Quests</Button>
        </ButtonGroup>
      </div>
    )
  }

  render() {
    const { className } = this.props
    const activeWorld = localStateStore.getActiveWorld()
    console.log("activeWorld", toJS(activeWorld)) // zzz

    const showWorldBuilder = localStateStore.getShowWorldBuilder()

    if (!activeWorld || !activeWorld.data || !activeWorld.data.title) {
      return null
    }
    console.log("activeWorld.id", toJS(activeWorld.id)) // zzz

    const activeScene = localStateStore.getActiveScene()
    if (!activeScene) {
      return null
    }

    return (
      <div className={`${css.main} ${className}`}>
        {showWorldBuilder && <WorldBuilder />}

        {this.renderButtons()}
        {!showWorldBuilder && (
          <StoryMode
            updateActiveScene={this.updateActiveScene}
            activeScene={activeScene}
            openYouWinModal={this.openYouWinModal}
          />
        )}
        {this.state.showYouWinModal && this.renderYouWinModal()}
      </div>
    )
  }
}

export default observer(MainStory)
