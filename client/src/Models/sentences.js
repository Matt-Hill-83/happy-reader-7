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
  const { name, creatures, items } = activeScene;

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
  // creatures: [],
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
      // creatures: [],
      doors: {
        right: { open: false },
        bottom: { open: true }
      }
    },
    stump: {
      name: "stump",
      creatures: [{ type: "wizard" }],
      doors: {
        right: { image: "doorGreen", open: true }
      },
      items: ["hat"]
    },
    castle: {
      creatures: [{ type: "unicorn" }],
      name: "castle",
      doors: {
        right: { image: "doorYellow", open: false }
      }
    },
    waterfall: {
      // creatures: [],
      name: "waterfall",
      doors: {
        right: { open: false },
        bottom: { open: true }
      }
    },
    bees: {
      // creatures: [],
      name: "bees",
      doors: {
        // bottom: { open: true }
      },
      items: ["key"]
    },
    swamp: {
      // creatures: [],
      name: "swamp",
      doors: {
        right: { open: false },
        bottom: { open: true }
      }
    },
    house: {
      // creatures: [],
      name: "house",
      doors: {}
    },
    lake: {
      // creatures: [],
      name: "lake",
      doors: {
        right: { open: true }
      }
    },
    barn: {
      // creatures: [],
      name: "barn",
      doors: {
        bottom: { open: true }
      }
    },
    pool: {
      // creatures: [],
      name: "pool",
      doors: {
        right: { open: true },
        bottom: { open: true }
      }
    },
    hill: {
      // creatures: [],
      name: "hill",
      doors: {
        right: { open: true },
        bottom: { open: false }
      }
    },
    bog: {
      creatures: [{ type: "troll" }],
      name: "bog",
      doors: {
        right: { image: "doorGreen", open: false }
        // bottom: { open: true }
      }
      // items: ["key"]
    },
    pond: {
      // creatures: [],
      name: "pond",
      doors: {
        right: { image: "doorYellow", open: true },
        bottom: { open: true }
      }
      // items: ["key"]
    },
    coop: {
      // creatures: [],
      name: "coop",
      doors: {
        right: { open: false },
        bottom: { open: false }
      }
    },
    cave: {
      // creatures: [],
      name: "cave",
      doors: {
        // right: { open: true },
        bottom: { open: true }
      }
    },
    slide: {
      // creatures: [],
      name: "slide",
      doors: {
        right: { open: true },
        bottom: { open: false }
      }
    },
    swing: {
      // creatures: [],
      name: "swing",
      doors: {
        right: { open: true }
      }
    }
  };

  for (let scene in scenes) {
    scenes[scene].creatures &&
      scenes[scene].creatures.length &&
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

//  TODO = create locationsMap first, then create scenes list from it.
//  TODO = create locationsMap first, then create scenes list from it.
//  TODO = create locationsMap first, then create scenes list from it.
let locationsMap = [
  [{}, scenes.stump, scenes.pond, scenes.castle],
  [{}, {}, scenes.cave, {}],
  [scenes.pool, scenes.lake, scenes.barn, {}],
  [scenes.house, {}, scenes.bog, scenes.bees]
];

// create placeholders for empty rows
locationsMap = locationsMap.map(row => {
  return row || [{}, {}, {}, {}];
});

console.log("locationsMap", locationsMap); // zzz

// convert locations to 1D array with no empty scenes.
let newScenes = locationsMap.flat();
console.log("newScenes", newScenes); // zzz
newScenes = newScenes.filter(scene => scene.name);

console.log("newScenes", newScenes); // zzz

// const locationsMap = [
//   [{}, scenes.stump, scenes.cave, scenes.castle],
//   [scenes.swamp, scenes.bees, scenes.slide, scenes.waterfall],
//   [scenes.pool, scenes.hill, scenes.barn, scenes.coop],
//   [scenes.house, {}, scenes.swing, scenes.bog]
// ];

const generatePlot = () => {
  const plot = {
    activeScene: startScene,
    narrativeGenerators,
    scenes: newScenes,
    you: localStateStore.getYou()
  };

  localStateStore.setPlot(plot);
};

export default { generateNewFriend, generatePlot, generateYou, locationsMap };
