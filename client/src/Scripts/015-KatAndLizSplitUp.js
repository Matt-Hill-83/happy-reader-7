const story015 = {
  title: "015 - Kat And Liz Split Up.js",
  description: [
    "1: some stuff----------------",
    "2: some stuff----------------",
  ],
  scenes: {
    home: {
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
            faces: [
              { face: "happy", character: "liz2" },
              { character: "kat", face: "kat-smiling.49647334.png" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "I see a bee..."}',
            '{"kat" : "If we split up, we can find vulcan faster."}',
            '{"liz2" : "I see a bee...in a tree!"}',
            '{"liz2" : "Tee Hee Hee!"}',
          ],
        },
        {
          frameConfig: {
            faces: [
              { character: "liz2", face: "happy" },
              { character: "kat", face: "kat-cringing.62a27ad4.png" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Liz, that\'s not a bee!!!"}',
            '{"liz2" : "Come here little Bee! Bee!"}',
          ],
        },
      ],
    },
    stump: {
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
            faces: [
              { face: "happy", character: "liz2" },
              { character: "kat", face: "kat-smiling.49647334.png" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "I\'ll go investigate that smoke down by the river..."}',
            '{"kat" : "and you look in the village, by those burning stores..."}',
            '{"liz2" : "I see a pug..."}',
            '{"kat" : "Then meet back at the log later."}',
          ],
        },
        {
          frameConfig: {
            faces: [
              { character: "liz2", face: "happy" },
              { character: "kat", face: "kat-cringing.62a27ad4.png" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Liz, have you heard anything I just said."}',
            '{"liz2" : "I see a pug...and a mug!"}',
            '{"kat" : "Liiiiizzzzz!!!"}',
            '{"liz2" : "ugggh!, yes Kat, smoke, river, burning stores, yadda yadda, log"}',
            '{"liz2" : "I\'m in the zone Kat"}',
          ],
        },
      ],
    },
    bog: {
      sceneConfig: {
        coordinates: { col: 2, row: 0 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: true,
        items: [{ name: "empty" }],
      },
      frames: [
        {
          frameConfig: {
            faces: [
              { face: "happy", character: "liz2" },
              { character: "kat", face: "kat-smiling.49647334.png" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "Give a girl some space when she\'s in the zone!"}',
            '{"liz2" : "Yeah, the ryhming zone."}',
            '{"liz2" : "It\'s like everything is just clicking into place."}',
            '{"kat" : "Oh yeah, bust some rhymes!"}',
          ],
        },
        {
          frameConfig: {
            faces: [
              { character: "liz2", face: "happy" },
              { character: "kat", face: "kat-cringing.62a27ad4.png" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Put A Cat A "}',
            '{"kat" : "Put A Cat A "}',
            '{"kat" : "My name is Liz!"}',
            '{"kat" : "It starts with an L."}',
            '{"kat" : "Let\'s go and play with goblin"}',
            '{"kat" : "At the wishing well."}',
          ],
        },
      ],
    },
  },
}

export default story015
