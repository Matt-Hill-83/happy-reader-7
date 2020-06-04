const story007 = {
  title: "007 - Kat's First Quest",
  questConfig: {
    pockets: { cup: { amount: 1 } },
    missions: [
      {
        name: "Catch Piggy",
        rewards: [{ name: "gold", amount: 1 }],
        item: { name: "bun" },
        recipient: { name: "pig" },
      },
      {
        name: "Bring Piggy Home",
        rewards: [{ name: "gold", amount: 5 }],
        item: { name: "pig" },
        recipient: { name: "troll" },
      },
    ],
  },
  scenes: [
    {
      title: "home",
      sceneConfig: {
        worldTitle: "007 - Kat's First Quest",
        coordinates: { col: 0, row: 0 },
        creatures: ["kat", "liz2"],
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
                face: "liz-25.7f6c8c15.png",
                character: "liz2",
                characterIndex: 1,
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
        {
          frameConfig: {
            items: [],
            faces: [
              {
                face: "liz-25.7f6c8c15.png",
                character: "liz2",
                characterIndex: 1,
              },
            ],
            creatures: ["liz2"],
          },
          dialogs: ['{"liz2" : "I am the banana queen!!!!!"}'],
        },
      ],
    },
    {
      title: "coop",
      sceneConfig: {
        worldTitle: "007 - Kat's First Quest",
        coordinates: { col: 1, row: 0 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "blank" }, { name: "hoop" }],
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
                face: "kat-smiling.49647334.png",
                character: "kat",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "I think there is a dress at the pond!"}',
            '{"liz2" : "The pond? I love the pond!"}',
            '{"kat" : "Let\'s go."}',
            '{"liz2" : "We will get that dress!"}',
          ],
        },
      ],
    },
    {
      title: "bog",
      sceneConfig: {
        worldTitle: "007 - Kat's First Quest",
        coordinates: { col: 1, row: 1 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "troll" }, { name: "blank" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              {
                face: "liz-22.c5ad2fd2.png",
                character: "liz2",
                characterIndex: 1,
              },
              {
                face: "kat-funny.9fa7fcc4.png",
                character: "kat",
                characterIndex: 0,
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"troll" : "TROLL SOOOOOO SAD!!!!"}',
            '{"kat" : "Oh brother... here it comes..."}',
            '{"liz2" : "Oh no! Troll, why are you sad?"}',
            '{"troll" : "TROLL LOST PIGGY!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              {
                face: "liz-12.d70620b2.png",
                character: "liz2",
                characterIndex: 1,
              },
              {
                character: "kat",
                characterIndex: 0,
                face: "kat-hurt.b1c80ebb.png",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "We will go look for Piggy!"}',
            '{"troll" : "TROLL MISS PIGGY...."}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", characterIndex: 1, face: "happy" },
              { character: "kat", characterIndex: 0, face: "happy" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Let\'s go check at the log."}',
            '{"liz2" : "I love the log."}',
            '{"liz2" : ""}',
            '{"liz2" : ""}',
          ],
        },
      ],
    },
    {
      title: "smoke",
      sceneConfig: {
        worldTitle: "007 - Kat's First Quest",
        coordinates: { col: 1, row: 2 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "blank" }, { name: "rori" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              {
                character: "liz2",
                characterIndex: 1,
                face: "liz-10.578917c1.png",
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
            '{"kat" : "Rori, Rori!  Piggy is missing!"}',
            '{"rori" : "Piggy is missing?  Maybe Maldred used the dragon stone to control Piggy\'s mind."}',
            '{"rori" : "Have you girls seen Vulcan?"}',
            '{"liz2" : "I saw him yesterday at the mug."}',
          ],
        },
      ],
    },
    {
      title: "log",
      sceneConfig: {
        worldTitle: "007 - Kat's First Quest",
        coordinates: { col: 2, row: 2 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "tiredGirl" }, { name: "pig" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2", characterIndex: 1 },
              { character: "kat", characterIndex: 0, face: "happy" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Hi Tired Girl."}',
            '{"liz2" : "It looks like you found Piggy!"}',
            '{"tiredGirl" : "I have been chasing her for an hour. She won\'t come."}',
            '{"liz2" : "You need some piggy snacks! We will get some for you!"}',
          ],
        },
      ],
    },
    {
      title: "pond",
      sceneConfig: {
        worldTitle: "007 - Kat's First Quest",
        coordinates: { col: 1, row: 3 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
        items: [{ name: "bun" }, { name: "dennisTheMenace" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", characterIndex: 1, face: "happy" },
              { face: "happy", character: "kat", characterIndex: 0 },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Hi Dennis. Can we have that bun?"}',
            '{"dennisTheMenace" : "Sure Kat! Mr. Wilson won\'t be needing it.    I told Mrs. Wilson to put him on a gluten free diet."}',
            '{"liz2" : "We can use the bun to catch Piggy!"}',
          ],
        },
      ],
    },
    {
      title: "stump",
      sceneConfig: {
        worldTitle: "007 - Kat's First Quest",
        coordinates: { col: 1, row: 4 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: true,
        items: [
          { lock: "questsComplete", name: "dress01" },
          { lock: "questsComplete", name: "dress04" },
        ],
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
          dialogs: ['{"kat" : "Look! Dresses!"}', '{"liz2" : "We did it!"}'],
        },
      ],
    },
  ],
}
export default story007
