import myWords from "../Models/words.js";
import Utils from "../Utils/Utils.js";
import localStateStore from "../Stores/LocalStateStore/LocalStateStore.js";

const { wordTypes } = myWords;

const homeLocation = "house";

const generateYou = ({ you }) => {
  const defaultYou = {
    name: "Charlie",
    creature: "girl",
    homeLocation: homeLocation,
    vehicle: "scooter",
    mission: generateMission(),
    friends: [],
    pet: { type: "dog", name: "Doggy", withMe: true }
  };
  const modifiedYou = Object.assign({}, defaultYou, you);

  localStateStore.setYou(modifiedYou);
};

const generateMission = () => {
  const missionItem = Utils.getRandomItemByTypeAndUse({
    type: wordTypes.vehicle
  });

  const missionItemStartLocation = Utils.getRandomItemByTypeAndUse({
    type: wordTypes.location
  });

  const missionItemEndLocation = Utils.getRandomItemByTypeAndUse({
    type: wordTypes.location
  });

  const missionItemRecipientType = Utils.getRandomItemByTypeAndUse({
    type: wordTypes.creature
  });

  const missionItemRecipientName = Utils.getRandomItemByTypeAndUse({
    type: wordTypes.name
  });

  return {
    item: {
      name: missionItem,
      startLocation: missionItemStartLocation,
      endLocation: missionItemEndLocation,
      recipient: {
        type: missionItemRecipientType,
        name: missionItemRecipientName
      }
    }
  };
};

const generateNewFriend = () => {
  const type = Utils.getRandomItemByTypeAndUse({
    type: wordTypes.creature
  });

  const name = Utils.getRandomItemByTypeAndUse({
    type: wordTypes.name
  });

  return {
    type,
    name,
    mission: generateMission()
  };
};

// This cannot be chosen for the next scene.
const generateStartNarrative = ({ you }) => {
  return {
    story: [
      [
        `You are ${you.name}.`,
        `You are a ${you.creature}.`,
        `You live in the ${you.homeLocation}.`,
        `You are sooooo happy.`
      ]

      // [
      //   `${you.mission.item.recipient.name} is a ${
      //     you.mission.item.recipient.type
      //   }.`,
      //   `${you.mission.item.recipient.name} is at the ${
      //     you.mission.item.endLocation
      //   }.`,
      //   `${you.mission.item.recipient.name} lost her ${you.mission.item.name}.`,
      //   `${you.mission.item.recipient.name} is soooo sad.`
      // ]
    ]
    // mission: [
    //   `Go to the ${you.mission.item.startLocation}`,
    //   `Find the ${you.mission.item.name}.`,

    //   `Bring the ${you.mission.item.name} to the ${
    //     you.mission.item.endLocation
    //   }.`,

    //   `Give the ${you.mission.item.name} to ${you.mission.item.recipient.name}.`
    // ],
    // proposition: [`Where do you go now?`],
  };
};

const generateNarrative1 = ({ you, activeScene }) => {
  const { location } = activeScene;

  const newFriend = generateNewFriend();

  return {
    story: [
      [
        `You go to the ${location}.`,
        `You see a ${newFriend.type}`,
        `You say, "Hello ${newFriend.type}"`,
        `"My name is ${you.name}."`
      ],
      [
        `The ${newFriend.type} says,`,
        `"Hello ${you.name}."`,
        `"My name is ${newFriend.name}."`,
        `"I am sooooooo sad."`,
        `The ${newFriend.type} starts to cry.`
      ]
      // [
      //   `The ${newFriend.type} says,`,

      //   `"Can you help me?"`,
      //   `"I need to go to the ${newFriend.mission.item.startLocation}`,
      //   `to get a  ${newFriend.mission.item.name}."`,
      //   `"Will you go with me?"`
      // ]
    ]
  };
};

const narrativeGenerators = [generateNarrative1];

const startScene = {
  location: homeLocation,
  builtInNarrativeGenerator: generateStartNarrative
};

const endScene = {
  location: "castle",
  builtInNarrativeGenerator: generateStartNarrative
};

const scenes = [
  { creatures: ["elf"], location: "tree" },
  { creatures: ["elf"], location: "stump" },
  { creatures: ["elf"], location: "castle" },
  { creatures: ["elf"], location: "waterfall" },
  { creatures: ["elf"], location: "bees" },
  { creatures: ["elf"], location: "swamp" },
  { creatures: ["elf"], location: "house" },
  { creatures: ["elf"], location: "lake" },
  { creatures: ["elf"], location: "barn" }
];

const generatePlot = () => {
  const plot = {
    activeScene: startScene,
    endScene,
    narrativeGenerators,
    scenes,
    // scenes: Utils.generateScenes(),
    you: localStateStore.getYou()
  };

  localStateStore.setPlot(plot);
};

// these should just be scenes
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

// these should just be grabbed from the scenes array
const locationsMap = [
  [
    { name: locations.tree.name },
    { name: locations.stump.name },
    { name: locations.castle.name }
  ],
  [
    { name: locations.waterfall.name },
    { name: locations.bees.name },
    { name: locations.swamp.name }
  ],
  [
    { name: locations.house.name },
    { name: locations.lake.name },
    { name: locations.barn.name }
  ]
];

export default { generateNewFriend, generatePlot, generateYou, locationsMap };
