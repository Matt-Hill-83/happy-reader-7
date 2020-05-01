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
  activeMapId = null

  getYou = () => this.you
  setYou = (you) => {
    this.you = you
  }

  getPlot = () => this.plot
  setPlot = (plot) => {
    this.plot = plot
  }

  getShowWorldBuilder = () => this.showWorldBuilder
  setShowWorldBuilder = (showWorldBuilder) => {
    this.showWorldBuilder = showWorldBuilder
  }

  // getMaps = () => this.maps
  setMaps = (maps) => {
    this.maps = maps
  }

  getCreatures = () => this.creatures
  setCreatures = (creatures) => {
    this.creatures = creatures
  }

  getActiveMap = () => {
    const map = Utils.getMapFromId({ id: this.activeMapId })
    return map
  }

  getActiveMapId = () => this.activeMapId
  setActiveMapId = (activeMapId) => {
    this.activeMapId = activeMapId
  }

  getActiveSceneId = () => this.activeSceneId
  setActiveSceneId = (activeSceneId) => {
    this.activeSceneId = activeSceneId
  }
}

decorate(LocalStateStore, {
  activeMapId: observable,
  creatures: observable,
  maps: observable,
  page: observable,
  plot: observable,
  showWorldBuilder: observable,
  you: observable,
  locationDetails: observable,
})

const localStateStore = new LocalStateStore()
export default localStateStore
