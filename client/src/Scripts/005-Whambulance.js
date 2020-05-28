const story005 = {
  title: "005 - Kat Calls the Whaaa-mbulance",
  scenes: [
    {
      title: "bog",
      sceneConfig: {
        items: [],
        creatures: ["kat", "liz2"],
        isStartScene: true,
        isEndScene: false,
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
            `{"liz2" : "It's not fair!"}`,
            `{"kat" : "What's not fair?"}`,
            `{"liz2" : "Nothing is fair!"}`,
            `{"kat" : "Oh dear! You poor thing...  Wait hold on..."}`,
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
            `{"liz2" : "What are you doing?"}`,
            `{"kat" : "Just a sec liz.  I'm making a call."}`,
            `{"liz2" : "Kat, that's not a phone, it's a piece of bark that you just picked up off the ground."}`,
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
            `{"kat" : "Beep boop beep boop beep beep boop..."}`,
            `{"kat" : "Hello, operator, please send over the wha-mulance!"}`,
            `{"kat" : "Yes it's Liz again."}`,
          ],
        },
      ],
    },
    {
      title: "swing",
      sceneConfig: {
        items: [],
        creatures: ["kat", "liz2"],
        isStartScene: true,
        isEndScene: false,
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
            `{"kat" : "Yes I'll hold."}`,
            `{"kat" : "No I don't want to participate in a short survey after the call."}`,
            `{"kat" : "What? Oh great!  Liz, they are sending the Wham-bulance over immediately."}`,
            `{"kat" : "Oh what's that?  You have a message for liz?"}`,
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
            `{"Kat" : "Liz, the wha-mbulance people have a message for you!"}`,
            `{"liz2" : "Kat you are not funny!"}`,
            `{"kat" : "Whats that?  Tell her to turn six?"}`,
            `{"kat" : "Oh what? And also stop being a bad frog?"}`,
            `{"kat" : "Yeah I'll pass that along to her and see what she says."}`,
          ],
        },
      ],
    },
    {
      title: "stump",
      sceneConfig: {
        items: [],
        creatures: ["kat", "liz2"],
        isStartScene: true,
        isEndScene: false,
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
            `{"kat" : "You have a good day too."}`,
            `{"kat" : "Mmmm-bye"}`,
            `{"kat" : "Waaa-wer! Waaa-wer!"}`,
            `{"kat" : "Liz, I just got off the phone with --"}`,
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
            `{"liz2" : "STOP IT!"}`,
            `{"liz2" : "Kat, you are a BAD FROG!!!"}`,
            `{"liz2" : "BAD FROGGY!!!"}`,
          ],
        },
      ],
    },
  ],
}

export default story005
