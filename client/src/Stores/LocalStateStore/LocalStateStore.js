import { observable, computed, action, decorate } from "mobx";

class LocalStateStore {
  page = "";
  smallMap = true;
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
}

decorate(LocalStateStore, {
  page: observable,
  smallMap: observable
});

const localStateStore = new LocalStateStore();
export default localStateStore;
