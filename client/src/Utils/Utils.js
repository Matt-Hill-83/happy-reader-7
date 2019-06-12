import myWords from "../Models/words.js";

// These should have getters and setters
const { words, wordTypes } = myWords;

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

  static getRandomWordByType = ({ words, type }) => {
    const output = this.getWordsByType({ words, type }).map(word => word.name);

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

  static getRandomItemByTypeAndUse = ({ type, returnName = true }) => {
    const { words } = myWords;

    const items = this.getWordsByType({ words, type });

    const freshItems = items.filter(item => !item.isUsed);

    // When all the items are used
    if (freshItems.length === 0) {
      return;
    }

    const item = this.getRandomItem({ items: freshItems });
    item.isReserved = true;
    item.isUsed = true;
    return returnName ? item.name : item;
  };

  static getRandomItemByTypeAndReserve = ({ type, returnName = true }) => {
    const { words } = myWords;

    const items = this.getWordsByType({ words, type });

    const freshItems = items.filter(item => !item.isUsed && !item.isReserved);

    // When all the items are used
    if (freshItems.length === 0) {
      return;
    }

    const item = this.getRandomItem({ items: freshItems });
    item.isReserved = true;
    return returnName ? item.name : item;
  };

  static generateScenes = () => {
    const locations = {
      tree: { creatures: ["elf"], name: "tree" },
      stump: { creatures: ["elf"], name: "stump" },
      castle: { creatures: ["elf"], name: "castle" },
      waterfall: { creatures: ["elf"], name: "waterfall" },
      bees: { creatures: ["elf"], name: "bees" },
      swamp: { creatures: ["elf"], name: "swamp" },
      house: { creatures: ["elf"], name: "house" },
      lake: { creatures: ["elf"], name: "lake" },
      barn: { creatures: ["elf"], name: "barn" }
    };

    // return locations;

    const locationsList =
      Utils.getWordsByType({ words, type: wordTypes.location }) || [];

    return locationsList.map(location => {
      return { location: location.name };
    });
  };
}
