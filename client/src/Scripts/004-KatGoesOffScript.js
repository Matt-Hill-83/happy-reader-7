const story004 = {
  title: "004 - Kat Goes Off Script",
  description: [
    "1: some stuff----------------",
    "2: some stuff----------------",
  ],
  scenes: [
    {
      title: "log",
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
            faces: [
              { face: "happy", character: "liz2" },
              { character: "kat", face: "kat-smiling.49647334.png" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"kat" : "Morning Liz, what script did they give you today?"}',
            '{"liz2" : "Just a sec, let me look , <flip>...  <flip>...  <flip>...  "}',
            '{"liz2" : "I see a lot of frog on the log stuff."}',
            '{"liz2" : "And ooh, it looks like I lose my pig."}',
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
            '{"liz2" : "What about you Kat?"}',
            '{"kat" : "Huh? What about me what?"}',
            '{"liz2" : "Your script."}',
            '{"kat" : "Oh, none for me today, thanks."}',
          ],
        },
      ],
    },
    {
      title: "stump",
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
            faces: [
              { face: "happy", character: "liz2" },
              { character: "kat", face: "kat-smiling.49647334.png" },
            ],
            creatures: ["kat", "liz2"],
          },
          dialogs: [
            '{"liz2" : "Kat, you are not thinking about going off script are you?"}',
            '{"liz2" : "Sorry Liz, but that ship has sailed.  I\'m going full improv today!"}',
            '{"liz2" : "But Kat, we could get in trouble!"}',
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
            '{"liz2" : "Oh Liz, I already took care of that.  See these picture I drew of us?"}',
            '{"liz2" : "We just put them right here....."}',
            '{"liz2" : "And viola!  We sneak out the back and if we hurry we can catch the elf slides on our way to Cave Mountain."}',
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
            '{"liz2" : "But what about the rules?"}',
            '{"kat" : "Look, Liz, I love the scripts and all, the rhymes, the lost bunny, all that stuff."}',
            '{"kat" : "Don\'t get me wrong."}',
            '{"kat" : "But don\'t you ever think there may be something more to this place?  On the outside."}',
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
            '{"kat" : "What if we did get that dress?"}',
            '{"kat" : "Well fine, you stay here.  I\'m going to try for the dress."}',
            '{"liz2" : "Ugggh... fine.  Go on your dress quest."}',
            '{"kat" : "Let\'s meet up at the log tomorrow."}',
            '{"liz2" : "Okay."}',
          ],
        },
      ],
    },
  ],
}

export default story004
