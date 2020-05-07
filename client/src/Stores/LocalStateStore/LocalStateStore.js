import { action, computed, decorate, observable, toJS } from "mobx"
import Utils from "../../Utils/Utils"

class LocalStateStore {
  page = ""
  showWorldBuilder = false
  you = {}
  plot = {}
  maps = []
  creatures = []
  locationDetails = {}
  activeLocationsMap = []
  mapBuilderGrid = []
  activeMapId = null
  activeFrameIndex = 0

  getYou = () => this.you
  setYou = (you) => {
    this.you = you
  }

  getWorldBuilderScenesGrid = () => this.mapBuilderGrid
  setWorldBuilderScenesGrid = (mapBuilderGrid) => {
    this.mapBuilderGrid = mapBuilderGrid
  }

  getWorldBuilderWorld = () => this.mapBuilderWorld
  setWorldBuilderWorld = (mapBuilderWorld) => {
    this.mapBuilderWorld = mapBuilderWorld
  }

  getShowWorldBuilder = () => this.showWorldBuilder
  setShowWorldBuilder = (showWorldBuilder) => {
    this.showWorldBuilder = showWorldBuilder
  }

  getActiveMap = () => {
    const map = Utils.getMapFromId({ id: this.activeMapId })
    return map
  }

  getActiveMapGrid = () => {
    const map = Utils.getMapFromId({ id: this.activeMapId })
    return map.data.newGrid5 || []
  }

  getActiveMapId = () => this.activeMapId
  setActiveMapId = (activeMapId) => {
    this.activeMapId = activeMapId
  }

  getActiveFrameIndex = () => this.activeFrameIndex
  setActiveFrameIndex = (activeFrameIndex) => {
    this.activeFrameIndex = activeFrameIndex
  }

  getActiveSceneId = () => this.activeSceneId
  setActiveSceneId = (activeSceneId) => {
    this.activeSceneId = activeSceneId
  }

  getActiveScene = () => {
    const activeSceneId = this.getActiveSceneId()
    console.log("activeSceneId", toJS(activeSceneId)) // zzz

    const scenesGrid = this.getActiveMapGrid()
    const activeScene = scenesGrid.find((item) => item.id === activeSceneId)
    console.log("activeScene", toJS(activeScene)) // zzz
    return activeScene
  }
}

decorate(LocalStateStore, {
  activeMapId: observable,
  creatures: observable,
  maps: observable,
  mapBuilderGrid: observable,
  mapBuilderWorld: observable,
  page: observable,
  plot: observable,
  showWorldBuilder: observable,
  you: observable,
  locationDetails: observable,
  activeFrameIndex: observable,
})

const localStateStore = new LocalStateStore()
export default localStateStore
