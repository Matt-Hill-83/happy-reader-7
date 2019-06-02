import { observable, computed, action, decorate } from "mobx";

class LocalStateStore {
  page = "";
  you = {};

  setPage = page => {
    this.page = page;
  };

  getPage = () => this.page;

  setYou = you => {
    this.you = you;
  };

  getYou = () => this.you;
}

decorate(LocalStateStore, {
  page: observable
});

const localStateStore = new LocalStateStore();
export default localStateStore;
