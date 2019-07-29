import { action, computed, decorate, observable, toJS } from "mobx"
import Utils from "../../Utils/Utils"

class LocalStateStore {
  page = ""
  showWorldBuilder = false
  you = {}
  plot = {}
  locationsMaps = []
  creatures = []
  locationDetails = {}
  activeLocationsMap = []
  activeLocationsMapIndex = 0
  activeMapId = null

  // getLocationDetails = () => this.locationDetails
  // setLocationDetails = locationDetails => {
  //   this.locationDetails = locationDetails
  // }

  getPage = () => this.page
  setPage = page => {
    this.page = page
  }

  getYou = () => this.you
  setYou = you => {
    this.you = you
  }

  getPlot = () => this.plot
  setPlot = plot => {
    this.plot = plot
  }

  getShowWorldBuilder = () => this.showWorldBuilder
  setShowWorldBuilder = showWorldBuilder => {
    this.showWorldBuilder = showWorldBuilder
  }

  getLocationsMaps = () => this.locationsMaps
  setLocationsMaps = locationsMaps => {
    this.locationsMaps = locationsMaps
  }

  getCreatures = () => this.creatures
  setCreatures = creatures => {
    this.creatures = creatures
  }

  getActiveMap = () => {
    const map = Utils.getMapFromId({ id: this.activeMapId })
    console.log("map", toJS(map)) // zzz

    return map
  }

  getActiveMapId = () => this.activeMapId
  setActiveMapId = activeMapId => {
    this.activeMapId = activeMapId
  }
}

decorate(LocalStateStore, {
  activelocationsMap: observable,
  activeLocationsMapIndex: observable,
  activeMapId: observable,
  creatures: observable,
  locationsMaps: observable,
  page: observable,
  plot: observable,
  showWorldBuilder: observable,
  you: observable,
  locationDetails: observable
})

const localStateStore = new LocalStateStore()
export default localStateStore
