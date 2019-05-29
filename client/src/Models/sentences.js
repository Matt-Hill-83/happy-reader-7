import myWords from "../Models/words.js";
import Utils from "../Utils/Utils.js";

const { words, wordTypes } = myWords;

const argumentStory = ({ you, activeScene }) => {
  const sceneOptionA = activeScene.sceneOptionA;

  const creatures = Utils.getWordsByType({ words, type: wordTypes.animal });
  const animal1 = Utils.getRandomItem({ items: creatures });
  const animal2 = Utils.getRandomItem({ items: creatures });
  const names = Utils.getWordsByType({ words, type: wordTypes.name });
  const name1 = Utils.getRandomItem({ items: names });
  const name2 = Utils.getRandomItem({ items: names });

  const creature1 = { type: animal1.name, name: name1.name };
  const creature2 = { type: animal2.name, name: name2.name };

  if (!activeScene || activeScene === undefined) {
    return [];
  }

  return [
    `You go on your ${you.vehicle} to the ${activeScene &&
      activeScene.location}.`,
    `You see a ${creature2.type}`,
    `At the ${activeScene && activeScene.location}, you see a ${
      creature2.type
    }.`,
    `You also see a ${creature1.type}.`,
    `They both look mad.`,
    `The ${creature1.type} says,`,

    `"I am ${creature1.name}."`,
    `"Will you come to the ${sceneOptionA.location} with me?"`
    // `The ${creature2.type} says,`,
    // `"I am ${creature2.name}."`
    // Deal with only 1 scene left, maybe allow user to return to previous scene,
    //  but set a flag that there is only one scene left.  How should the game
    // end?
    // `"Will you come to the ${sceneOptionB.location} with me?"`
    // `${"Will you come to the ${sceneOptionB.location} with me?"}`
  ];
};

//////////////////
//////////////////
//////////////////
//////////////////
//////////////////

// This cannot be chosen for the next scene.
const createHomeStory = ({ you }) => {
  return {
    story: [
      `Your name is ${you.name}.`,
      `You live in the ${you.homeLocation}.`,
      `You are happy.`,

      `You have a pet ${you.pet.type}.`,
      `Your ${you.pet.type}'s name is ${you.pet.name}.`,
      `${you.pet.name} name is a good ${you.pet.type}.`,

      `You have a ${you.vehicle}.`,
      `Your ${you.vehicle} is fast.`,
      `Today, you need to go to the ${
        you.mission.bringToLocation
      } to bring your friend ${you.mission.item.recipient}
      a ${you.mission.item.name}.`,
      `Where do you go?`
    ]
  };
};

const you = {
  name: "Charlie",
  creature: "girl",
  homeLocation: "forest",
  vehicle: "scooter",
  mission: {
    item: {
      name: "blueberries",
      location: "location 2",
      recipient: "friend 3"
    },
    bringToLocation: "birthday party",
    giveToCreature: "creature 1"
  },
  home: {
    location: "house"
  },
  friends: [],
  pet: { type: "dog", name: "Doggy", withMe: true }
};

const scenes = {
  home: {
    location: "forest",
    newFriend: {
      type: undefined,
      name: "Crystal"
    },
    narrative: createHomeStory,
    isHome: true,
    mission: {
      item: {
        name: "blueberries",
        location: "location 2",
        recipient: "creature 3"
      },
      bringToLocation: "birthday party",
      giveToCreature: "creature 1"
    }
  },

  // make scenes not tied to a location, and tie them to a random location.
  // scenes should be coupled with a narrative.
  meadow: {
    location: "meadow"
    // newFriend: {
    //   gender: "female",
    //   type: "elf",
    //   name: "Elliot",
    //   mission: {
    //     item: {
    //       name: "blueberries",
    //       location: "location 2",
    //       recipient: "creature 3"
    //     },
    //     bringToLocation: "birthday party",
    //     giveToCreature: "creature 1"
    //   }
    // }
  },
  waterfall: {
    location: "waterfall"
    // newFriend: {
    //   gender: "female",
    //   type: "elf",
    //   name: "Elliot",
    //   mission: {
    //     item: {
    //       name: "blueberries",
    //       location: "location 2",
    //       recipient: "creature 3"
    //     },
    //     bringToLocation: "birthday party",
    //     giveToCreature: "creature 1"
    //   }
    // }
  },
  school: {
    location: "school"
    // newFriend: {
    //   gender: "female",
    //   type: "elf",
    //   name: "Elliot",
    //   mission: {
    //     item: {
    //       name: "blueberries",
    //       location: "location 2",
    //       recipient: "creature 3"
    //     },
    //     bringToLocation: "birthday party",
    //     giveToCreature: "creature 1"
    //   }
    // }
  },
  garden: {
    location: "garden"
    // newFriend: {
    //   gender: "female",
    //   type: "elf",
    //   name: "Elliot",
    //   mission: {
    //     item: {
    //       name: "blueberries",
    //       location: "location 2",
    //       recipient: "creature 3"
    //     },
    //     bringToLocation: "birthday party",
    //     giveToCreature: "creature 1"
    //   }
    // }
  }
};

const startScene = scenes.home;

/////////////////////////

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

const newStoryP1 = ({ you, activeScene }) => {
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

const stories = [
  // argumentStory,
  newStoryP1
  // birthdayPartyStory,
  // lostCreatureStory,
  // lostThingStory
];

const plot = {
  activeScene: startScene,
  you,
  scenes,
  stories
};

const getNarrative = ({ plot, activeScene, story }) => {
  const { you } = plot;

  if (activeScene.narrative) {
    return activeScene.narrative({
      you,
      activeScene,
      sceneOptionA: activeScene.sceneOptionA
    });
  } else {
    return story({
      you,
      activeScene,
      sceneOptionA: activeScene.sceneOptionA,
      sceneOptionB: activeScene.sceneOptionB
    });
  }
};

export default { getNarrative, plot };
