const story011 = {
  title: "011 - Liz is A Slow Poke",
  description: [
    "1: some stuff----------------",
    "2: some stuff----------------",
  ],
  scenes: {
    swing: {
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
            `{"kat": "Liz, put some pep in your step."}`,
            `{"liz2": "What?"}`,
            `{"kat": "Put some click in your clogs."}`,
            `{"liz2": "I don't have clogs."}`,
          ],
        },
        {
          frameConfig: {
            faces: [
              { face: "happy", character: "liz2" },
              { character: "kat", face: "kat-smiling.49647334.png" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            `{"kat": "You are sooooooooo sloooowwwww!!!!"}`,
            `{"liz2": "I am not slow."}`,
            `{"kat": "Liz, you are slower than a snail taped on top of a turtle."}`,
            `{"liz2": "Am not!"}`,
            `{"kat": "Liz, you are my best friend, but you are a dawdler."}`,
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
            `{"liz2": "I have no idea what you are talking about."}`,
            `{"liz2": "Um... Siri, what on earth is my friend talking about?"}`,
            `{"liz2": "Make her words make sense."}`,
            `{"siri": "Dawdler:  someone who dilly dallies, also: a slow-poke. "}`,
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
            `{"kat": "Ha! See, even siri thinks you are slow."}`,
            `{"liz2": "Aaaugh!!! , Siri! Take that back!"}`,
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
            `{"liz2": "Siri!  That was mean!"}`,
            `{"liz2": "Take that back this instant!"}`,
            `{"siri": "Re-calculating... "}`,
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
            `{"siri": "Did you want me to play: Take that back this instant - by the Backstreet Bugs? "}`,
            `{"kat": "The Backstreet Bugs! "}`,
            `{"liz2": "I love The Backstreet Bugs! "}`,
          ],
        },
      ],
    },
    lake: {
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
            `{"kat": "Summer Time is the funnest time"}`,
            `{"liz2": "Summer Time is the funnest time"}`,
            `{"kat": "Summer Time is the funnest time"}`,
            `{"kat": "Summer Time is Fun!"}`,
            `{"kat": "Okay fine, catch up with me later."}`,
          ],
        },
      ],
    },
  },
}

export default story011
