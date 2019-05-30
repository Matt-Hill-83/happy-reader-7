import myWords from "../Models/words.js";
import Utils from "../Utils/Utils.js";

const { wordTypes } = myWords;

const generateYou = () => {
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

  console.log("missionItemRecipientName", missionItemRecipientName); // zzz

  return {
    name: "Charlie",
    creature: "girl",
    homeLocation: "forest",
    vehicle: "scooter",
    mission: {
      item: {
        name: missionItem,
        startLocation: missionItemStartLocation,
        endLocation: missionItemEndLocation,
        recipient: {
          type: missionItemRecipientType,
          name: missionItemRecipientName
        }
      }
    },
    home: {
      location: "house"
    },
    friends: [],
    pet: { type: "dog", name: "Doggy", withMe: true }
  };
};

const you = generateYou();

// This cannot be chosen for the next scene.
const createHomeStory = ({ you }) => {
  return {
    story: [
      `Your name is ${you.name}.`,
      `You live in the ${you.homeLocation}.`,
      `You are sooooo happy.`,

      `Your friend ${you.mission.item.recipient.name} is a ${
        you.mission.item.recipient.type
      }.`,
      `${you.mission.item.recipient.name} lives at the ${
        you.mission.item.endLocation
      }.`,
      `${you.mission.item.recipient.name} is soooo sad.`,
      `${you.mission.item.recipient.name} lost her ${
        you.mission.item.name
      } at the ${you.mission.item.startLocation}`,

      `Go to the ${you.mission.item.startLocation} and find ${
        you.mission.item.recipient.name
      }'s ${you.mission.item.name}.`,

      `Bring the ${you.mission.item.name} to the ${
        you.mission.item.endLocation
      }.`,

      `Give the ${you.mission.item.name} to ${
        you.mission.item.recipient.name
      }.`,

      `${you.mission.item.recipient.name} will be sooooooo happy!`
    ],
    proposition: [`Where do you go now?`],
    sceneOptions: [you.mission.item.startLocation]
  };
};

const scenes = {
  meadow: { location: "meadow" },
  waterfall: { location: "waterfall" },
  school: { location: "school" },
  garden: { location: "garden" }
};

const startScene = {
  location: "forest",
  newFriend: {
    type: undefined,
    name: "Crystal"
  },
  builtInNarrative: createHomeStory({ you }),
  isHome: true,
  mission: {
    item: {
      name: "blueberries",
      location: "location 2",
      recipient: "creature 3"
    },
    startLocation: "birthday party",
    endLocation: "birthday party",
    giveToCreature: "creature 1"
  }
};

const endScene = {
  location: "castle",
  builtInNarrative: createHomeStory({ you }),
  mission: {
    item: {
      name: "blueberries",
      location: "location 2",
      recipient: "creature 3"
    },
    startLocation: "birthday party",
    endLocation: "birthday party",
    giveToCreature: "creature 1"
  }
};

const createNewFriend = () => {
  return {
    gender: "female",
    type: "elf",
    name: "Bob",
    mission: {
      item: {
        name: "blueberries",
        location: "location 2",
        recipient: "creature 3"
      },
      bringToLocation: "birthday party",
      giveToCreature: "creature 1"
    }
  };
};

const newNarrativeP1 = ({ you, activeScene }) => {
  const { location } = activeScene;
  // const { newFriend, location } = activeScene;

  const newFriend = createNewFriend();

  return {
    story: [
      `You go to the ${location}.`,
      `At the ${location}, you see a ${newFriend.type}`,
      `You say, "Hello ${newFriend.type}, my name is ${you.name}."`,

      `The ${newFriend.type} says, "Hello ${you.name}."`,
      `"My name is ${newFriend.name}."`,
      `"I am sooooooo sad."`,

      `The ${newFriend.type} starts to cry.`,
      `The ${newFriend.type} says,`,

      `"Can you help me?"`,
      `"I need to go to the ${newFriend.mission.item.location} to get a  ${
        newFriend.mission.item.name
      }."`,
      `"Will you go with me?"`
    ],
    proposition: [
      `Do you go to the ${newFriend.mission.item.location} to help ${
        newFriend.name
      } find a ${newFriend.mission.item.name}?"`,
      `--- OR ---`,
      `Do you go to the ${you.mission.location}?`
    ]
  };
};

const narratives = [
  // argumentStory,
  newNarrativeP1
  // birthdayPartyStory,
  // lostCreatureStory,
  // lostThingStory
];

const getNarrative = ({ plot, activeScene }) => {
  const { you } = plot;

  if (activeScene.builtInNarrative) {
    return activeScene.builtInNarrative;
  } else {
    return activeScene.narrative({ you, activeScene });
  }
};

const plot = { activeScene: startScene, endScene, you, scenes, narratives };
export default { getNarrative, plot };

// const argumentStory = ({ you, activeScene }) => {
//   const sceneOptionA = activeScene.sceneOptionA;

//   const creatures = Utils.getWordsByType({ words, type: wordTypes.animal });
//   const animal1 = Utils.getRandomItem({ items: creatures });
//   const animal2 = Utils.getRandomItem({ items: creatures });
//   const names = Utils.getWordsByType({ words, type: wordTypes.name });
//   const name1 = Utils.getRandomItem({ items: names });
//   const name2 = Utils.getRandomItem({ items: names });

//   const creature1 = { type: animal1.name, name: name1.name };
//   const creature2 = { type: animal2.name, name: name2.name };

//   if (!activeScene || activeScene === undefined) {
//     return [];
//   }

//   return [
//     `You go on your ${you.vehicle} to the ${activeScene &&
//       activeScene.location}.`,
//     `You see a ${creature2.type}`,
//     `At the ${activeScene && activeScene.location}, you see a ${
//       creature2.type
//     }.`,
//     `You also see a ${creature1.type}.`,
//     `They both look mad.`,
//     `The ${creature1.type} says,`,

//     `"I am ${creature1.name}."`,
//     `"Will you come to the ${sceneOptionA.location} with me?"`
//     // `The ${creature2.type} says,`,
//     // `"I am ${creature2.name}."`
//     // Deal with only 1 scene left, maybe allow user to return to previous scene,
//     //  but set a flag that there is only one scene left.  How should the game
//     // end?
//     // `"Will you come to the ${sceneOptionB.location} with me?"`
//     // `${"Will you come to the ${sceneOptionB.location} with me?"}`
//   ];
// };
