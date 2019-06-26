import myWords from "../Models/words.js";
import Utils from "../Utils/Utils.js";
import localStateStore from "../Stores/LocalStateStore/LocalStateStore.js";
import images from "../images/images.js";

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
  name: homeLocation,
  builtInNarrativeGenerator: generateStartNarrative
};

const generateScenes = () => {
  const scenes = {
    tree: {
      name: "tree",
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
        // right: { image: "doorYellow", open: false }
      }
    },
    waterfall: {
      name: "waterfall",
      doors: {
        right: { open: false },
        bottom: { open: true }
      }
    },
    bees: {
      name: "bees",
      items: ["key"],
      doors: {
        right: { open: true }
      }
    },
    swamp: {
      name: "swamp",
      doors: {
        right: { open: false },
        bottom: { open: true }
      }
    },
    house: {
      name: "house",
      doors: {
        // right: { open: false }
      }
    },
    lake: {
      name: "lake",
      doors: {
        right: { open: true }
      }
    },
    barn: {
      name: "barn",
      doors: {
        bottom: { open: true }
      }
    },
    pool: {
      name: "pool",
      doors: {
        right: { open: true },
        bottom: { open: true }
      }
    },
    hill: {
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
      }
    },
    pond: {
      name: "pond",
      doors: {
        right: { image: "doorYellow", open: false },
        bottom: { open: true }
      }
    },

    coop: {
      name: "coop",
      doors: {
        right: { open: false },
        bottom: { open: false }
      }
    },
    cave: {
      name: "cave",
      doors: {
        bottom: { open: true }
      }
    },
    slide: {
      name: "slide",
      doors: {
        right: { open: true },
        bottom: { open: false }
      }
    },
    swing: {
      name: "swing",
      doors: {
        right: { open: true }
      }
    }
  };

  return scenes;
};

const scenes = generateScenes();
const scenes2 = Object.keys(images.locations.small);
console.log("scenes2", scenes2); // zzz

const test = scenes2.map(name => {
  return { name, doors: [] };
});

console.log("test", test); // zzz

let locationsMaps = [
  {
    startScene: scenes.house,
    endScene: scenes.tree,
    grid: [
      [{}, {}, {}, {}],
      [{}, scenes.bog, {}, {}, {}],
      [scenes.house, scenes.pond, scenes.bees, scenes.stump, scenes.tree],
      [{}, {}, {}, {}],
      [{}, {}, {}, {}]
    ]
  },
  {
    startScene: scenes.house,
    endScene: scenes.tree,
    grid: [
      [{}, {}, {}, {}],
      [{}, {}, {}, {}],
      [scenes.house, scenes.bog, scenes.tree, {}],
      [{}, {}, {}, {}]
    ]
  },
  {
    startScene: scenes.house,
    endScene: scenes.tree,
    grid: [
      [{}, {}, {}, {}],
      [{}, {}, {}, {}],
      [scenes.house, scenes.lake, scenes.tree, {}, {}],
      [{}, {}, {}, {}]
    ]
  }
];

// let locationsMaps = [
//   {
//     startScene: scenes.house,
//     endScene: scenes.pool,
//     grid: [
//       [{}, scenes.stump, scenes.pond, scenes.castle],
//       [{}, {}, scenes.cave, {}],
//       [scenes.pool, scenes.lake, scenes.barn, {}],
//       [scenes.house, {}, scenes.bog, scenes.bees]
//     ]
//   },
//   {
//     startScene: scenes.pond,
//     endScene: scenes.stump,
//     grid: [
//       [{}, scenes.stump, scenes.pond, scenes.castle],
//       [{}, {}, scenes.cave, {}],
//       [{}, {}, {}, {}],
//       [scenes.house, {}, scenes.bog, scenes.bees]
//     ]
//   }
// ];

localStateStore.setLocationsMaps(locationsMaps);

// create placeholders for empty rows
// locationsMap = locationsMap.map(row => {
//   return row || [{}, {}, {}, {}];
// });

const allScenes = Object.values(scenes);

const generatePlot = () => {
  const plot = {
    activeScene: startScene,
    narrativeGenerators,
    allScenes: test,
    // allScenes,
    you: localStateStore.getYou()
  };

  localStateStore.setPlot(plot);
};

console.log("images", images); // zzz

export default { generateNewFriend, generatePlot, generateYou };
