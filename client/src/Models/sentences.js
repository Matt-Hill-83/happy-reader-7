import images from "../images/images.js"
import localStateStore from "../Stores/LocalStateStore/LocalStateStore.js"

const homeLocation = "home"
// TODO  move this to the store
const yourName = "kat"

const generateYou = ({ you = {} }) => {
  const defaultYou = {
    name: yourName,
    creature: yourName,
    items: [],
    mood: "normal"
  }
  const modifiedYou = Object.assign(defaultYou, you)

  localStateStore.setYou(modifiedYou)
}

generateYou({})

const getNewFrame = () => {
  const you = localStateStore.getYou()
  const yourName = you.name
  const allCharacters = [yourName]

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
        text: `Hi ${creatureName1}.`
      },
      {
        character: creatureName1,
        characterIndex: 1,
        text: `${creatureName0}! ${creatureName0}!!`
      }
    ]
  }

  return newFrame
}

const startScene = {
  name: homeLocation
}

const locationsFromImages = Object.keys(images.locations)
const creaturesFromImages = Object.keys(images.creatures)
const itemsFromImages = Object.keys(images.items)

const allScenes = locationsFromImages.map(name => {
  return {
    name,
    doors: {
      right: { open: true },
      bottom: { open: false }
    },
    creatures: [],
    frameSet: { frames: [getNewFrame()] }
  }
})

const allCreatures = creaturesFromImages.map(type => {
  return { type, name: `${type}-creature` }
})

const posableGirls = images.posableGirls

// Add posableGirls to the creatures list, because they are a different type of object
allCreatures.push(...posableGirls)
localStateStore.setCreatures(allCreatures)

const allItems = itemsFromImages.map(type => {
  return { type, name: "" }
})

const generatePlot = () => {
  const plot = {
    activeScene: startScene,
    allScenes,
    allItems
  }

  localStateStore.setPlot(plot)
}

export default { generatePlot }
