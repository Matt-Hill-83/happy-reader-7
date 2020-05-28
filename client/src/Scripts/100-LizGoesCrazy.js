const story100 = {
  title: "100 - Liz Goes Crazy",
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
            `{"liz2": "Kat, I’m so glad you are here. Look!  Quick!  Look in the sky!"}`,
            `{"kat": "ok."}`,
            `{"liz2": "And just sort of stare right at that cloud."}`,
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
            `{"liz2": "But don’t stare with your eyes."}`,
            `{"kat": "Huh?"}`,
            `{"liz2": "Just sort of stare with your brain, but in that direction."}`,
            `{"kat": "Ummmm... ok."}`,
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2" },
              { face: "kat-dismayed.b719035a.png", character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            `{"liz2": "Do you see the kid?  Do you see the kid up there?"}`,
            `{"kat": "No."}`,
            `{"liz2": "In that cloud.  Right there."}`,
            `{"liz2": "Look straight ahead. There is a kid staring right at us."}`,
            `{"kat": "...uhhh...Still no...."}`,
          ],
        },
      ],
    },
    {
      title: "bees",
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
              { face: "kat-cringing.62a27ad4.png", character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            `{"liz2": "And any time I say anything… anything at all, she says it at the same time."}`,
            `{"kat": "Liz, I don’t see anything."}`,
            `{"liz2": "She’s doing it.  She’s doing it right now!"}`,
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2" },
              { face: "kat-surprised.1c00ae4e.png", character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            `{"kat": "Liz, as your best friend, I need be totally honest with you."}`,
            `{"liz2": "I can see her!"}`,
            `{"kat": "Look, I’ve been doing crazy since I was this tall."}`,
            `{"kat": "So I kind of know crazy."}`,
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2" },
              { face: "kat-dismayed.b719035a.png", character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            `{"kat": "But the kind of crazy I do is more screaming-in-Target kind of crazy."}`,
            `{"kat": "The kind of crazy you are doing now is more like be-buh-dee-dee-dee-dee kind of crazy."}`,
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2" },
              { face: "kat-loud.0dec3d35.png", character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            `{"liz2": "Kat!  I am not crazy!"}`,
            `{"kat": "Ok."}`,
            `{"liz2": "I am not regular crazy!"}`,
            `{"liz2": "I am not be-buh-dee-dee-dee-dee crazy."}`,
            `{"kat": "Ok"}`,
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2" },
              { character: "kat", face: "kat-dismayed.b719035a.png" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            `{"liz2": "I am perfectly normal!"}`,
            `{"kat": "Um….check please!"}`,
            `{"liz2": "I’m not crazy!"}`,
            `{"kat": "Liz, you are going just a little bit hay wire!"}`,
          ],
        },
      ],
    },
    {
      title: "bog",
      sceneConfig: {
        coordinates: { col: 2, row: 0 },
        creatures: ["kat", "liz2"],
        isEndScene: false,
        isStartScene: true,
        items: ["flag", "cup"],
      },
      frames: [
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2" },
              { character: "kat", face: "kat-scared.a3316950.png" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            `{"liz2": "Just watch Kat!  I’ll make her talk."}`,
            `{"liz2": "I can make her say anything I want."}`,
            `{"kat": "ok."}`,
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2" },
              { character: "kat", face: "kat-surprised.1c00ae4e.png" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            `{"liz2": "Loo Loo. Laa Laa. Fee Fi Fo Fum!"}`,
            `{"liz2": "You heard her right Kat?  You can see her too, right?"}`,
            `{"kat": "Ummm... Are we playing pretend?"}`,
            `{"liz2": "Look at meeeeeeeeeeeee! I am a giant banana!"}`,
          ],
        },
        {
          frameConfig: {
            items: [],
            faces: [
              { face: "happy", character: "liz2" },
              { face: "kat-smiling.49647334.png", character: "kat" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            `{"liz2": "I am the banana queen!"}`,
            `{"kat": "How about we go to the log?"}`,
            `{"liz2": "Me eat all the bananas!"}`,
          ],
        },
      ],
    },
  ],
}
export default story100
