const story005 = {
  title: "Whambulance",
  scenes: {
    bog: {
      sceneConfig: {
        items: [],
        creatures: ["kat", "liz2"],
        isStartScene: true,
        isEndScene: false,
      },
      frames: [
        {
          // frameConfig: {},
          dialogs: [
            `{"liz2" : "It's not fair!"}`,
            `{"kat" : "What's not fair?"}`,
            `{"liz2" : "Nothing is fair!"}`,
            `{"kat" : "Oh dear! You poor thing...  Wait hold on."}`,
          ],
        },
        {
          // frameConfig: {},
          dialogs: [
            `{"liz2" : "What are you doing?"}`,
            `{"kat" : "Just a sec liz.  I'm making a call."}`,
            `{"liz2" : "Kat, that's not a phone, it's a piece of bark that you just picked up off the ground."}`,
            `{"kat" : "Beep boop beep boop beep beep boop"}`,
            `{"kat" : "Hello, operator, please send over the wha-mulance! Yes it's liz again."}`,
          ],
        },
      ],
    },
    swing: {
      sceneConfig: {
        items: [],
        creatures: ["kat", "liz2"],
        isStartScene: true,
        isEndScene: false,
      },
      frames: [
        {
          // frameConfig: {},
          dialogs: [
            `{"kat" : "Yes I'll hold."}`,
            `{"kat" : "No I don't want to participate in a short survey after the call."}`,
            `{"kat" : "What? Oh great!  Liz, they are sending the Wham-bulance over immediately."}`,
            `{"kat" : "Oh what's that?  You have a message for liz?"}`,
          ],
        },
        {
          // frameConfig: {},
          dialogs: [
            `{"Kat" : "Liz, the wha-mbulance people have a message for you!"}`,
            `{"liz2" : "Kat you are not funny!"}`,
            `{"kat" : "Whats that?  Tell her to turn six?  Oh what? And also stop being a whiny little cry-baby brat?"}`,
            `{"kat" : "Yeah I'll pass that along to her and see what she says?"}`,
          ],
        },
      ],
    },
    stump: {
      sceneConfig: {
        items: [],
        creatures: ["kat", "liz2"],
        isStartScene: true,
        isEndScene: false,
      },
      frames: [
        {
          // frameConfig: {},
          dialogs: [
            `{"kat" : "You have a good day too."}`,
            `{"kat" : "Mmmm-bye"}`,
            `{"kat" : "Waaa-wer! Waaa-wer!"}`,
            `{"kat" : "Liz, I just got off the phone with --"}`,
          ],
        },
        {
          // frameConfig: {},
          dialogs: [
            `{"liz2" : "Stop it!"}`,
            `{"liz2" : "Kat, you are a bad frog!!!"}`,
            `{"liz2" : "Bad froggy!!!"}`,
          ],
        },
      ],
    },
  },
}

export default story005
