import myWords from "../Models/words.js"
import localStateStore from "../Stores/LocalStateStore/LocalStateStore.js"

// These should have getters and setters
const { words, wordTypes } = myWords

export default class Utils {
  static getCreatureByType = ({ type }) => {
    const allCreatures = localStateStore.getCreatures()

    return allCreatures.find(creature => creature.type === type)
  }

  static removeFavorites = words =>
    words.filter(word => {
      if (word.data) {
        return !word.data.isFavorite
      }
      return !word.isFavorite
    })

  static getWordsByType = ({ words, type, returnName = false }) => {
    const items = words.filter(word => {
      if (word.data) {
        return word.data.type === type
      }

      return word.type === type
    })

    if (returnName) {
      return items.map(item => item.name)
    } else {
      return items
    }
  }

  static getWordsByFamily = ({ words, family }) => {
    if (!family) {
      return
    }

    return words.filter(word => {
      if (word.data) {
        return word.data.family === family
      }

      return word.family === family
    })
  }

  static getWordsByFavorite = ({ words }) => {
    return words.filter(word => {
      if (word.data) {
        return word.data.isFavorite === true
      }
      return word.isFavorite === true
    })
  }

  static getRandomItem = ({ items }) =>
    items[Math.floor(Math.random() * items.length)]

  static unreserveItems = ({ items }) => {
    items && items.forEach(item => (item.isReserved = false))
  }

  static getRandomWordByType = ({ words, type }) => {
    const output = this.getWordsByType({ words, type }).map(word => word.name)

    return this.getRandomItem({ items: output })
  }

  static reserveRandomItem = ({ items }) => {
    const freshItems = items.filter(item => !item.isUsed && !item.isReserved)

    // When all the items are used
    if (freshItems.length === 0) {
      return
    }

    const item = this.getRandomItem({ items: freshItems })
    item.isReserved = true
    return item
  }

  static getRandomItemByTypeAndUse = ({ type, returnName = true }) => {
    const { words } = myWords

    const items = this.getWordsByType({ words, type })

    const freshItems = items.filter(item => !item.isUsed)

    // When all the items are used
    if (freshItems.length === 0) {
      return
    }

    const item = this.getRandomItem({ items: freshItems })
    item.isReserved = true
    item.isUsed = true
    return returnName ? item.name : item
  }

  static getRandomItemByTypeAndReserve = ({ type, returnName = true }) => {
    const { words } = myWords

    const items = this.getWordsByType({ words, type })

    const freshItems = items.filter(item => !item.isUsed && !item.isReserved)

    // When all the items are used
    if (freshItems.length === 0) {
      return
    }

    const item = this.getRandomItem({ items: freshItems })
    item.isReserved = true
    return returnName ? item.name : item
  }

  static getItemsFromDbObj = ({ dbList }) => {
    // const items = dbList.docs.map(map => map.data)
    const items = dbList.docs

    const filteredItems = items && items.filter(item => !item.data.ignore)
    return filteredItems || []
  }

  static getGridFromMap = ({ map }) => {
    return JSON.parse(map.data.scenesGrid)
    // return (map.data.grid = JSON.parse(map.data.scenesGrid))
  }
}
