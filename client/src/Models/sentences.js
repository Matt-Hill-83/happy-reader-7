import Utils from "../Utils/Utils.js"
import images from "../images/images.js"
import localStateStore from "../Stores/LocalStateStore/LocalStateStore.js"
import { maps } from "../Stores/InitStores.js"
import myWords from "../Models/words.js"

// const { wordTypes } = myWords

const homeLocation = "home"

// const generateMission = () => {
//   const missionItem = Utils.getRandomItemByTypeAndUse({
//     type: wordTypes.vehicle
//   })

//   const missionItemStartLocation = Utils.getRandomItemByTypeAndUse({
//     type: wordTypes.location
//   })

//   const missionItemEndLocation = Utils.getRandomItemByTypeAndUse({
//     type: wordTypes.location
//   })

//   const missionItemRecipientType = Utils.getRandomItemByTypeAndUse({
//     type: wordTypes.creature
//   })

//   const missionItemRecipientName = Utils.getRandomItemByTypeAndUse({
//     type: wordTypes.name
//   })

//   return {
//     item: {
//       name: missionItem,
//       startLocation: missionItemStartLocation,
//       endLocation: missionItemEndLocation,
//       recipient: {
//         type: missionItemRecipientType,
//         name: missionItemRecipientName
//       }
//     }
//   }
// }

// const generateNewFriend = () => {
//   const type = Utils.getRandomItemByTypeAndUse({
//     type: wordTypes.creature
//   })

//   const name = Utils.getRandomItemByTypeAndUse({
//     type: wordTypes.name
//   })

//   return {
//     type,
//     name,
//     mission: generateMission()
//   }
// }

// // This cannot be chosen for the next scene.
// const generateStartNarrative = ({ you }) => {
//   return {
//     story: [
//       [
//         `You are $-{you.name}.`,
//         `You are a $-{you.creature}.`,
//         `You live in the $-{you.homeLocation}.`,
//         `You are sooooo happy.`
//       ]

//       // [
//       //   `${you.mission.item.recipient.name} is a ${
//       //     you.mission.item.recipient.type
//       //   }.`,
//       //   `${you.mission.item.recipient.name} is at the ${
//       //     you.mission.item.endLocation
//       //   }.`,
//       //   `${you.mission.item.recipient.name} lost her ${you.mission.item.name}.`,
//       //   `${you.mission.item.recipient.name} is soooo sad.`
//       // ]
//     ]
//     // mission: [
//     //   `Go to the ${you.mission.item.startLocation}`,
//     //   `Find the ${you.mission.item.name}.`,

//     //   `Bring the ${you.mission.item.name} to the ${
//     //     you.mission.item.endLocation
//     //   }.`,

//     //   `Give the ${you.mission.item.name} to ${you.mission.item.recipient.name}.`
//     // ],
//     // proposition: [`Where do you go now?`],
//   }
// }

// const generateNarrative1 = ({ you, activeScene }) => {
//   const { name, creatures, items } = activeScene

//   const creature = creatures && creatures.length > 0 && creatures[0]
//   const item = items && items.length > 0 && items[0]

//   item && you.items.push(item)

//   let creatureDialog = []
//   let itemDialog = []
//   if (creature && creature.type) {
//     creatureDialog = [
//       `You see a ${creature.type}.`,
//       `You say, "Hello ${creature.type}."`,
//       `"My name is ${you.name}."`,
//       `The ${creature.type} says:`,
//       `My name is ${creature.name}."`
//     ]
//   }

//   if (item) {
//     itemDialog = [`You see a ${item}.`, `You get the ${item}.`]
//   }

//   return {
//     story: [
//       [`You go to the ${name}.`, ...creatureDialog, ...itemDialog]
//       // [
//       //   `The ${creature.type} says,`,
//       //   `"Hello ${you.name}."`,
//       //   `"My name is ${creature.name}."`,
//       //   `"I am sooooooo sad."`,
//       //   `The ${creature.type} starts to cry.`
//       // ]
//       // [
//       //   `The ${creature.type} says,`,

//       //   `"Can you help me?"`,
//       //   `"I need to go to the ${creature.mission.item.startLocation}`,
//       //   `to get a  ${creature.mission.item.name}."`,
//       //   `"Will you go with me?"`
//       // ]
//     ]
//   }
// }

const startScene = {
  name: homeLocation
}

const locationsFromImages = Object.keys(images.locations)
const creaturesFromImages = Object.keys(images.creatures)
const itemsFromImages = Object.keys(images.items)

// zzz - this is where you set the friend
// TODO  move this to the store
// const testFriend = "liz"
const yourName = "kat"

const allScenes = locationsFromImages.map(name => {
  return {
    name,
    doors: {
      right: { open: true },
      bottom: { open: false }
    },
    creatures: [],
    frameset: { frames: [] }
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

export default { generatePlot, generateYou }
