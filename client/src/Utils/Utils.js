import myWords from "../Models/words.js";

export default class Utils {
  static removeFavorites = words =>
    words.filter(word => {
      if (word.data) {
        return !word.data.isFavorite;
      }
      return !word.isFavorite;
    });

  static getWordsByType = ({ words, type }) => {
    return words.filter(word => {
      if (word.data) {
        return word.data.type === type;
      }

      return word.type === type;
    });
  };

  static getWordsByFamily = ({ words, family }) => {
    if (!family) {
      return;
    }

    return words.filter(word => {
      if (word.data) {
        return word.data.family === family;
      }

      return word.family === family;
    });
  };

  static getWordsByFavorite = ({ words }) => {
    return words.filter(word => {
      if (word.data) {
        return word.data.isFavorite === true;
      }
      return word.isFavorite === true;
    });
  };

  static getRandomItem = ({ items }) =>
    items[Math.floor(Math.random() * items.length)];

  static unreserveItems = ({ items }) => {
    items && items.forEach(item => (item.isReserved = false));
  };

  static generateActiveScene = ({ activeScene }) => {
    // TODO
    // TODO
    // TODO
    // pack new content into activeScene

    return activeScene;
  };

  static getRandomWordByType = ({ words, type }) => {
    const output = this.getWordsByType({ words, type }).map(word => word.name);

    // output.isUsed = true;
    // need to output objects

    return this.getRandomItem({ items: output });
  };

  static reserveRandomItem = ({ items }) => {
    const freshItems = items.filter(item => !item.isUsed && !item.isReserved);

    // When all the items are used
    if (freshItems.length === 0) {
      return;
    }

    const item = this.getRandomItem({ items: freshItems });
    item.isReserved = true;
    return item;
  };

  // static getRandomItemByTypeAndUse = ({ words, type }) => {
  static getRandomItemByTypeAndUse = ({ type, returnName = true }) => {
    const { words } = myWords;

    const items = this.getWordsByType({ words, type });

    const freshItems = items.filter(item => !item.isUsed);
    // const freshItems = items.filter(item => !item.isUsed && !item.isReserved);

    // When all the items are used
    if (freshItems.length === 0) {
      return;
    }

    const item = this.getRandomItem({ items: freshItems });
    item.isReserved = true;
    return returnName ? item.name : item;
  };
}
