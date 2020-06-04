import { decorate, observable, toJS } from "mobx"
import Utils from "../../Utils/Utils"

class LocalStateStore {
  page = ""
  showWorldBuilder = false
  you = {}
  plot = {}
  maps = []
  creatures = []
  locationDetails = {}
  activeLocationsMap = []
  mapBuilderGrid = []
  activeMapId = null
  activeFrameIndex = 0
  activeSceneId = null
  test = null

  _defaultQuestStatus = {
    activeMission: 0,
    pockets: { top: { amount: 1 } },
    questConfig: {
      // pockets: { top: { amount: 1 } },
      missions: [
        {
          name: "Feed Piggy",
          rewards: [{ name: "gold", amount: 1 }],
          item: { name: "bun" },
          recipient: { name: "pig" },
        },
        {
          name: "Bring Piggy Home",
          rewards: [{ name: "gold", amount: 5 }],
          item: { name: "pig" },
          recipient: { name: "troll" },
        },
      ],
    },
  }

  questStatus = { ...this._defaultQuestStatus }

  getQuestNames = () => this.questStatus.quests.map((item) => item.name)

  getQuestStatus = () => this.questStatus
  setQuestStatus = (questStatus) => {
    this.questStatus = questStatus
  }

  setQuestStatusToDefault = () => {
    this.questStatus = { ...this._defaultQuestStatus }
  }

  getDesiredItem = () => {
    const activeMission = this.getActiveMission()
    if (!activeMission) {
      return null
    }
    return activeMission.item
  }

  getActiveMission = () => {
    const { missions } = this.questStatus.questConfig
    return missions[this.questStatus.activeMission] || null
  }

  getDesiredRecipient = () => {
    const activeMission = this.getActiveMission()
    if (!activeMission) {
      return null
    }
    return activeMission.recipient
  }

  addToPockets = ({ newPockets }) => {
    const existingPockets = this.getQuestStatus().pockets || {}
    for (const newPocketName in newPockets) {
      const newPocket = newPockets[newPocketName]
      const existingItemWithSameName = existingPockets[newPocketName]

      if (existingItemWithSameName) {
        existingItemWithSameName.amount =
          existingItemWithSameName.amount + newPocket.amount
      } else {
        existingPockets[newPocketName] = {
          amount: newPocket.amount,
        }
      }
    }
    return existingPockets
  }

  updateQuestState = ({ itemsInScene, charactersInScene }) => {
    const questStatus = this.questStatus
    console.log("questStatus--------------LSS----->>>", toJS(questStatus)) // zzz

    console.log("questStatus", toJS(questStatus)) // zzz
    if (!questStatus.questConfig) {
      return null
    }
    const { missions } = questStatus.questConfig

    if (!missions) {
      return null
    }

    const activeMission = missions[questStatus.activeMission] || null
    if (!activeMission) {
      return {}
    }

    const completedMission = this._completeMission({
      charactersInScene,
      questStatus,
    })

    if (completedMission) {
      activeMission.completed = true
      questStatus.activeMission++

      this.setQuestStatus(questStatus)
    }

    const foundItem = this._findItem({ itemsInScene })
    return { foundItem, completedMission }
  }

  _isDesiredItemInPocket = ({ desiredItem, pockets }) => {
    console.log("_isDesiredItemInPocket") // zzz

    console.log("pockets", toJS(pockets)) // zzz

    const itemsInPockets = Object.keys(pockets)
    console.log(
      "itemsInPockets===========================>>>",
      toJS(itemsInPockets)
    ) // zzz
    console.log("desiredItem", toJS(desiredItem)) // zzz

    return itemsInPockets.includes(desiredItem.name)
  }

  _isDesiredRecipientHere = ({ desiredRecipient, charactersInScene }) => {
    const characterNames = charactersInScene.map((item) => item.name)

    console.log("characterNames=>>", toJS(characterNames)) // zzz
    console.log("desiredRecipient.name", toJS(desiredRecipient.name)) // zzz

    return characterNames.includes(desiredRecipient.name)
  }

