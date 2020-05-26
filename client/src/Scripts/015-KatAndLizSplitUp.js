const story015 = {
  title: "015 - Kat and Liz Split Up.",
  description: "015 - Kat and Liz Split Up.",
  scenes: {
    home: {
      sceneConfig: {
        coordinates: { col: 0, row: 0 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: true,
        items: [{ name: "bee" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2" },
              { face: "kat-smiling.49647334.png", character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "I see a bee..."}',
            '{"kat" : "If we split up, we can find vulcan faster."}',
            '{"liz2" : "I see a bee...in a tree!"}',
            '{"liz2" : "Tee Hee Hee!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2" },
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
            items: [],
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
            items: [],
            faces: [
              { face: "happy", character: "liz2" },
              { face: "kat-cringing.62a27ad4.png", character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Liz, have you heard anything I just said?"}',
            '{"liz2" : "I see a pug...and a mug!"}',
            '{"kat" : "Liiiiizzzzz!!!"}',
            '{"liz2" : "Ugggh!, yes Kat!"}',
            '{"liz2" : "Smoke, river, burning stores, yadda yadda... log."}',
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
            items: [],
            faces: [
              { face: "liz-17.9b753827.png", character: "liz2" },
              { face: "kat-smiling.49647334.png", character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "Give a girl some space when she\'s in the zone!"}',
            '{"kat" : "What zone?"}',
            '{"liz2" : "he ryhming zone."}',
            '{"liz2" : "It\'s like everything is just clicking into place."}',
            '{"kat" : "Oh yeah, bust some rhymes!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2" },
              { face: "kat-optimistic.ded8aa68.png", character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Put A Cat A "}',
            '{"kat" : "Put A Cat A "}',
            '{"liz2" : "My name is Liz!"}',
            '{"liz2" : "It starts with an L."}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "liz-5.6c5f5f4d.png", character: "liz2" },
              { face: "kat-happy.9e02afab.png", character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "Let\'s go and play with goblin"}',
            '{"liz2" : "At the wishing well."}',
            '{"kat" : "Fresh!!!"}',
          ],
        },
      ],
    },
  },
}

export default story015
