import images from "../images/images.js"
import localStateStore from "../Stores/LocalStateStore/LocalStateStore.js"
import Utils from "../Utils/Utils.js"
import { toJS } from "mobx"

const homeLocation = "home"
// TODO  move this to the store
const yourName = "kat"

const generateYou = ({ you = {} }) => {
  const defaultYou = {
    name: yourName,
    creature: yourName,
    items: [],
    mood: "normal",
  }
  const modifiedYou = Object.assign(defaultYou, you)

  localStateStore.setYou(modifiedYou)
}

generateYou({})

const startScene = {
  name: homeLocation,
}

// const locationsFromImages = Object.keys(images.locations)
const creaturesFromImages = Object.keys(images.creatures)
const itemsFromImages = Object.keys(images.items)

// const allScenes = locationsFromImages.map((name) => {
//   return {
//     name,
//     doors: {
//       right: { open: true },
//       bottom: { open: false },
//     },
//     creatures: [],
//     frameSet: { frames: [Utils.getNewFrame({})] },
//   }
// })

const allCreatures = creaturesFromImages.map((type) => {
  return { type, name: `${type}-creature` }
})

const posableGirls = images.posableGirls

// Add posableGirls to the creatures list, because they are a different type of object
allCreatures.push(...posableGirls)
localStateStore.setCreatures(allCreatures)

const allItems = itemsFromImages.map((type) => {
  return { type, name: "" }
})

// const generatePlot = () => {
//   const plot = {
//     activeScene: startScene,
//     // allScenes,
//     allItems,
//   }

//   localStateStore.setPlot(plot)
// }

export default {}
// export default { generatePlot }
