import myWords from "../Models/words.js"
import localStateStore from "../Stores/LocalStateStore/LocalStateStore.js"
import { maps } from "../Stores/InitStores.js"
import { toJS } from "mobx"

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
    const items = dbList.docs

    const filteredItems = items && items.filter(item => !item.data.ignore)
    return filteredItems || []
  }

  static getNewFrame = ({ characters }) => {
    const you = localStateStore.getYou()
    const yourName = you.name
    let allCharacters = [yourName]

    if (characters && characters.length) {
      const friendNames = characters.map(creature => creature.type)
      allCharacters.push(...friendNames)
    }

    const creatureName0 = allCharacters[0] || "creature0"
    const creatureName1 = allCharacters[1] || "creature 1"

    const newFrame = {
      creatures: allCharacters,
      story: [`${creatureName0} is happy.`],
      faces: [
        { character: creatureName1, characterIndex: 1, face: "happy" },
        { character: creatureName0, characterIndex: 0, face: "happy" }
      ],
      dialog: [
        {
          character: creatureName0,
          characterIndex: 0,
          text: `Hi.`
        },
        {
          character: creatureName1,
          characterIndex: 1,
          text: `Hi!`
        },
        {
          character: creatureName1,
          characterIndex: 0,
          text: `Hi!`
        },
        {
          character: creatureName1,
          characterIndex: 1,
          text: `Hi!`
        }
      ]
    }

    return newFrame
  }

  static sortDataByKey(data, key, order, tiebreakerKey) {
    const isAscending = order === "ASC"
    return data.sort(function(item1, item2) {
      const val1 = item1[key]
        ? item1[key]
            .toString()
            .trim()
            .toLowerCase()
        : ""
      const val2 = item2[key]
        ? item2[key]
            .toString()
            .trim()
            .toLowerCase()
        : ""
      if (val1 < val2) {
        return isAscending ? -1 : 1 // Lower if ascending
      } else if (val1 > val2) {
        return isAscending ? 1 : -1 // Higher if ascending
        // for tiebreaker
      } else if (tiebreakerKey) {
        const tiebreakerVal1 = item1[tiebreakerKey]
          ? item1[tiebreakerKey]
              .toString()
              .trim()
              .toLowerCase()
          : ""
        const tiebreakerVal2 = item2[tiebreakerKey]
          ? item2[tiebreakerKey]
              .toString()
              .trim()
              .toLowerCase()
          : ""
        if (tiebreakerVal1 < tiebreakerVal2) {
          return isAscending ? -1 : 1
        } else if (tiebreakerVal1 > tiebreakerVal2) {
          return isAscending ? 1 : -1
        }
      }
      return 0
    })
  }

  // Sorts array of objects based on the value of a deeply nested property.
  // Properties should be ordered sequentially in keys array.
  static sortDataByNestedKey({ data, keys, order }) {
    function getNestedValue(data, keys) {
      let result = data
      keys.forEach(key => (result ? (result = result[key]) : null))

      return result ? result.toString().toLowerCase() : ""
    }

    const isAscending = order === "ASC"
    return data.sort(function(item1, item2) {
      if (getNestedValue(item1, keys) < getNestedValue(item2, keys)) {
        return isAscending ? -1 : 1 // Lower if ascending
      } else if (getNestedValue(item1, keys) > getNestedValue(item2, keys)) {
        return isAscending ? 1 : -1 // Higher if ascending
      }
      return 0
    })
  }

  static getMapFromId = ({ id }) => {
    const mapsDocs = toJS(maps.docs)
    // const defaultMap = mapsDocs[0]
    const defaultMap = this.getFirstReleasedMap() || {}

    if (!id) return defaultMap

    const filteredMaps = mapsDocs.filter(map => map.data.released)
    const foundMap = filteredMaps
      ? filteredMaps.find(map => map.id === id)
      : defaultMap

    return foundMap
  }

  static getFirstReleasedMap = () => {
    const mapsDocs = toJS(maps.docs)
    const filteredMaps = mapsDocs.filter(map => {
      console.log("map.data.title", map.data.title) // zzz
      console.log("map.data.released", map.data.released) // zzz

      return map.data.released
    })
    return filteredMaps[0]
  }

  static getArrayOfScenes = ({ scenesGrid }) => {
    if (!scenesGrid) return []

    const scenes = []
    scenesGrid.forEach(row => {
      Object.values(row).forEach(scene => scenes.push(scene))
    })
    return scenes
  }

  static generateUuid() {
    const sepStr = "-"
    let date = new Date().getTime()
    const uuid = `xxxxxxxx${sepStr}xxxx${sepStr}4xxx${sepStr}yxxx${sepStr}xxxxxxxxxxxx`.replace(
      /[xy]/g,
      c => {
        const randNum = (date + Math.random() * 16) % 16 | 0
        date = Math.floor(date / 16)
        return (c === "x" ? randNum : (randNum & 0x3) | 0x8).toString(16)
      }
    )
    return uuid
  }
}
