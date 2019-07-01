import { observable, computed, action, decorate } from "mobx";

class LocalStateStore {
  page = "";
  smallMap = true;
  // showWorldBuilder = false;
  showWorldBuilder = true;
  you = {};
  plot = {};
  locationsMaps = [];
  activeLocationsMap = [];
  // activeLocationsMapIndex = 1;
  activeLocationsMapIndex = 0;

  getPage = () => this.page;
  setPage = page => {
    this.page = page;
  };

  getYou = () => this.you;
  setYou = you => {
    this.you = you;
  };

  getPlot = () => this.plot;
  setPlot = plot => {
    this.plot = plot;
  };

  getsmallMap = () => this.smallMap;
  setsmallMap = smallMap => {
    this.smallMap = smallMap;
  };

  getShowWorldBuilder = () => this.showWorldBuilder;
  setShowWorldBuilder = showWorldBuilder => {
    this.showWorldBuilder = showWorldBuilder;
  };

  getLocationsMaps = () => this.locationsMaps;
  setLocationsMaps = locationsMaps => {
    this.locationsMaps = locationsMaps;
  };

  getActiveLocationsMap = () =>
    this.locationsMaps[this.activeLocationsMapIndex];

  incrementActiveLocationsMapIndex = () => {
    this.activeLocationsMapIndex = this.activeLocationsMapIndex + 1;
  };

  getActiveLocationsMapIndex = () => this.activeLocationsMapIndex;
  setActiveLocationsMapIndex = activeLocationsMapIndex => {
    this.activeLocationsMapIndex = activeLocationsMapIndex;
  };

  addNewLocationsMap = newLocationsMap => {
    this.locationsMaps.push(newLocationsMap);
  };
}

decorate(LocalStateStore, {
  activelocationsMap: observable,
  activeLocationsMapIndex: observable,
  locationsMaps: observable,
  page: observable,
  plot: observable,
  showWorldBuilder: observable,
  smallMap: observable,
  you: observable
});

const localStateStore = new LocalStateStore();
export default localStateStore;
