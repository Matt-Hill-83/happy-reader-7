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
    questConfig: {
      pockets: { top: { amount: 1 } },
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
    // activeMission.completed = true

    const desiredItem = activeMission.item
    const desiredRecipient = activeMission.recipient
    console.log("itemsInScene", toJS(itemsInScene)) // zzz

    const foundItem = this._findItem({ itemsInScene, desiredItem, questStatus })
    const completedMission = this._completeMission({
      charactersInScene,
      desiredItem,
      desiredRecipient,
      questStatus,
    })

    return { foundItem, completedMission: this.questStatus.activeMission }
  }

  _isDesiredItemInPocket = ({ desiredItem, pockets }) => {
    const itemsInPockets = Object.keys(pockets)
    console.log(
      "itemsInPockets===========================>>>",
      toJS(itemsInPockets)
    ) // zzz
    console.log("desiredItem", toJS(desiredItem)) // zzz

    return itemsInPockets.includes(desiredItem.name)
  }

  _isDesiredRecipientHere = ({ desiredItem, pockets }) => {
    const itemsInPockets = Object.keys(pockets)
    console.log(
      "itemsInPockets===========================>>>",
      toJS(itemsInPockets)
    ) // zzz
    console.log("desiredItem", toJS(desiredItem)) // zzz

    return itemsInPockets.includes(desiredItem.name)
  }

  _completeMission = ({
    charactersInScene,
    desiredItem,
    desiredRecipient,
    questStatus,
  }) => {
    const { pockets = {} } = questStatus.questConfig

    const isDesiredItemInPocket = this._isDesiredItemInPocket({
      desiredItem,
      pockets,
    })

    const isDesiredRecipientHere = this._isDesiredRecipientHere({
      desiredItem,
      pockets,
    })

    console.log("isDesiredRecipientHere", toJS(isDesiredRecipientHere)) // zzz
    console.log("isDesiredItemInPocket", toJS(isDesiredItemInPocket)) // zzz

    const missionCompleted = isDesiredRecipientHere && isDesiredItemInPocket
    console.log("missionCompleted", toJS(missionCompleted)) // zzz

    console.log("pockets", toJS(pockets)) // zzz

    // questStatus.activeMission++
    this.setQuestStatus(questStatus)
    // return foundCharacter
  }

  _findItem = ({ itemsInScene, desiredItem, questStatus }) => {
    const { pockets = {} } = questStatus.questConfig

    console.log("itemsInScene+_+_+_+_+_+_+_=-=-=-=-=-", toJS(itemsInScene)) // zzz
    console.log("desiredItem", toJS(desiredItem)) // zzz

    const foundItem =
      itemsInScene.find((item) => item.name === desiredItem.name) || null
    console.log("foundItem---------------------------->>>", toJS(foundItem)) // zzz

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

    questStatus.activeMission++
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
