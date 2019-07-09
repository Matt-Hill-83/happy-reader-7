import { action, computed, decorate, observable } from "mobx"

class LocalStateStore {
  page = ""
  smallMap = true
  showWorldBuilder = false
  // showWorldBuilder = true
  you = {}
  plot = {}
  locationsMaps = []
  creatures = []
  locationDetails = {}
  activeLocationsMap = []
  activeLocationsMapIndex = 0

  getLocationDetails = () => this.locationDetails
  setLocationDetails = locationDetails => {
    this.locationDetails = locationDetails
  }

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

  getsmallMap = () => this.smallMap
  setsmallMap = smallMap => {
    this.smallMap = smallMap
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

  getActiveLocationsMap = () => this.locationsMaps[this.activeLocationsMapIndex]

  incrementActiveLocationsMapIndex = () => {
    this.activeLocationsMapIndex = this.activeLocationsMapIndex + 1
  }

  getActiveLocationsMapIndex = () => this.activeLocationsMapIndex
  setActiveLocationsMapIndex = activeLocationsMapIndex => {
    this.activeLocationsMapIndex = activeLocationsMapIndex
  }

  isLastMap = () => {
    const numLocations = this.locationsMaps.length
    return this.activeLocationsMapIndex === numLocations - 1
  }

  addNewLocationsMap = newLocationsMap => {
    this.locationsMaps.push(newLocationsMap)
  }
}

decorate(LocalStateStore, {
  activelocationsMap: observable,
  activeLocationsMapIndex: observable,
  creatures: observable,
  locationsMaps: observable,
  page: observable,
  plot: observable,
  showWorldBuilder: observable,
  smallMap: observable,
  you: observable,
  locationDetails: observable
})

const localStateStore = new LocalStateStore()
export default localStateStore
