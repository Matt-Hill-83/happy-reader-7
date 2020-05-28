const story110 = {
  title: "110 - Liz Bloops",

  scenes: [
    {
      title: "cave",
      sceneConfig: {
        items: [],
        creatures: ["kat", "liz2"],
        isStartScene: true,
        isEndScene: false,
      },
      frames: [
        {
          frameConfig: {
            items: [],
          },
          dialogs: [
            `{"liz2": "bleepity, bling blang blip blop!"}`,
            `{"kat": "Hi liz. What's up?"}`,
            `{"liz2": "Oh hey Kat, what's blanging?"}`,
            `{"kat": "Wow Liz! Did you make that up?"}`,
            `{"liz2": "Yeah, I've been saying it all day. And check this out:"}`,
          ],
        },
        {
          dialogs: [
            `{"liz2": "Blip Blorp Bloop."}`,
            `{"liz2": "Piddle-dee. Widdle-dee. Diddle-dee."}`,
            `{"liz2": "Plippity Ploppity plump."}`,
            `{"kat": "Whoa, that's sooooo cool!"}`,
          ],
        },
        {
          dialogs: [
            `{"liz2": "I know, right? Its called blooping."}`,
            `{"liz2": "I made that up too."}`,
            `{"kat": "I gotta try this!"}`,
          ],
        },
      ],
    },
    {
      title: "bog",
      sceneConfig: {
        items: [],
        creatures: ["kat", "liz2", "rori", "vulcan01"],
        isStartScene: true,
        isEndScene: false,
      },
      frames: [
        {
          dialogs: [
            `{"kat": "chugga... chugga... chugga.. chugga.. choo-choo!"}`,
            `{"liz2": "rickety! rockety!"}`,
            `{"kat": "pickety! pockety!"}`,
            `{"liz2": "Dimple Dee Doop!"}`,
          ],
        },
        {
          dialogs: [
            `{"rori": "Run for the hills! Maldred has the Dragon Stone --"}`,
            `{"kat": "plip plop!"}`,
            `{"liz2": "Dimple Dee Dip!"}`,
            `{"rori": "Wait!  What are those noises?"}`,
            `{"rori": "It must be Maldred... "}`,
          ],
        },
      ],
    },
    {
      title: "log",
      sceneConfig: {
        items: [],
        creatures: ["kat", "liz2", "rori", "vulcan"],
        isStartScene: true,
        isEndScene: false,
      },
      frames: [
        {
          dialogs: [
            `{"kat": "We are blooping!"}`,
            `{"liz2": "Hee Hee!"}`,
            `{"rori": "Oh.  Cool!"}`,
          ],
        },
        {
          dialogs: [
            `{"kat": "plip plop!"}`,
            `{"liz2": "Dimple Dee Dip!"}`,
            `{"rori": "Vulcan can bloop better than any one!"}`,
            `{"kat": "cool"}`,
            `{"vulcan": "BLEEEEEEP!!!!!!!"}`,
          ],
        },
      ],
    },
  ],
}

export default story110
