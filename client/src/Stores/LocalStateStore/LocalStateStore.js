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
      pockets: [{ name: "top", amount: 1 }],
      pockets2: { apple: 1 },
      missions: [
        {
          name: "Feed Piggy",
          rewards: [{ name: "pig", amount: 1 }],
          item: { name: "bun" },
          recipient: { name: "log" },
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

  updateQuestState = ({ itemsInScene }) => {
    const tempQuestStatus = this.questStatus
    console.log(
      "tempQuestStatus--------------LSS----->>>",
      toJS(tempQuestStatus)
    ) // zzz

    console.log("tempQuestStatus", toJS(tempQuestStatus)) // zzz
    if (!tempQuestStatus.questConfig) {
      return null
    }
    const { missions, pockets, pockets2 } = tempQuestStatus.questConfig

    if (!missions) {
      return null
    }

    const activeMission = missions[tempQuestStatus.activeMission] || null
    if (!activeMission) {
      return {}
    }

    const desiredItem = activeMission.item

    const foundItem =
      itemsInScene.find((item) => item.name === desiredItem.name) || null
    // console.log("foundItem", toJS(foundItem)) // zzz

    if (foundItem) {
      tempQuestStatus.activeMission++
      if (!foundItem.amount) {
        foundItem.amount = 1
      }
      pockets.push(foundItem)

      if (pockets2[foundItem.name]) {
        pockets2[foundItem.name].amount =
          pockets2[foundItem.name].amount + foundItem.amount
      } else {
        pockets2[foundItem.name] = { amount: foundItem.amount }
      }
      console.log("pockets2", toJS(pockets2)) // zzz

      activeMission.completed = true
      this.setQuestStatus(tempQuestStatus)
    }

    console.log("activeMission", toJS(activeMission)) // zzz

    return { foundItem, missionCompleted: this.questStatus.activeMission }
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
