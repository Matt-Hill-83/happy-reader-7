import { observable, computed, action, decorate } from "mobx";

// generatePlot;

class LocalStateStore {
  page = "";
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
}

decorate(LocalStateStore, {
  page: observable
});

const localStateStore = new LocalStateStore();
export default localStateStore;
