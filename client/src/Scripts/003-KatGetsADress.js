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
  scenes: {
    cave: {
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
            '{"kat" : "I got my dress!"}',
            '{"liz2" : "Kat, have you lost your marbles?"}',
            '{"kat" : "I got my dress!!!"}',
            '{"kat" : "I got my dress!!!"}',
            '{"kat" : "I got my dress!!!"}',
            '{"liz2" : "Wait, you really got a dress?"}',
            '{"liz2" : "You really, actually got a dress?"}',
            '{"kat" : "I did it, I did it!"}',
            '{"liz2" : "Like... a \'dress\' dress?"}',
            // '{"kat" : "Yes! Yes!"}',
            '{"kat" : "Yes! a \'dress\' dress"}',
            '{"kat" : "Oh liz, Oh liz, I need to sing!"}',
            '{"liz2" : "Put A Cat A"}',
            '{"liz2" : "Put A Cat A"}',
            '{"liz2" : "Put A Cat A"}',
            '{"kat" : "I just got my dress!"}',
            '{"kat" : "This dress is the best!"}',
            '{"kat" : "And I finished up my quest!"}',
            '{"kat" : "It was my best Dress Quest quest yet!"}',
            '{"kat" : "That quest was the best!"}',
            '{"troll01" : "I\'m impressed."}',
            '{"kat" : "And now I\'ve got a teeny tiny question..."}',
            '{"kat" : "...it\'s like a little test."}',
            '{"kat" : "Who\'s gonna be the best dressed?"}',
            '{"kat" : "At the ball?"}',
            '{"kat" : "Who\'s gonna be the best dressed guest"}',
            '{"kat" : "Of them all?"}',
            '{"liz2" : "Kat, I\'m enthralled.  Now you can slay it with the best."}',
            // '{"liz2" : "Kat, is that dress for a doll?"}',
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
            '{"kat" : "++++++++++"}',
            '{"liz2" : "-----------------------------------------------"}',
          ],
        },
      ],
    },
    home: {
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
            '{"liz2" : "-----------------------------------------------"}',
            '{"kat" : "++++++++++"}',
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
            '{"kat" : "++++++++++"}',
            '{"liz2" : "-----------------------------------------------"}',
          ],
        },
      ],
    },
  },
}

export default story003
