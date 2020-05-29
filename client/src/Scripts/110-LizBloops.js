const story110 = {
  title: "story output",
  scenes: [
    {
      title: "cave",
      sceneConfig: {
        worldTitle: "110 - Liz Bloops",
        coordinates: { col: 0, row: 0 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: true,
        items: [{ name: "empty" }],
      },
      frames: [
        {
          frameConfig: { items: [], faces: [], creatures: ["kat", "liz2"] },
          dialogs: [
            '{"liz2" : "bleepity, bling blang blip blop!"}',
            '{"kat" : "Hi liz. What\'s up?"}',
            '{"liz2" : "Oh hey Kat, what\'s blanging?"}',
            '{"kat" : "Wow Liz! Did you make that up?"}',
            '{"liz2" : "Yeah, I\'ve been saying it all day. And check this out:"}',
          ],
        },
        {
          frameConfig: { items: [], faces: [], creatures: ["kat", "liz2"] },
          dialogs: [
            '{"liz2" : "Blip Blorp Bloop."}',
            '{"liz2" : "Piddle-dee. Widdle-dee. Diddle-dee."}',
            '{"liz2" : "Plippity Ploppity plump."}',
            '{"kat" : "Whoa, that\'s sooooo cool!"}',
          ],
        },
        {
          frameConfig: { items: [], faces: [], creatures: ["kat", "liz2"] },
          dialogs: [
            '{"liz2" : "I know, right? Its called blooping."}',
            '{"liz2" : "I made that up too."}',
            '{"kat" : "I gotta try this!"}',
          ],
        },
      ],
    },
    {
      title: "bog",
      sceneConfig: {
        worldTitle: "110 - Liz Bloops",
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
            faces: [],
            creatures: ["kat", "liz2", "rori", "vulcan01"],
          },
          dialogs: [
            '{"kat" : "chugga... chugga... chugga.. chugga.. choo-choo!"}',
            '{"liz2" : "rickety! rockety!"}',
            '{"kat" : "pickety! pockety!"}',
            '{"liz2" : "Dimple Dee Doop!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [],
            creatures: ["kat", "liz2", "rori", "vulcan01"],
          },
          dialogs: [
            '{"rori" : "Run for the hills! Maldred has the Dragon Stone --"}',
            '{"kat" : "plip plop!"}',
            '{"liz2" : "Dimple Dee Dip!"}',
            '{"rori" : "Wait! What are those noises?"}',
            '{"rori" : "It must be Maldred... "}',
          ],
        },
      ],
    },
    {
      title: "log",
      sceneConfig: {
        worldTitle: "110 - Liz Bloops",
        coordinates: { col: 2, row: 0 },
        creatures: ["kat", "liz2"],
        isEndScene: true,
        isStartScene: true,
        items: [{ name: "empty" }],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [],
            creatures: ["kat", "liz2", "rori", "vulcan"],
          },
          dialogs: [
            '{"kat" : "We are blooping!"}',
            '{"liz2" : "Hee Hee!"}',
            '{"rori" : "Oh. Cool!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [],
            creatures: ["kat", "liz2", "rori", "vulcan"],
          },
          dialogs: [
            '{"kat" : "plip plop!"}',
            '{"liz2" : "Dimple Dee Dip!"}',
            '{"rori" : "Vulcan can bloop better than any one!"}',
            '{"kat" : "cool"}',
            '{"vulcan" : "BLEEEEEEP!!!!!!!"}',
          ],
        },
      ],
    },
  ],
}
export default story110
