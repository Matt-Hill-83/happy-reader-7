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
  const { name, creatures } = activeScene;

  const creature = creatures && creatures.length > 0 && creatures[0];

  let creatureDialog = [];
  if (creature) {
    creatureDialog = [
      `You see a ${creature.type}.`,
      `You say, "Hello ${creature.type}."`,
      `"My name is ${you.name}."`,
      `The ${creature.type} says:`,
      `My name is ${creature.name}."`
    ];
  }

  return {
    story: [
      [`You go to the ${name}.`, ...creatureDialog]
      // [
      //   `The ${creature.type} says,`,
      //   `"Hello ${you.name}."`,
      //   `"My name is ${creature.name}."`,
      //   `"I am sooooooo sad."`,
      //   `The ${creature.type} starts to cry.`
      // ]
      // [
      //   `The ${creature.type} says,`,

      //   `"Can you help me?"`,
      //   `"I need to go to the ${creature.mission.item.startLocation}`,
      //   `to get a  ${creature.mission.item.name}."`,
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
    barn: { creatures: [{ type: "monster" }], name: "barn" },
    pool: { creatures: [{ type: "monster" }], name: "pool" },
    hill: { creatures: [{ type: "monster" }], name: "hill" },
    bog: { creatures: [{ type: "monster" }], name: "bog" },
    pond: { creatures: [{ type: "monster" }], name: "pond" },
    coop: { creatures: [{ type: "monster" }], name: "coop" }
  };

  for (let scene in scenes) {
    scenes[scene].creatures.forEach(creature => {
      const creatureName = Utils.getRandomItemByTypeAndUse({
        type: wordTypes.name
      });
      creature.name = creatureName;
    });
  }

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
    { scene: scenes.castle, name: scenes.castle.name },
    { scene: scenes.castle, name: scenes.castle.name }
  ],
  [
    { scene: scenes.waterfall, name: scenes.waterfall.name },
    { scene: scenes.bees, name: scenes.bees.name },
    { scene: scenes.swamp, name: scenes.swamp.name },
    { scene: scenes.swamp, name: scenes.swamp.name }
  ],
  [
    { scene: scenes.pool, name: scenes.pool.name },
    { scene: scenes.hill, name: scenes.hill.name },
    { scene: scenes.bog, name: scenes.bog.name },
    { scene: scenes.coop, name: scenes.coop.name }
  ],
  [
    { scene: scenes.house, name: scenes.house.name },
    { scene: scenes.lake, name: scenes.lake.name },
    { scene: scenes.barn, name: scenes.barn.name },
    { scene: scenes.barn, name: scenes.barn.name }
  ]
];

export default { generateNewFriend, generatePlot, generateYou, locationsMap };
