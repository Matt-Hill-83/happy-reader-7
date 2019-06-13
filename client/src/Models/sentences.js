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
  const { location, creatures } = activeScene;

  const creature = creatures && creatures.length > 0 && creatures[0];
  console.log("creature", creature); // zzz

  const newFriend = generateNewFriend();

  return {
    story: [
      [
        `You go to the ${location}.`,
        `You see a ${newFriend.type}`,
        `You say, "Hello ${newFriend.type}"`,
        `"My name is ${you.name}."`
      ]
      // [
      //   `The ${newFriend.type} says,`,
      //   `"Hello ${you.name}."`,
      //   `"My name is ${newFriend.name}."`,
      //   `"I am sooooooo sad."`,
      //   `The ${newFriend.type} starts to cry.`
      // ]
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
  // location: homeLocation,
  creatures: [],
  name: homeLocation,
  builtInNarrativeGenerator: generateStartNarrative
};

// TODO - creatures should have a name and type
// TODO - creatures should have a name and type
// TODO - creatures should have a name and type
// TODO - creatures should have a name and type

const generateScenes = () => {
  const scenes = {
    tree: { creatures: [{ type: "hobbit" }], name: "tree" },
    stump: { creatures: [{ type: "troll" }], name: "stump" },
    castle: { creatures: [{ type: "unicorn" }], name: "castle" },
    waterfall: { creatures: [{ type: "dragon" }], name: "waterfall" },
    bees: { creatures: [{ type: "fairy" }], name: "bees" },
    swamp: { creatures: [{ type: "elf" }], name: "swamp" },
    house: { creatures: [], name: "house" },
    lake: { creatures: [{ type: "wizard" }], name: "lake" },
    barn: { creatures: [{ type: "monster" }], name: "barn" }
  };

  const missionItemRecipientName = Utils.getRandomItemByTypeAndUse({
    type: wordTypes.name
  });

  return scenes;
};

const scenes = generateScenes();

const generatePlot = () => {
  const plot = {
    activeScene: startScene,
    narrativeGenerators,
    scenes,
    you: localStateStore.getYou()
  };

  localStateStore.setPlot(plot);
};

// TODO
// TODO
// TODO
// TODO
// TODO
// these should be the entire scene
const locationsMap = [
  [
    { scene: scenes.tree, name: scenes.tree.name },
    { scene: scenes.stump, name: scenes.stump.name },
    { scene: scenes.castle, name: scenes.castle.name }
  ],
  [
    { scene: scenes.waterfall, name: scenes.waterfall.name },
    { scene: scenes.bees, name: scenes.bees.name },
    { scene: scenes.swamp, name: scenes.swamp.name }
  ],
  [
    { scene: scenes.house, name: scenes.house.name },
    { scene: scenes.lake, name: scenes.lake.name },
    { scene: scenes.barn, name: scenes.barn.name }
  ]
];

export default { generateNewFriend, generatePlot, generateYou, locationsMap };
