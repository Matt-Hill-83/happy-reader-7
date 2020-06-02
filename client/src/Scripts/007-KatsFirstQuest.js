const story007 = {
  title: "007 - Kat's First Quest",
  description: "007 - Kat's First Quest",
  questConfig: {
    pockets: [{ name: "apple" }],
    missions: [
      {
        name: "Find Piggy",
        rewards: [{ name: "gold", amount: 5 }],
        item: { name: "pig" },
        recipient: { name: "troll" },
      },
      {
        name: "Unlock the yellow door",
        rewards: [{ name: "gold", amount: 5 }],
        item: { name: "keyYellow01" },
        recipient: { name: "bog" },
      },
      {
        name: "Bring the Unicorn Home",
        rewards: [{ name: "gold", amount: 5 }],
        item: { name: "unicorn" },
        recipient: { name: "end" },
      },
    ],
  },
  scenes: [
    {
      title: "home",
      sceneConfig: {
        worldTitle: "000 - EZ reader - 001",
        coordinates: { col: 0, row: 0 },
        creatures: ["liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "blank" }, { name: "blank" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              {
                character: "liz2",
                characterIndex: 1,
                face: "liz-25.7f6c8c15.png",
              },
              {
                face: "kat-unsure.35db04b3.png",
                character: "kat",
                characterIndex: 0,
              },
            ],
            creatures: ["liz2"],
          },
          dialogs: [
            '{"kat" : ""}',
            '{"liz2" : "I am not craaaazy!!!!!"}',
            '{"liz2" : ""}',
            '{"liz2" : "I am perfectly normal!!!!"}',
          ],
        },
      ],
    },

    {
      title: "coop",
      sceneConfig: {
        worldTitle: "000 - EZ reader - 001",
        coordinates: { col: 1, row: 0 },
        creatures: ["liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "dress01" }, { name: "dress04" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              {
                face: "liz-2.abafcf11.png",
                character: "liz2",
                characterIndex: 1,
              },
              {
                face: "kat-silly.57a8c5ca.png",
                character: "kat",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Hi Liz."}',
            '{"liz2" : "Oh hi Kat, you snuck up on me."}',
            '{"kat" : "What are you doing?"}',
            '{"liz2" : "Oh, ummmm... just some stuff."}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              {
                face: "liz-5.6c5f5f4d.png",
                character: "liz2",
                characterIndex: 1,
              },
              {
                character: "kat",
                characterIndex: 0,
                face: "kat-smiling.49647334.png",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "I think there is a dress at the pond!"}',
            '{"liz2" : "The pond? I love the pond!"}',
            '{"liz2" : "Let\'s go."}',
            '{"liz2" : "We will get that dress!"}',
          ],
        },
      ],
    },

    {
      title: "bog",
      sceneConfig: {
        worldTitle: "000 - EZ reader - 001",
        coordinates: { col: 1, row: 1 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "rori" }, { name: "smoke" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2", characterIndex: 1 },
              {
                face: "kat-happy.9e02afab.png",
                character: "kat",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "We can play."}',
            '{"liz2" : ""}',
            '{"liz2" : ""}',
            '{"liz2" : ""}',
          ],
        },
      ],
    },
    {
      title: "smoke",
      sceneConfig: {
        worldTitle: "000 - EZ reader - 001",
        coordinates: { col: 1, row: 2 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "cup" }, { name: "rori" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", characterIndex: 1, face: "happy" },
              {
                face: "kat-happy.9e02afab.png",
                character: "kat",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "We can play."}',
            '{"liz2" : ""}',
            '{"liz2" : ""}',
            '{"liz2" : ""}',
          ],
        },
      ],
    },
    {
      title: "log",
      sceneConfig: {
        worldTitle: "000 - EZ reader - 001",
        coordinates: { col: 2, row: 2 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "emmet01" }, { name: "pig" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", characterIndex: 1, face: "happy" },
              {
                face: "kat-happy.9e02afab.png",
                character: "kat",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "We can play."}',
            '{"liz2" : ""}',
            '{"liz2" : ""}',
            '{"liz2" : ""}',
          ],
        },
      ],
    },
    {
      title: "pond",
      sceneConfig: {
        worldTitle: "000 - EZ reader - 001",
        coordinates: { col: 1, row: 3 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "cup" }, { name: "pig" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", characterIndex: 1, face: "happy" },
              {
                face: "kat-happy.9e02afab.png",
                character: "kat",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "We can play."}',
            '{"liz2" : ""}',
            '{"liz2" : ""}',
            '{"liz2" : ""}',
          ],
        },
      ],
    },
    {
      title: "stump",
      sceneConfig: {
        worldTitle: "000 - EZ reader - 001",
        coordinates: { col: 1, row: 4 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: true,
        items: [{ name: "cup" }, { name: "pig" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", characterIndex: 1, face: "happy" },
              {
                face: "kat-happy.9e02afab.png",
                character: "kat",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "We can play."}',
            '{"liz2" : ""}',
            '{"liz2" : ""}',
            '{"liz2" : ""}',
          ],
        },
      ],
    },
  ],
}
export default story007
