import { observable, computed, action, decorate } from "mobx";

class LocalStateStore {
  page = "";
  showMap = true;
  you = {};
  plot = {};

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

  getShowMap = () => this.showMap;
  setShowMap = showMap => {
    this.showMap = showMap;
  };
}

decorate(LocalStateStore, {
  page: observable,
  showMap: observable
});

const localStateStore = new LocalStateStore();
export default localStateStore;
