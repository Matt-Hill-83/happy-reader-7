import { observable, computed, action, decorate } from "mobx";

class LocalStateStore {
  page = "";
  smallMap = true;
  showWorldBuilder = false;
  // showWorldBuilder = true;
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
    console.log("this.plot", this.plot); // zzz
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
  // getActiveLocationsMap = () => this.activelocationsMap;
  // setActiveLocationsMap = activelocationsMap => {
  //   this.activelocationsMap = activelocationsMap;
  // };

  getActiveLocationsMapIndex = () => this.activeLocationsMapIndex;
  setActiveLocationsMapIndex = activeLocationsMapIndex => {
    this.activeLocationsMapIndex = activeLocationsMapIndex;
  };
}

decorate(LocalStateStore, {
  page: observable,
  plot: observable,
  smallMap: observable,
  showWorldBuilder: observable,
  locationsMaps: observable,
  activelocationsMap: observable,
  activeLocationsMapIndex: observable
});

const localStateStore = new LocalStateStore();
export default localStateStore;
