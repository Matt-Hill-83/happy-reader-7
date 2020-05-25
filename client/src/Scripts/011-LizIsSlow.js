const story011 = {
  title: "011-LizIsSlow",
  description: [
    "1: some stuff----------------",
    "2: some stuff----------------",
  ],
  scenes: {
    cave: {
      sceneConfig: {
        coordinates: { col: 1, row: 1 },
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
            `{"liz2": "Put some pep in your step."}`,
            `{"liz2": "What?"}`,
            `{"liz2": "You are so sloooowwwww!!!!"}`,
            `{"liz2": "What?, I'm not slow."}`,
            `{"kat": "You dawdle."}`,
          ],
        },
        {
          frameConfig: {
            faces: [
              { character: "liz2", face: "happy" },
              { character: "kat", face: "kat-cringing.62a27ad4.png" },
            ],
            creatures: ["kat", "liz2", "troll01", "troll02"],
          },
          dialogs: [
            `{"liz2": "Um... Siri, what the heck is my friend talking about?"}`,
            `{"kat": "Liz, you are slower than a snail taped on top of a turtle."}`,
            `{"siri": "Dawdler:  someone who dilly dallies, also: a slow-poke. "}`,
            `{"kat": "Ha. See, even siri thinks you are slow."}`,
            `{"liz2": "Aaaugh!!! , Siri! Take that back!"}`,
          ],
        },
      ],
    },
    bees: {
      sceneConfig: {
        coordinates: { col: 1, row: 2 },
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
            `{"liz2": "Um... Siri, what the heck is my friend talking about?"}`,
            `{"kat": "Liz, you are slower than a snail taped on top of a turtle."}`,
            `{"siri": "Dawdler:  someone who dilly dallies, also: a slow-poke. "}`,
            `{"kat": "Ha. See, even siri thinks you are slow."}`,
            `{"liz2": "Aaaugh!!! , Siri! Take that back!"}`,
          ],
        },
        {
          frameConfig: {
            faces: [
              { character: "liz2", face: "happy" },
              { character: "kat", face: "kat-cringing.62a27ad4.png" },
            ],
            creatures: ["kat", "liz2", "troll01", "troll02"],
          },
          dialogs: [
            `{"liz2": "Take that back this instant!"}`,
            `{"siri": "Did you want me to play: Take that back this instant - by the Backstreet Bugs? "}`,
            `{"siri": "I love the The backstreet bugs! "}`,
          ],
        },
      ],
    },
    lake: {
      sceneConfig: {
        coordinates: { col: 1, row: 3 },
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
            `{"katie": "Summer Time is the funnest time"}`,
            `{"katie": "Summer Time is the funnest time"}`,
            `{"katie": "Summer Time is the funnest time"}`,
            `{"katie": "Summer Time is Fun!"}`,
            `{"katie": "Okay fine, catch up with me later."}`,
          ],
        },
      ],
    },
  },
}

export default story011
