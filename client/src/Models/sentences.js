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
    pet: { type: "dog", name: "Doggy", withMe: true },
    items: []
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
  console.log("you", you); // zzz

  const { name, creatures, items } = activeScene;

  console.log("activeScene", activeScene); // zzz

  const creature = creatures && creatures.length > 0 && creatures[0];
  const item = items && items.length > 0 && items[0];

  item && you.items.push(item);

  let creatureDialog = [];
  let itemDialog = [];
  if (creature && creature.type) {
    creatureDialog = [
      `You see a ${creature.type}.`,
      `You say, "Hello ${creature.type}."`,
      `"My name is ${you.name}."`,
      `The ${creature.type} says:`,
      `My name is ${creature.name}."`
    ];
  }

  if (item) {
    itemDialog = [`You see a ${item}.`, `You get the ${item}.`];
  }

  return {
    story: [
      [`You go to the ${name}.`, ...creatureDialog, ...itemDialog]
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
    tree: {
      name: "tree",
      creatures: [{ type: "" }],
      doorsAreOpen: {
        left: { image: "", state: true },
        right: { image: "doorGreen", state: false },
        top: { image: "", state: true },
        bottom: { image: "", state: true }
      }
    },
    stump: {
      name: "stump",
      creatures: [{ type: "wizard" }],
      doorsAreOpen: {
        left: { image: "", state: true },
        right: { image: "", state: true },
        top: { image: "", state: true },
        bottom: { image: "", state: false }
      },
      items: ["hat"]
    },
    castle: {
      creatures: [{ type: "unicorn" }],
      name: "castle",
      doorsAreOpen: {
        left: { image: "", state: true },
        right: { image: "", state: false },
        top: { image: "", state: true },
        bottom: { image: "", state: false }
      }
    },
    waterfall: {
      creatures: [{ type: "" }],
      name: "waterfall",
      doorsAreOpen: {
        left: { image: "", state: true },
        right: { image: "", state: false },
        top: { image: "", state: true },
        bottom: { image: "", state: true }
      }
    },
    bees: {
      creatures: [{ type: "" }],
      name: "bees",
      doorsAreOpen: {
        left: { image: "", state: true },
        right: { image: "", state: true },
        top: { image: "", state: true },
        bottom: { image: "", state: false }
      }
    },
    swamp: {
      creatures: [{ type: "" }],
      name: "swamp",
      doorsAreOpen: {
        left: { image: "", state: true },
        right: { image: "", state: false },
        top: { image: "", state: true },
        bottom: { image: "", state: true }
      }
    },
    house: {
      creatures: [],
      name: "house",
      doorsAreOpen: {
        left: { image: "", state: true },
        right: { image: "", state: true },
        top: { image: "", state: true },
        bottom: { image: "", state: undefined }
      }
    },
    lake: {
      creatures: [{ type: "" }],
      name: "lake",
      doorsAreOpen: {
        left: { image: "", state: true },
        right: { image: "", state: true },
        top: { image: "", state: true }
      }
    },
    barn: {
      creatures: [{ type: "" }],
      name: "barn",
      doorsAreOpen: {
        left: { image: "", state: true },
        right: { image: "", state: false },
        top: { image: "", state: true },
        bottom: { image: "", state: false }
      },
      items: ["greenKey"]
    },
    pool: {
      creatures: [{ type: "" }],
      name: "pool",
      doorsAreOpen: {
        left: { image: "", state: true },
        right: { image: "", state: true },
        top: { image: "", state: true },
        bottom: { image: "", state: true }
      }
    },
    hill: {
      creatures: [{ type: "" }],
      name: "hill",
      doorsAreOpen: {
        left: { image: "", state: true },
        right: { image: "", state: true },
        top: { image: "", state: true },
        bottom: { image: "", state: false }
      }
    },
    bog: {
      creatures: [{ type: "troll" }],
      name: "bog",
      doorsAreOpen: {
        left: { image: "", state: true },
        right: { image: "", state: true },
        top: { image: "", state: true },
        bottom: { image: "", state: undefined }
      }
    },
    pond: {
      creatures: [{ type: "" }],
      name: "pond",
      doorsAreOpen: {
        left: { image: "", state: true },
        right: { image: "", state: true },
        top: { image: "", state: true },
        bottom: { image: "", state: false }
      }
    },
    coop: {
      creatures: [{ type: "" }],
      name: "coop",
      doorsAreOpen: {
        left: { image: "", state: true },
        right: { image: "", state: false },
        top: { image: "", state: true },
        bottom: { image: "", state: false }
      }
    },
    cave: {
      creatures: [{ type: "" }],
      name: "cave",
      doorsAreOpen: {
        left: { image: "", state: true },
        right: { image: "", state: true },
        top: { image: "", state: true },
        bottom: { image: "", state: false }
      }
    },
    slide: {
      creatures: [{ type: "" }],
      name: "slide",
      doorsAreOpen: {
        left: { image: "", state: true },
        right: { image: "", state: true },
        top: { image: "", state: true },
        bottom: { image: "", state: false }
      }
    },
    swing: {
      creatures: [{ type: "" }],
      name: "swing",
      doorsAreOpen: {
        left: { image: "", state: true },
        right: { image: "", state: true },
        top: { image: "", state: true }
      }
    }
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
    { scene: scenes.cave, name: scenes.cave.name },
    { scene: scenes.castle, name: scenes.castle.name }
  ],
  [
    { scene: scenes.swamp, name: scenes.swamp.name },
    { scene: scenes.bees, name: scenes.bees.name },
    { scene: scenes.slide, name: scenes.slide.name },
    { scene: scenes.waterfall, name: scenes.waterfall.name }
  ],
  [
    { scene: scenes.pool, name: scenes.pool.name },
    { scene: scenes.hill, name: scenes.hill.name },
    { scene: scenes.barn, name: scenes.barn.name },
    { scene: scenes.coop, name: scenes.coop.name }
  ],
  [
    { scene: scenes.house, name: scenes.house.name },
    { scene: scenes.lake, name: scenes.lake.name },
    { scene: scenes.swing, name: scenes.swing.name },
    { scene: scenes.bog, name: scenes.bog.name }
  ]
];

export default { generateNewFriend, generatePlot, generateYou, locationsMap };
