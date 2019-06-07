import myWords from "../Models/words.js";
import Utils from "../Utils/Utils.js";
import localStateStore from "../Stores/LocalStateStore/LocalStateStore.js";

const { wordTypes } = myWords;

const generateYou = ({ you }) => {
  const defaultYou = {
    name: "Charlie",
    creature: "girl",
    homeLocation: "tree",
    vehicle: "scooter",
    mission: generateMission(),
    // home: {
    //   location: "tree"
    // },
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
      ],

      [
        `${you.mission.item.recipient.name} is a ${
          you.mission.item.recipient.type
        }.`,
        `${you.mission.item.recipient.name} is at the ${
          you.mission.item.endLocation
        }.`,
        `${you.mission.item.recipient.name} lost her ${you.mission.item.name}.`,
        `${you.mission.item.recipient.name} is soooo sad.`
      ]
    ],
    mission: [
      `Go to the ${you.mission.item.startLocation}`,
      `Find the ${you.mission.item.name}.`,

      `Bring the ${you.mission.item.name} to the ${
        you.mission.item.endLocation
      }.`,

      `Give the ${you.mission.item.name} to ${you.mission.item.recipient.name}.`
    ],
    proposition: [`Where do you go now?`],
    sceneOptions: [you.mission.item.startLocation]
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
      ],
      [
        `The ${newFriend.type} says,`,

        `"Can you help me?"`,
        `"I need to go to the ${newFriend.mission.item.startLocation}`,
        `to get a  ${newFriend.mission.item.name}."`,
        `"Will you go with me?"`
      ]
    ]
    // mission: [],
    // proposition: [
    //   `Do you go to the ${newFriend.mission.item.startLocation} to help ${
    //     newFriend.name
    //   } find a ${newFriend.mission.item.name}?"`,
    //   `--- OR ---`,
    //   `Do you go to the ${you.mission.location}?`
    // ]
  };
};

const narrativeGenerators = [generateNarrative1];

const startScene = {
  location: "house",
  builtInNarrativeGenerator: generateStartNarrative
};

const endScene = {
  location: "castle",
  builtInNarrativeGenerator: generateStartNarrative
};

const generatePlot = () => {
  console.log("Utils.generateScenes()", Utils.generateScenes()); // zzz

  const plot = {
    activeScene: startScene,
    endScene,
    narrativeGenerators,
    scenes: Utils.generateScenes(),
    you: localStateStore.getYou()
  };

  localStateStore.setPlot(plot);
};

export default { generateNewFriend, generatePlot, generateYou };
