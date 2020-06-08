import React from "react"
import { observer } from "mobx-react"
import { toJS } from "mobx"
import _get from "lodash.get"
import { Toaster, Position, ButtonGroup, Button } from "@blueprintjs/core"

import { maps } from "../../Stores/InitStores.js"
import { worldNameStore } from "../../Stores/FrameSetStore.js"
import localStateStore from "../../Stores/LocalStateStore/LocalStateStore.js"
import StoryMode from "../StoryMode/StoryMode"
import QuestDialog from "../QuestDialog/QuestDialog.js"
import Utils from "../../Utils/Utils"
import WorldBuilder from "../WorldBuilder/WorldBuilder.js"
import { UserConfigStore } from "../../Stores/UserConfigStore.js"

import css from "./MainStory.module.scss"
import BookPicker from "../BookPicker/BookPicker.js"

let isProdRelease
isProdRelease = true
isProdRelease = false

let SHOW_BOOK_PICKER
SHOW_BOOK_PICKER = true
SHOW_BOOK_PICKER = false

let useDefaultWorldId
useDefaultWorldId = false
useDefaultWorldId = true
const defaultWorldId = "Kx78cfHCkhpm2NQnmCp8"

let SHOW_WORLD_BUILDER
// SHOW_WORLD_BUILDER = true
SHOW_WORLD_BUILDER = false

const toaster = Toaster.create({
  position: Position.TOP,
})

class MainStory extends React.Component {
  state = {
    activeScene: undefined,
    showYouWinModal: isProdRelease,
    showBookPicker: true,
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

      if (useDefaultWorldId) {
        // if (!isProdRelease && useDefaultWorldId) {
        localStateStore.setActiveMapId(defaultWorldId)
      } else {
        localStateStore.setActiveMapId(mapId)
      }
    }

    localStateStore.setShowBookPicker(SHOW_BOOK_PICKER)