  _completeMission = ({ charactersInScene }) => {
    const desiredItem = this.getDesiredItem({})
    const desiredRecipient = this.getDesiredRecipient({})

    const { pockets = {} } = this.questStatus

    const isDesiredItemInPocket = this._isDesiredItemInPocket({
      desiredItem,
      pockets,
    })

    const isDesiredRecipientHere = this._isDesiredRecipientHere({
      desiredRecipient,
      charactersInScene,
    })

    console.log("isDesiredRecipientHere", toJS(isDesiredRecipientHere)) // zzz
    console.log("isDesiredItemInPocket", toJS(isDesiredItemInPocket)) // zzz
    console.log("pockets", toJS(pockets)) // zzz

    return isDesiredRecipientHere && isDesiredItemInPocket
  }

  _findItem = ({ itemsInScene }) => {
    const desiredItem = this.getDesiredItem({})
    const questStatus = this.questStatus

    const { pockets = {} } = questStatus

    console.log("itemsInScene", toJS(itemsInScene)) // zzz
    console.log("desiredItem.name", toJS(desiredItem.name)) // zzz

    const foundItem =
      itemsInScene.find((item) => item.name === desiredItem.name) || null

    if (!foundItem) {
      return null
    }

    if (!foundItem.amount) {
      foundItem.amount = 1
    }

    const itemsInPockets = pockets[foundItem.name]

    if (itemsInPockets) {
      itemsInPockets.amount = itemsInPockets.amount + foundItem.amount
    } else {
      pockets[foundItem.name] = { amount: foundItem.amount }
    }
    console.log("pockets", toJS(pockets)) // zzz

    this.setQuestStatus(questStatus)
    return foundItem
  }

  getQuestItems = () => {
    const questItems = []
    this.questStatus.questConfig.missions.forEach((mission) => {
      questItems.push(...mission.items)
    })
    return questItems
  }

  getQuestRewards = () => {
    const questItems = []
    this.questStatus.questConfig.missions.forEach((mission) => {
      questItems.push(...mission.rewards)
    })
    return questItems
  }

  getYou = () => this.you
  setYou = (you) => {
    this.you = you
  }

  getWorldBuilderScenesGrid = () => this.mapBuilderGrid
  setWorldBuilderScenesGrid = (mapBuilderGrid) => {
    this.mapBuilderGrid = mapBuilderGrid
  }

  getWorldBuilderWorld = () => this.mapBuilderWorld
  setWorldBuilderWorld = (mapBuilderWorld) => {
    this.mapBuilderWorld = mapBuilderWorld
  }

  getShowWorldBuilder = () => this.showWorldBuilder
  setShowWorldBuilder = (showWorldBuilder) => {
    this.showWorldBuilder = showWorldBuilder
  }

  getActiveWorld = () => {
    const world = Utils.getMapFromId({ id: this.activeMapId })
    return world
  }

  getActiveWorldGrid = () => {
    const map = Utils.getMapFromId({ id: this.activeMapId })
    return map.data.newGrid5 || []
  }

  getActiveWorldId = () => this.activeMapId
  setActiveMapId = (activeMapId) => {
    this.activeMapId = activeMapId
  }

  getIsProdRelease = () => this.isProdRelease
  setIsProdRelease = (isProdRelease) => {
    this.isProdRelease = isProdRelease
  }

  getActiveFrameIndex = () => this.activeFrameIndex
  setActiveFrameIndex = (activeFrameIndex) => {
    this.activeFrameIndex = activeFrameIndex
  }

  incrementActiveFrameIndex = (reset) => {
    let newIndex

    if (reset) {
      newIndex = 0
    } else {
      newIndex = this.getActiveFrameIndex() + 1
    }

    this.setActiveFrameIndex(newIndex)
  }

  getActiveSceneId = () => this.activeSceneId
  setActiveSceneId = (activeSceneId) => {
    this.activeSceneId = activeSceneId
  }

  getActiveScene = () => {
    const activeSceneId = this.getActiveSceneId()
    const scenesGrid = this.getActiveWorldGrid()

    const activeScene = scenesGrid.find((item) => item.id === activeSceneId)
    return activeScene
  }
}

decorate(LocalStateStore, {
  activeMapId: observable,
  creatures: observable,
  maps: observable,
  mapBuilderGrid: observable,
  mapBuilderWorld: observable,
  page: observable,
  plot: observable,
  showWorldBuilder: observable,
  you: observable,
  locationDetails: observable,
  activeFrameIndex: observable,
  activeSceneId: observable,
  questStatus: observable,
  test: observable,
})

const localStateStore = new LocalStateStore()
export default localStateStore
