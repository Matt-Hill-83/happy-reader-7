import { observable, computed, action, decorate } from "mobx";

class LocalStateStore {
  page = "page1";

  setPage = page => {
    this.page = page;
  };

  getPage = () => {
    return this.page;
  };
}

decorate(LocalStateStore, {
  page: observable
});

const localStateStore = new LocalStateStore();
export default localStateStore;
