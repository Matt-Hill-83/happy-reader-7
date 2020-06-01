const story006 = {
  title: "story output",
  scenes: [
    {
      title: "cave",
      sceneConfig: {
        worldTitle: "story output",
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
            '{"kat" : "Hello."}',
            '{"kat" : "I am Kat."}',
            '{"liz2" : "And I am Liz."}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", face: "happy" },
              { character: "kat", face: "kat-cringing.62a27ad4.png" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "We have fun."}',
            '{"liz2" : "We have fun..."}',
            '{"liz2" : "...in the sun!"}',
            '{"liz2" : "Tee Hee Hee!"}',
          ],
        },
      ],
    },
    {
      title: "home",
      sceneConfig: {
        worldTitle: "story output",
        coordinates: { col: 1, row: 0 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: false,
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
            '{"kat" : "I see Bun-Bun."}',
            '{"liz2" : "Run,   Bun-Bun!  Run!"}',
            '{"liz2" : "Bun-Bun has fun in the sun!"}',
            '{"liz2" : "Tee Hee Hee!"}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", face: "happy" },
              { character: "kat", face: "kat-cringing.62a27ad4.png" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [],
        },
      ],
    },
    {
      title: "bog",
      sceneConfig: {
        worldTitle: "story output",
        coordinates: { col: 1, row: 1 },
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
                character: "kat",
                characterIndex: 0,
                face: "kat-happy.9e02afab.png",
              },
            ],
            creatures: ["kat", "liz2", "troll02"],
          },
          dialogs: [
            '{"troll01" : "OK, BOOK ALL DONE!"}',
            '{"kat" : "Thanks Grumbo."}',
            '{"kat" : "Hey, did my hair look okay?"}',
            '{"troll01" : "HAIR GOOD!"}',
            '{"kat" : "Oh thanks.  It was getting all frizzy this morning."}',
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { character: "liz2", characterIndex: 1, face: "happy" },
              {
                character: "kat",
                characterIndex: 0,
                face: "kat-happy.9e02afab.png",
              },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Liz, I love making these short little books!"}',
            '{"liz2" : "Me too!  We\'re done by 10:00 and have the whole afternoon free!."}',
            '{"kat" : "Let\'s go to the slide."}',
            '{"kat" : "That sounds good to me!"}',
          ],
        },
      ],
    },
  ],
}
export default story006
