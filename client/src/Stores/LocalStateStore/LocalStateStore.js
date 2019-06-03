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
    console.log("you", you); // zzz

    this.you = you;
  };

  getPlot = () => this.plot;
  setPlot = plot => {
    console.log("plot", plot); // zzz

    this.plot = plot;
  };
}

decorate(LocalStateStore, {
  page: observable
});

const localStateStore = new LocalStateStore();
export default localStateStore;
