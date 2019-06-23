import { observable, computed, action, decorate } from "mobx";

class LocalStateStore {
  page = "";
  smallMap = true;
  showWorldBuilder = true;
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

  getsmallMap = () => this.smallMap;
  setsmallMap = smallMap => {
    this.smallMap = smallMap;
  };

  getShowWorldBuilder = () => this.showWorldBuilder;
  setShowWorldBuilder = showWorldBuilder => {
    this.showWorldBuilder = showWorldBuilder;
  };
}

decorate(LocalStateStore, {
  page: observable,
  smallMap: observable,
  setShowWorldBuilder: observable
});

const localStateStore = new LocalStateStore();
export default localStateStore;
