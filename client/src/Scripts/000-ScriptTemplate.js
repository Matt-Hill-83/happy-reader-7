const template = {
  title: "title",
  description: [
    "1: some stuff----------------",
    "2: some stuff----------------",
  ],
  questConfig: {
    pockets: [{ name: "apple" }],
    missions: [
      {
        name: "Find Piggy",
        rewards: [{ name: "gold", amount: 5 }],
        item: ["pig"],
        recipient: ["troll"],
        pockets: ["top"],
      },
    ],
  },
  scenes: [
    {
      title: "cave",
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
    {
      title: "home",
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
  ],
}

export default template
