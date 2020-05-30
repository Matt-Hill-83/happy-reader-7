const story003 = {
  title: "003 - Kat Gets A Dress",
  description: [
    "1: some stuff----------------",
    "2: some stuff----------------",
  ],
  storyConfig: {
    mission: {
      title: "Get the purple dress.",
      completed: false,
      rewards: [{ name: "dress01-basic" }],
    },
  },
  scenes: [
    {
      title: "bees",
      sceneConfig: {
        coordinates: { col: 0, row: 0 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: true,
        items: [{ name: "empty" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2" },
              { character: "kat", face: "kat-smiling.49647334.png" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "I got my dress!!!"}',
            '{"liz2" : "Kat, have you lost your marbles?"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", face: "happy" },
              { character: "kat", face: "kat-cringing.62a27ad4.png" },
            ],
            creatures: ["kat", "liz2", "troll01", "troll02"],
          },
          dialogs: [
            '{"kat" : "I got my dress!!!"}',
            '{"kat" : "I got my dress!!!"}',
            '{"kat" : "I got my dress!!!"}',
            '{"liz2" : "Wait, you really got a dress?"}',
          ],
        },
      ],
    },
    {
      title: "stump",
      sceneConfig: {
        coordinates: { col: 1, row: 0 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: true,
        items: [{ name: "empty" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2" },
              { character: "kat", face: "kat-smiling.49647334.png" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "You really, actually got a dress?"}',
            '{"kat" : "I did it, I did it!"}',
            '{"liz2" : "Like... a \'dress\' dress?"}',
            '{"kat" : "Yes!  I got a \'dress\' dress!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", face: "happy" },
              { character: "kat", face: "kat-cringing.62a27ad4.png" },
            ],
            creatures: ["kat", "liz2", "troll01", "troll02"],
          },
          dialogs: [
            '{"kat" : "Oh liz, Oh liz, I need to sing!"}',
            '{"liz2" : "Put A Cat A"}',
            '{"liz2" : "Put A Cat A"}',
            '{"liz2" : "Put A Cat A"}',
          ],
        },
      ],
    },
    {
      title: "swamp",
      sceneConfig: {
        coordinates: { col: 1, row: 0 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: true,
        items: [{ name: "empty" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2" },
              { character: "kat", face: "kat-smiling.49647334.png" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "I just got my dress!"}',
            '{"kat" : "This dress is the best!"}',
            '{"kat" : "And I finished up my quest!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", face: "happy" },
              { character: "kat", face: "kat-cringing.62a27ad4.png" },
            ],
            creatures: ["kat", "liz2", "troll01", "troll02"],
          },
          dialogs: [
            '{"troll01" : "OH WOW, TROLL IMPRESSED!"}',
            '{"kat" : "And now I\'ve got a teeny tiny question..."}',
            '{"kat" : "...it\'s like a little test."}',
            '{"troll01" : "I\'ll use my best quess!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", face: "happy" },
              { character: "kat", face: "kat-cringing.62a27ad4.png" },
            ],
            creatures: ["kat", "liz2", "troll01", "troll02"],
          },
          dialogs: [
            '{"kat" : "Who\'s gonna be the best dressed?"}',
            '{"kat" : "At the ball?"}',
            '{"kat" : "Who\'s gonna be the best dressed guest"}',
            '{"kat" : "Of them all?"}',
            '{"liz2" : "Kat, you\'re the best!"}',
          ],
        },
      ],
    },
  ],
}

export default story003