    if (SHOW_WORLD_BUILDER) {
      this.toggleWorldBuilder()
    } else {
      await this.init()
    }
  }

  init = async () => {
    // Utils.getFirstReleasedMap()
    const savedMaps = Utils.getItemsFromDbObj({ dbList: maps })
    const filteredMaps = savedMaps.filter((map) => map.data.released)

    // TODO - I need to get maps by id, not by index, because I'm filtering them.
    filteredMaps.forEach((map) => {
      const {
        data: { gridDimensions, newGrid5 },
      } = map

      const grid = Utils.reCreateGridFromCondensedGrid({
        gridDimensions,
        maxDimensions: { numRows: 8, numCols: 12 },
        newGrid5,
      })

      map.data.grid = grid
    })

    localStateStore.setShowWorldBuilder(SHOW_WORLD_BUILDER)
    if (SHOW_WORLD_BUILDER) return
    const mapId = localStateStore.getActiveWorldId()
    this.onChangeWorld({ mapId })
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

    const hideMissionConsole = localStateStore.getQuestStatus()
      .hideMissionConsole

    if (!hideMissionConsole) {
      this.updateQuestStatus({ sceneId })
    }
  }

  updateQuestStatus = () => {
    toaster.clear()
    const activeScene = localStateStore.getActiveScene()
    console.log("activeScene", toJS(activeScene)) // zzz

    const { items = [], characters = [], location } = activeScene

    const { foundItem, completedMission } = localStateStore.updateQuestState({
      itemsInScene: items,
      charactersInScene: [...characters, ...items, location],
    })

    if (foundItem) {
      console.log("foundItem", toJS(foundItem)) // zzz
      const message = (
        <div>
          <span>{`You find a ${foundItem.name}.`}</span>
          <br />
          <span>{`You put the ${foundItem.name} in your pocket.`}</span>
        </div>
      )
      toaster.show({ message, className: css.toaster, timeout: 30000 })
    }

    console.log("completedMission", toJS(completedMission)) // zzz
    if (completedMission) {
      const { rewards, item, recipient, name } = completedMission

      const reward = rewards[0]
      const message = `You give the  ${item.name} to the ${recipient.name}.`

      const message2 = (
        <div>
          <span>{`Good Job!`}</span>
          <br />
          <span>{`Mission Complete: "${name}".`}</span>
          <br />
          <span>{`You win: ${reward.amount}  ${reward.name}.`}</span>
        </div>
      )
      toaster.show({
        message: message2,
        className: css.toaster,
        timeout: 30000,
      })
      toaster.show({ message, className: css.toaster, timeout: 30000 })
    }

    this.setState({ dummy: new Date() })
  }

  onChangeWorld = ({ mapId }) => {
    console.log("onChangeWorld") // zzz
    console.log("onChangeWorld") // zzz
    console.log("mapId", mapId)

    localStateStore.setActiveMapId(mapId)
    const map = localStateStore.getActiveWorld()
    const { questConfig } = map.data

    if (questConfig) {
      const clonedQuestConfig = JSON.parse(JSON.stringify(questConfig))

      const combinedPockets = localStateStore.addToPockets({
        newPockets: clonedQuestConfig.pockets,
      })
      console.log("combinedPockets", toJS(combinedPockets)) // zzz

      localStateStore.setQuestStatus({
        activeMission: 0,
        pockets: combinedPockets,
        questConfig: clonedQuestConfig,
      })
    } else {
      localStateStore.setQuestStatus({
        activeMission: 0,
        hideMissionConsole: true,
      })
    }
    localStateStore.setShowBookPicker(false)

    this.setState({ showYouWinModal: false })
    this.initWorld()
  }

  toggleWorldBuilder = () => {
    const showWorldBuilder = localStateStore.getShowWorldBuilder()
    const newShowWorldBuilder = !showWorldBuilder

    localStateStore.setShowWorldBuilder(newShowWorldBuilder)

    if (newShowWorldBuilder === false) {
      this.init()
    }
  }

  toggleBookPicker = () => {
    const test = localStateStore.getShowBookPicker()
    console.log("test", toJS(test)) // zzz

    localStateStore.setShowBookPicker(!test)
    const test2 = localStateStore.getShowBookPicker()
    console.log("test2", toJS(test2)) // zzz
  }

  closeBookPicker = () => {
    localStateStore.setShowBookPicker(false)
  }

  closeYouWinModal = () => {
    this.setState({ showYouWinModal: false })
  }

  openYouWinModal = () => {
    this.setState({ showYouWinModal: true })
  }

  renderWorldPicker = () => {
    const { showProd, showYouWinModal } = this.state

    return (
      <QuestDialog
        showProd={showProd}
        closeYouWinModal={this.closeYouWinModal}
        showYouWinModal={showYouWinModal}
        onChangeWorld={this.onChangeWorld}
      />
    )
  }

  renderBookPicker = () => {
    // const { showProd, showYouWinModal } = this.state

    return (
      <BookPicker
        closeYouWinModal={this.closeBookPicker}
        onChangeWorld={this.onChangeWorld}
      />
    )
  }

  renderButtons = () => {
    const isProdRelease = localStateStore.getIsProdRelease()

    return (
      <div className={css.floatingButtons}>
        <ButtonGroup color="primary">
          {!isProdRelease && (
            <Button onClick={this.toggleWorldBuilder}>World Builder</Button>
          )}
          <Button onClick={this.openYouWinModal}>Pick a Single Quest...</Button>
          <Button onClick={this.toggleBookPicker}>
            Pick a Book of Quests...
          </Button>
        </ButtonGroup>
      </div>
    )
  }

  render() {
    const { className } = this.props
    const activeWorld = localStateStore.getActiveWorld()

    const showWorldBuilder = localStateStore.getShowWorldBuilder()

    if (showWorldBuilder) {
      return (
        <div className={`${css.main} ${className}`}>
          {showWorldBuilder && <WorldBuilder />}
          {this.renderButtons()}
        </div>
      )
    }

    if (!activeWorld || !activeWorld.data || !activeWorld.data.title) {
      return null
    }

    const activeScene = localStateStore.getActiveScene()
    if (!activeScene) {
      return null
    }

    const showBookPicker = localStateStore.getShowBookPicker()

    return (
      <div className={`${css.main} ${className}`}>
        {this.renderButtons()}
        <StoryMode
          updateActiveScene={this.updateActiveScene}
          activeScene={activeScene}
          openYouWinModal={this.openYouWinModal}
        />
        {showBookPicker && this.renderBookPicker()}
        {this.state.showYouWinModal && this.renderWorldPicker()}
      </div>
    )
  }
}

export default observer(MainStory)
